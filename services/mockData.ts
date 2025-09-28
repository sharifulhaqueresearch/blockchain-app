
import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Organic Arabica Coffee Beans',
    description: 'High-altitude, single-origin coffee beans from certified organic farms.',
    imageUrl: 'https://picsum.photos/seed/coffee/600/400',
    batchNumber: 'BATCH-2024-A-789',
    stages: [
      {
        id: 'stage-1-1',
        name: 'Raw Material Sourcing',
        status: 'Completed',
        timestamp: '2024-05-10T08:00:00Z',
        location: 'Antioquia, Colombia',
        participants: [{ id: 'sup-01', name: 'Finca La Esmeralda', role: 'Supplier' }],
        documents: [
          { id: 'doc-1-1', name: 'Organic Certification', type: 'Certification', ipfsHash: 'QmXo...a456' },
          { id: 'doc-1-2', name: 'Harvest Report', type: 'Quality Report', ipfsHash: 'QmYo...b789' },
        ],
        smartContracts: [{ name: 'Supplier Payment', triggered: true, description: 'Payment automatically released upon quality verification.' }],
        data: { 'Harvest Yield': '1500 kg', 'Moisture Content': '11.5%' },
        txHash: '0x1a2b...c3d4',
        prevTxHash: '0x0000...0000'
      },
      {
        id: 'stage-1-2',
        name: 'Manufacturing & Processing',
        status: 'Completed',
        timestamp: '2024-05-15T14:30:00Z',
        location: 'Medellín, Colombia',
        participants: [{ id: 'mfg-01', name: 'Colombian Coffee Processors', role: 'Manufacturer' }],
        documents: [{ id: 'doc-2-1', name: 'Roasting Profile', type: 'Quality Report', ipfsHash: 'QmZo...c123' }],
        smartContracts: [{ name: 'Quality Control Check', triggered: true, description: 'Triggers QA check upon arrival at facility.' }],
        data: { 'Roast Level': 'Medium', 'Processing Method': 'Washed' },
        txHash: '0x2b3c...d4e5',
        prevTxHash: '0x1a2b...c3d4'
      },
      {
        id: 'stage-1-3',
        name: 'Logistics & Transportation',
        status: 'Completed',
        timestamp: '2024-05-25T22:00:00Z',
        location: 'Port of Miami, USA',
        participants: [{ id: 'log-01', name: 'Global Shipping Co.', role: 'Logistics' }],
        documents: [{ id: 'doc-3-1', name: 'Bill of Lading', type: 'Bill of Lading', ipfsHash: 'QmPo...d456' }],
        smartContracts: [{ name: 'Customs Clearance', triggered: true, description: 'Automates submission of documents for customs.' }],
        data: { 'Vessel Name': 'MSC Seaside', 'Container ID': 'CMAU1234567' },
        txHash: '0x3c4d...e5f6',
        prevTxHash: '0x2b3c...d4e5'
      },
      {
        id: 'stage-1-4',
        name: 'Distribution',
        status: 'In-Transit',
        timestamp: '2024-05-28T10:00:00Z',
        location: 'En route to Chicago, IL',
        participants: [{ id: 'dist-01', name: 'Midwest Food Distributors', role: 'Distributor' }],
        documents: [],
        smartContracts: [],
        data: { 'Truck ID': 'TRUCK-MW-55', 'Expected Arrival': '2024-05-30' },
        txHash: '0x4d5e...f6g7',
        prevTxHash: '0x3c4d...e5f6'
      },
      {
        id: 'stage-1-5',
        name: 'Retail',
        status: 'Pending',
        timestamp: '',
        location: 'Chicago, IL, USA',
        participants: [{ id: 'ret-01', name: 'The Daily Grind Cafe', role: 'Retailer' }],
        documents: [],
        smartContracts: [{ name: 'Warranty & Returns', triggered: false, description: 'Manages consumer returns and warranty claims.' }],
        data: {},
        txHash: '',
        prevTxHash: '0x4d5e...f6g7'
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Model S-24 Electric Scooter',
    description: 'A high-performance electric scooter with a sleek, aerodynamic design.',
    imageUrl: 'https://picsum.photos/seed/scooter/600/400',
    batchNumber: 'BATCH-2024-S24-112',
    stages: [
      {
        id: 'stage-2-1',
        name: 'Component Sourcing',
        status: 'Completed',
        timestamp: '2024-04-01T09:00:00Z',
        location: 'Shenzhen, China',
        participants: [{ id: 'sup-02', name: 'Future Electronics Ltd.', role: 'Supplier' }],
        documents: [
          { id: 'doc-21-1', name: 'Battery Certification', type: 'Certification', ipfsHash: 'QmSo...a456' },
          { id: 'doc-21-2', name: 'Motor Spec Sheet', type: 'Quality Report', ipfsHash: 'QmTo...b789' },
        ],
        smartContracts: [{ name: 'Supplier Payment', triggered: true, description: 'Payment for batteries released upon successful test.' }],
        data: { 'Component': 'Lithium-Ion Battery Pack', 'Units': '500' },
        txHash: '0x5e6f...g7h8',
        prevTxHash: '0x0000...0000'
      },
       {
        id: 'stage-2-2',
        name: 'Assembly Plant',
        status: 'Completed',
        timestamp: '2024-04-20T18:00:00Z',
        location: 'Austin, TX, USA',
        participants: [{ id: 'mfg-02', name: 'E-Mobility Inc.', role: 'Manufacturer' }],
        documents: [{ id: 'doc-22-1', name: 'Final Assembly QA', type: 'Quality Report', ipfsHash: 'QmUo...c123' }],
        smartContracts: [{ name: 'Assembly Milestone Check', triggered: true, description: 'Verifies completion of assembly stage.' }],
        data: { 'Assembly Line': 'Line 3', 'Units Assembled': '500' },
        txHash: '0x6f7g...h8i9',
        prevTxHash: '0x5e6f...g7h8'
      },
       {
        id: 'stage-2-3',
        name: 'Distribution',
        status: 'In-Transit',
        timestamp: '2024-05-05T11:00:00Z',
        location: 'En route to EU Warehouse',
        participants: [{ id: 'dist-02', name: 'Euro-Transporters', role: 'Distributor' }],
        documents: [],
        smartContracts: [],
        data: { 'Carrier': 'Maersk', 'ETA': '2024-05-25' },
        txHash: '0x7g8h...i9j0',
        prevTxHash: '0x6f7g...h8i9'
      },
      {
        id: 'stage-2-4',
        name: 'Retail',
        status: 'Pending',
        timestamp: '',
        location: 'Berlin, Germany',
        participants: [{ id: 'ret-02', name: 'Urban Ryders Berlin', role: 'Retailer' }],
        documents: [],
        smartContracts: [],
        data: {},
        txHash: '',
        prevTxHash: '0x7g8h...i9j0'
      }
    ]
  }
];
