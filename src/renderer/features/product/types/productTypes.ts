// src\renderer\features\product\types\productTypes.ts
export interface Product {
price: any;
  _id: string;
  id: string;
  store: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'PENDING_APPROVAL' | 'REJECTED';
  pricing: Pricing;
  inventory: Inventory;
  dimensions?: Dimensions;
  categories?: string[];
  tags?: string[];
  suppliers?: Supplier[];
  images?: Image[];
  videos?: Video[];
  documents?: Document[];
  salesData?: SalesData;
  lifecycle?: Lifecycle;
  createdAt: string;
  updatedAt: string;
  seo: SEO

}

// Tipos anidados
export interface Pricing {
  basePrice: number;
  sellingPrice?: number;
  wholesalePrice?: number;
  suggestedRetailPrice?: number;
  purchaseCost?: number;
  discounts?: Discount[];
  taxes?: Tax[]; // Añadir esta propiedad si no está
  markup?: number; // Añadir esta propiedad si no está
}

export interface Discount {
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  conditions?: string;
  validFrom?: string;
  validUntil?: string;
}

export interface Tax {
  type: string;
  rate: number;
}

export interface Inventory {
  stock: {
    current: number;
    reserved: number;
    inTransit: number;
    safetyStock: number;
  };
  reorderPoint: number;
  maxStockLevel?: number;
  warehouses?: WarehouseStock[];
}

export interface WarehouseStock {
  warehouseId: string;
  quantity: number;
}

export interface Dimensions {
  weight: number;
  height: number;
  width: number;
  length: number;
  volume?: number;
  unitOfMeasure: 'KG' | 'G' | 'L' | 'ML' | 'UNIT';
}

export interface Supplier {
  supplierId: string;
  leadTime: number;
  cost: number;
  default: boolean;
}

export interface Image {
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface Video {
  url: string;
  description?: string;
}

export interface Document {
  type: 'MANUAL' | 'DATASHEET' | 'WARRANTY';
  url: string;
  uploadedAt: string;
}
// Define el tipo SalesData, asegurando que reviews sea un array opcional de Review
export interface SalesData {
  totalSold: number;
  averageRating: number;
  reviews?: Review[];
}
// Define el tipo Review
export interface Review {
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}



export interface Lifecycle {
  activeFrom: string;
  activeUntil?: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  slug: string
}
