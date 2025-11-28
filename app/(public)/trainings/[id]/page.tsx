import React from 'react';
import { getAllPayments } from '@/actions/payment-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Params = {
  id: string;
};

export default async function TrainingDetailPage({ 
  params 
}: { 
  params: Params 
}) {
  const { id } = params;
  
  // Fetch payment data
  const payments = await getAllPayments({ trainingId: id });
  const completedPayments = payments.filter(p => p.paymentStatus === 'completed');
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.finalAmount, 0);

  return (
    <div className="saas-container py-20">
      <h1 className="text-4xl font-bold mb-8">Training Details</h1>
      
      {/* Revenue Stats Card */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {completedPayments.length} enrollments
            </p>
          </CardContent>
        </Card>

        {/* Add more stats cards here */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.length > 0 
                ? ((completedPayments.length / payments.length) * 100).toFixed(1) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {completedPayments.length}/{payments.length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add more training details here */}
    </div>
  );
}

// Optional: Generate metadata
export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: `Training Details - ${params.id}`,
    description: 'Training program details and statistics',
  };
}
