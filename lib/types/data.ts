export interface Glass {
    id: string;
    materialType: string;
    glassId: string | null;
    sellerId: string;
    buyPrice: number;
    sellPrice: number;
    amount: number;
    enteredDate: Date;
    createdAt: Date;
    updatedAt: Date;
    sideMaterialId: string | null;
    inventory: Inventory[];

    layers: {
      // Define the properties of layers here
    }[];
  }

  export interface Inventory {
    id: string;
    materialType: string;
    glassId: string | null;
    sellerId: string;
    buyPrice: number;
    amount: number;
    enteredDate: Date;
    createdAt: Date;
    updatedAt: Date;
    sideMaterialId: string | null;
  }