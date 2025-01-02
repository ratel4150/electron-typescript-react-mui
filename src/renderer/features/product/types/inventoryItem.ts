// src\renderer\features\product\types\inventoryItem.ts

// Interfaz para Price History
interface PriceHistory {
    price: number;
    effectiveDate: Date;
    action: 'SET' | 'ADJUSTMENT' | 'DISCOUNT';
    reason?: string;
  }
  
  // Interfaz para Audit Trail
  interface AuditTrail {
    action: 'CREATED' | 'UPDATED' | 'DELETED' | 'STOCKED' | 'SOLD';
    performedBy?: string; // Referencia al usuario
    performedAt: Date;
    details?: string;
  }
  
  // Interfaz para Transaction History
  interface TransactionHistory {
    transactionId?: string; // Referencia a la transacción
    action: 'IN' | 'OUT' | 'TRANSFER' | 'RETURN';
    quantity: number;
    date: Date;
    processedBy?: string; // Referencia al usuario
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  }
  
  // Interfaz para Alert Settings
  interface AlertSettings {
    lowStockThreshold: number;
    criticalStockThreshold: number;
    autoReplenish: boolean;
  }
  
  // Interfaz para Forecast Data
  interface ProjectedSales {
    period: string;
    expectedSales: number;
  }
  
  interface StockLevelPrediction {
    period: string;
    predictedStockLevel: number;
  }
  
  interface ForecastData {
    projectedSales: ProjectedSales[];
    stockLevelPrediction: StockLevelPrediction[];
  }
  
  // Interfaz para Inventory Item
  export interface InventoryItem {
    id:string;
    _id:string,
    product: {
      name: string;
      sku:string;
      barcode:string;
      pricing:{
        sellingPrice:string;
      }
    };
    quantity: number;
    reservedQuantity?: number;
    availableQuantity: number;
    lotNumber?: string;
    expiryDate?: Date;
    status: 'IN_STOCK' | 'OUT_OF_STOCK' | 'DAMAGED' | 'BACKORDERED' | 'PENDING' | 'DISCONTINUED';
    reorderLevel: number;
    maxStockLevel: number;
    priceHistory: PriceHistory[];
    auditTrail: AuditTrail[];
    transactionHistory: TransactionHistory[];
    alertSettings: AlertSettings;
    forecastData: ForecastData;
    lastUpdatedAt: Date;
  }