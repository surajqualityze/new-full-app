"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Loader2,
} from "lucide-react";
import { ServiceListItem, SortConfig } from "@/types/service";

const ITEMS_PER_PAGE = 10;

function getStatusBadge(status: "active" | "inactive") {
  const config = {
    active: { variant: "default" as const, label: "Active" },
    inactive: { variant: "secondary" as const, label: "Inactive" },
  };
  
  const { variant, label } = config[status] || config.inactive;
  
  return (
    <Badge variant={variant} className="capitalize">
      {label}
    </Badge>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    serviceSlug: "",
    serviceName: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServices(data);
        if (data.length > 0) {
          toast.success(`Loaded ${data.length} services`);
        }
      } catch {
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const handleSort = useCallback((key: keyof ServiceListItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchText.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [services, searchText]);

  const sortedServices = useMemo(() => {
    const sorted = [...filteredServices];
    sorted.sort((a, b) => {
      const aKey = String(a[sortConfig.key] || "").toLowerCase();
      const bKey = String(b[sortConfig.key] || "").toLowerCase();

      if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
      if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredServices, sortConfig]);

  const paginatedServices = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedServices.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [sortedServices, currentPage]);

  const totalPages = Math.ceil(sortedServices.length / ITEMS_PER_PAGE);

  const handleDeleteClick = (slug: string, name: string) => {
    setDeleteDialog({ open: true, serviceSlug: slug, serviceName: name });
  };

  const handleDeleteConfirm = async () => {
    const loadingToast = toast.loading("Deleting service...");
    try {
      const res = await fetch(`/api/services/${deleteDialog.serviceSlug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setServices(services.filter((s) => s.slug !== deleteDialog.serviceSlug));
      toast.dismiss(loadingToast);
      toast.success(`Service "${deleteDialog.serviceName}" deleted`);
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Delete failed");
    } finally {
      setDeleteDialog({ open: false, serviceSlug: "", serviceName: "" });
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof ServiceListItem }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="inline-block w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block w-4 h-4 ml-1" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">
            Manage your services and sub-services
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button size="default" className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Service
          </Button>
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or slug..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card className="border-0 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none font-semibold"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name <SortIcon columnKey="name" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none font-semibold"
                onClick={() => handleSort("slug")}
              >
                <div className="flex items-center">
                  Slug <SortIcon columnKey="slug" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none font-semibold"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status <SortIcon columnKey="status" />
                </div>
              </TableHead>
              <TableHead className="w-[80px] text-center font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-muted-foreground"
                >
                  {searchText
                    ? "No services found matching your search."
                    : "No services yet. Create your first service to get started."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedServices.map((service) => (
                <TableRow key={service._id} className="group">
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {service.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(service.status || "inactive")}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/services/${service.slug}/edit`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            handleDeleteClick(service.slug, service.name)
                          }
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                {deleteDialog.serviceName}
              </span>{" "}
              and all associated sub-services. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Delete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}