'use server';

import { getDatabase } from '@/lib/mongodb';
import { getSession } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import type { 
  Download, 
  DownloadFormData, 
  DownloadStats, 
  EmailConfig,
  ResourceType,
  EmailStatus,
  FollowUpStatus 
} from '@/types/download';

// Create download record
export async function createDownload(formData: DownloadFormData) {
  try {
    const db = await getDatabase();
    
    const download: Omit<Download, '_id'> = {
      ...formData,
      emailSent: false,
      emailStatus: 'pending',
      followUpRequired: false,
      followUpStatus: 'pending',
      downloadedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('downloads').insertOne(download);
    
    revalidatePath('/admin/downloads');
    return { 
      success: true, 
      downloadId: result.insertedId.toString() 
    };
  } catch (error: any) {
    console.error('Create download error:', error);
    return { success: false, error: error.message };
  }
}

// Get all downloads with filters
export async function getAllDownloads(filters?: {
  resourceType?: ResourceType;
  emailStatus?: EmailStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}) {
  try {
    const db = await getDatabase();
    const query: any = {};

    if (filters?.resourceType) {
      query.resourceType = filters.resourceType;
    }

    if (filters?.emailStatus) {
      query.emailStatus = filters.emailStatus;
    }

    if (filters?.dateFrom || filters?.dateTo) {
      query.downloadedAt = {};
      if (filters.dateFrom) {
        query.downloadedAt.$gte = filters.dateFrom;
      }
      if (filters.dateTo) {
        query.downloadedAt.$lte = filters.dateTo;
      }
    }

    if (filters?.search) {
      query.$or = [
        { userEmail: { $regex: filters.search, $options: 'i' } },
        { userName: { $regex: filters.search, $options: 'i' } },
        { userCompany: { $regex: filters.search, $options: 'i' } },
        { resourceTitle: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const downloads = await db
      .collection('downloads')
      .find(query)
      .sort({ downloadedAt: -1 })
      .toArray();

    return downloads.map((download) => ({
      ...download,
      _id: download._id.toString(),
    }));
  } catch (error) {
    console.error('Get downloads error:', error);
    return [];
  }
}

// Get download statistics
export async function getDownloadStats(): Promise<DownloadStats> {
  try {
    const db = await getDatabase();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      total,
      thisWeek,
      thisMonth,
      byResourceType,
      byStatus,
      topResources,
      recentDownloads,
    ] = await Promise.all([
      db.collection('downloads').countDocuments(),
      db.collection('downloads').countDocuments({
        downloadedAt: { $gte: weekAgo },
      }),
      db.collection('downloads').countDocuments({
        downloadedAt: { $gte: monthAgo },
      }),
      db.collection('downloads').aggregate([
        {
          $group: {
            _id: '$resourceType',
            count: { $sum: 1 },
          },
        },
      ]).toArray(),
      db.collection('downloads').aggregate([
        {
          $group: {
            _id: '$emailStatus',
            count: { $sum: 1 },
          },
        },
      ]).toArray(),
      db.collection('downloads').aggregate([
        {
          $group: {
            _id: {
              resourceId: '$resourceId',
              resourceTitle: '$resourceTitle',
              resourceType: '$resourceType',
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]).toArray(),
      db.collection('downloads')
        .find()
        .sort({ downloadedAt: -1 })
        .limit(10)
        .toArray(),
    ]);

    // Transform aggregation results
    const byResourceTypeObj: Record<ResourceType, number> = {
      whitepaper: 0,
      'case-study': 0,
      newsletter: 0,
      brochure: 0,
      datasheet: 0,
      guide: 0,
    };
    
    byResourceType.forEach((item: any) => {
      if (item._id in byResourceTypeObj) {
        byResourceTypeObj[item._id as ResourceType] = item.count;
      }
    });

    // Initialize with ALL email status values
    const byStatusObj: Record<EmailStatus, number> = {
      delivered: 0,
      failed: 0,
      pending: 0,
      bounced: 0,
    };
    
    byStatus.forEach((item: any) => {
      if (item._id in byStatusObj) {
        byStatusObj[item._id as EmailStatus] = item.count;
      }
    });

    return {
      total,
      thisWeek,
      thisMonth,
      byResourceType: byResourceTypeObj,
      byStatus: byStatusObj,
      topResources: topResources.map((item: any) => ({
        resourceId: item._id.resourceId,
        resourceTitle: item._id.resourceTitle,
        resourceType: item._id.resourceType,
        count: item.count,
      })),
      recentDownloads: recentDownloads.map((d: any) => ({
        ...d,
        _id: d._id.toString(),
      })),
    };
  } catch (error) {
    console.error('Get download stats error:', error);
    return {
      total: 0,
      thisWeek: 0,
      thisMonth: 0,
      byResourceType: {
        whitepaper: 0,
        'case-study': 0,
        newsletter: 0,
        brochure: 0,
        datasheet: 0,
        guide: 0,
      },
      byStatus: {
        delivered: 0,
        failed: 0,
        pending: 0,
        bounced: 0,
      },
      topResources: [],
      recentDownloads: [],
    };
  }
}

// Get single download
export async function getDownload(id: string) {
  try {
    const db = await getDatabase();
    const download = await db.collection('downloads').findOne({ _id: new ObjectId(id) });
    
    if (!download) {
      return null;
    }

    return {
      ...download,
      _id: download._id.toString(),
    };
  } catch (error) {
    console.error('Get download error:', error);
    return null;
  }
}

// Update follow-up status
export async function updateFollowUpStatus(
  id: string, 
  status: FollowUpStatus,
  notes?: string,
  assignedTo?: string
) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();
    
    await db.collection('downloads').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          followUpStatus: status,
          followUpNotes: notes,
          assignedTo: assignedTo,
          updatedAt: new Date(),
        } 
      }
    );

    revalidatePath('/admin/downloads');
    return { success: true };
  } catch (error: any) {
    console.error('Update follow-up error:', error);
    return { success: false, error: error.message };
  }
}

// Delete download record
export async function deleteDownload(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const db = await getDatabase();
    await db.collection('downloads').deleteOne({ _id: new ObjectId(id) });

    revalidatePath('/admin/downloads');
    return { success: true };
  } catch (error: any) {
    console.error('Delete download error:', error);
    return { success: false, error: error.message };
  }
}

// Export downloads to CSV
export async function exportDownloadsToCSV(filters?: {
  resourceType?: ResourceType;
  dateFrom?: Date;
  dateTo?: Date;
}) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const downloads = await getAllDownloads(filters);
    
    const headers = [
      'Date',
      'Resource Type',
      'Resource Title',
      'User Name',
      'User Email',
      'Company',
      'Job Title',
      'Email Status',
      'Follow-up Status',
    ];
    
    const rows = downloads.map((d: any) => [
      new Date(d.downloadedAt).toLocaleString(),
      d.resourceType,
      d.resourceTitle,
      d.userName,
      d.userEmail,
      d.userCompany || '',
      d.userJobTitle || '',
      d.emailStatus,
      d.followUpStatus,
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    
    return { 
      success: true, 
      csv,
      filename: `downloads-export-${new Date().toISOString().split('T')[0]}.csv`
    };
  } catch (error: any) {
    console.error('Export downloads error:', error);
    return { success: false, error: error.message };
  }
}
