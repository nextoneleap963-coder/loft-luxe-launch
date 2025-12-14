"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AdminPhotoUpload } from "@/components/AdminPhotoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import type { GalleryItem } from "@/components/types";
import { galleryFilters } from "@/components/constants";

const categories = ["Gallery", "Business Wear", "Wedding", "Casual", "Ethnic", "Accessories"];

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
        return;
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.id) {
      fetchPhotos();
    }
  }, [user?.id]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("lookbook_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPhotos(
        data.map((photo) => ({
          image: photo.image_url,
          category: photo.category,
          title: photo.title,
          isFromDB: true,
          id: photo.id,
        }))
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching photos:", error);
        toast.error(error.message);
      } else {
        console.error("Error fetching photos:", error);
        toast.error("Failed to load photos");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (photo: GalleryItem) => {
    setEditingPhoto(photo);
    setEditTitle(photo.title);
    setEditCategory(photo.category);
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingPhoto?.id || !editTitle.trim() || !editCategory) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase
        .from("lookbook_photos")
        .update({
          title: editTitle.trim(),
          category: editCategory,
        })
        .eq("id", editingPhoto.id);

      if (error) throw error;

      toast.success("Photo updated successfully!");
      setEditDialogOpen(false);
      setEditingPhoto(null);
      fetchPhotos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating photo:", error);
        toast.error(error.message);
      } else {
        console.error("Error updating photo:", error);
        toast.error("Failed to update photo");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    setDeletingId(id);
    try {
      // Get the photo to extract the image URL for storage deletion
      const photo = photos.find((p) => p.id === id);
      
      // Delete from database
      const { error: deleteError } = await supabase
        .from("lookbook_photos")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Try to delete from storage (optional - don't fail if this fails)
      if (photo?.image) {
        try {
          const urlParts = photo.image.split("/");
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `photos/${fileName}`;
          
          await supabase.storage.from("lookbook").remove([filePath]);
        } catch (storageError) {
          console.warn("Failed to delete from storage:", storageError);
          // Continue anyway - the database record is deleted
        }
      }

      toast.success("Photo deleted successfully!");
      fetchPhotos();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting photo:", error);
        toast.error(error.message);
      } else {
        console.error("Error deleting photo:", error);
        toast.error("Failed to delete photo");
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl mb-2">Gallery Management</h1>
              <p className="text-muted-foreground">
                Manage your lookbook photos - add, edit, or delete gallery items
              </p>
            </div>
            <AdminPhotoUpload onUploadSuccess={fetchPhotos} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Photos</div>
            <div className="text-2xl font-bold">{photos.length}</div>
          </div>
          {galleryFilters.slice(1).map((filter) => {
            const count = photos.filter((p) => p.category === filter).length;
            return (
              <div key={filter} className="bg-card p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">{filter}</div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
            );
          })}
        </div>

        {/* Photos Grid */}
        {photos.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground mb-4">No photos yet. Upload your first photo!</p>
            <AdminPhotoUpload onUploadSuccess={fetchPhotos} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-card shadow-card border border-border"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-xs uppercase tracking-wider text-background mb-1">
                      {photo.category}
                    </div>
                    <h3 className="font-heading text-lg text-background mb-3">
                      {photo.title}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(photo)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => photo.id && handleDelete(photo.id)}
                        disabled={deletingId === photo.id}
                        className="flex-1"
                      >
                        {deletingId === photo.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  placeholder="e.g., Navy Three-Piece Suit"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {editingPhoto && (
                <div className="rounded-lg overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src={editingPhoto.image}
                    alt={editingPhoto.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setEditingPhoto(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpdate}
                  disabled={!editTitle.trim() || !editCategory}
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;
