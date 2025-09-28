
import React, { useState } from 'react';
import { Product, SupplyChainStage, Participant } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [stageName, setStageName] = useState('Raw Material Sourcing');
  const [location, setLocation] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantRole, setParticipantRole] = useState<'Supplier' | 'Manufacturer' | 'Distributor' | 'Retailer' | 'Logistics'>('Supplier');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !description || !batchNumber || !stageName || !location || !participantName) {
      alert('Please fill all required fields.');
      return;
    }

    const newProductId = `prod-${Date.now()}`;
    const newStageId = `stage-${newProductId}-1`;
    const newParticipantId = `part-${Date.now()}`;

    const newParticipant: Participant = {
      id: newParticipantId,
      name: participantName,
      role: participantRole,
    };

    const initialStage: SupplyChainStage = {
      id: newStageId,
      name: stageName,
      status: 'Completed',
      timestamp: new Date().toISOString(),
      location: location,
      participants: [newParticipant],
      documents: [],
      smartContracts: [],
      data: {},
      txHash: `0x${Math.random().toString(16).slice(2, 12)}...`,
      prevTxHash: '0x0000...0000',
    };

    const newProduct: Product = {
      id: newProductId,
      name: productName,
      description: description,
      imageUrl: imageUrl || `https://picsum.photos/seed/${productName.replace(/\s/g, '')}/600/400`,
      batchNumber: batchNumber,
      stages: [initialStage],
    };

    onSave(newProduct);
    onClose();
    // Reset form for next time
    setProductName('');
    setDescription('');
    setBatchNumber('');
    setImageUrl('');
    setLocation('');
    setParticipantName('');
    setParticipantRole('Supplier');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-700 pb-3">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Details */}
            <div className="space-y-4">
               <h3 className="text-lg font-semibold text-sky-400">Product Details</h3>
               <div>
                <label htmlFor="productName" className="block text-sm font-medium text-slate-300 mb-1">Product Name</label>
                <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"></textarea>
              </div>
              <div>
                <label htmlFor="batchNumber" className="block text-sm font-medium text-slate-300 mb-1">Batch Number</label>
                <input type="text" id="batchNumber" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
               <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-1">Image URL (Optional)</label>
                <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
            </div>

            {/* Initial Stage Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sky-400">Initial Supply Chain Stage</h3>
               <div>
                <label htmlFor="stageName" className="block text-sm font-medium text-slate-300 mb-1">Stage Name</label>
                <input type="text" id="stageName" value={stageName} onChange={(e) => setStageName(e.target.value)} required className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
              <div>
                <label htmlFor="participantName" className="block text-sm font-medium text-slate-300 mb-1">Participant Name</label>
                <input type="text" id="participantName" value={participantName} onChange={(e) => setParticipantName(e.target.value)} required className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500"/>
              </div>
               <div>
                <label htmlFor="participantRole" className="block text-sm font-medium text-slate-300 mb-1">Participant Role</label>
                <select id="participantRole" value={participantRole} onChange={(e) => setParticipantRole(e.target.value as any)} className="w-full bg-slate-700 border-slate-600 rounded-md p-2 text-white focus:ring-sky-500 focus:border-sky-500">
                    <option>Supplier</option>
                    <option>Manufacturer</option>
                    <option>Distributor</option>
                    <option>Retailer</option>
                    <option>Logistics</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors font-semibold">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
