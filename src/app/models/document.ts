export interface Document {
  id: number;
  title: string;
  description: string;
  authorName: string;
  categoryId: number | null;
  price: string; // Decimal is string in JSON
  fileUrl: string;
  previewUrl: string | null;
  uploaderId: string | null;
  isApproved: boolean;
  createdAt: string | null;
}
