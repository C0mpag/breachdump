export type MaterialItem = {
  id: string;
  name: string;
  unit: string;
  unitCost: number;
  quantity: number;
  markupPercent: number;
};

export type LabourItem = {
  id: string;
  role: string;
  hourlyRate: number;
  hours: number;
  markupPercent: number;
};

export type Quote = {
  id: string;
  clientName: string;
  address: string;
  quoteDate: string;
  validUntil: string;
  notes: string;
  gstEnabled: boolean;
  depositPercent?: number;
  travelFee?: number;
  measuredAreaM2: number;
  areaType: string;
  materials: MaterialItem[];
  labour: LabourItem[];
  createdAt: string;
};
