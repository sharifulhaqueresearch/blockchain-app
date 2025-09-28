
import React from 'react';
import { Product, SupplyChainStage } from '../types';
import StageCard from './StageCard';

interface ProductTrackerProps {
  product: Product;
  onSelectStage: (stage: SupplyChainStage) => void;
  selectedStageId?: string | null;
}

const ProductTracker: React.FC<ProductTrackerProps> = ({ product, onSelectStage, selectedStageId }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">{product.name}</h2>
        <p className="text-sm text-slate-400">{product.description}</p>
        <p className="text-xs mt-1 text-sky-400 font-mono">Batch: {product.batchNumber}</p>
      </div>
      <div className="relative">
        {/* The timeline connecting line */}
        <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-0.5 bg-slate-700" aria-hidden="true"></div>
        <div className="space-y-8">
          {product.stages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isLast={index === product.stages.length - 1}
              onSelect={() => onSelectStage(stage)}
              isSelected={selectedStageId === stage.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTracker;
