
import React from 'react';
import { Product } from '../types';
import { PlusIcon } from './icons/MiscIcons';

interface ProductSelectorProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
  onAddProductClick: () => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ products, selectedProductId, onSelectProduct, onAddProductClick }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Tracked Products</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product.id)}
            className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-center space-x-4 ${
              selectedProductId === product.id
                ? 'bg-sky-500/20 ring-2 ring-sky-500 shadow-md'
                : 'bg-slate-700/50 hover:bg-slate-700'
            }`}
          >
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-semibold text-slate-100">{product.name}</p>
              <p className="text-xs text-slate-400">{product.batchNumber}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700">
        <button
          onClick={onAddProductClick}
          className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Product</span>
        </button>
      </div>
    </div>
  );
};

export default ProductSelector;
