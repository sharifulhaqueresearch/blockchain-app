
export interface Participant {
  id: string;
  name: string;
  role: 'Supplier' | 'Manufacturer' | 'Distributor' | 'Retailer' | 'Logistics';
}

export interface Document {
  id: string;
  name: string;
  type: 'Certification' | 'Invoice' | 'Bill of Lading' | 'Quality Report';
  ipfsHash: string;
}

export interface SmartContractAction {
  name: string;
  triggered: boolean;
  description: string;
}

export interface SupplyChainStage {
  id: string;
  name: string;
  status: 'Completed' | 'In-Transit' | 'Processing' | 'Pending';
  timestamp: string;
  location: string;
  participants: Participant[];
  documents: Document[];
  smartContracts: SmartContractAction[];
  data: Record<string, any>;
  txHash: string;
  prevTxHash: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  batchNumber: string;
  stages: SupplyChainStage[];
}

export interface AnalyticsData {
  name: string;
  value: number;
}
