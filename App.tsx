
import React, { useState, useMemo } from 'react';
import { Product, SupplyChainStage, Document } from './types';
import { mockProducts as initialMockProducts } from './services/mockData';
import Header from './components/Header';
import ProductSelector from './components/ProductSelector';
import ProductTracker from './components/ProductTracker';
import DetailsPanel from './components/DetailsPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AddProductModal from './components/AddProductModal';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialMockProducts);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products.length > 0 ? products[0].id : null);
  const [selectedStage, setSelectedStage] = useState<SupplyChainStage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId, products]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSelectedStage(null); // Reset stage selection when product changes
  };
  
  const handleSelectStage = (stage: SupplyChainStage) => {
    setSelectedStage(stage);
  };

  const handleHomeClick = () => {
    setSelectedProductId(null);
    setSelectedStage(null);
  };

  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setSelectedProductId(newProduct.id); // Select the new product
    setSelectedStage(null);
  };

  const handleAttachDocument = (productId: string, stageId: string, document: Document) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            stages: product.stages.map(stage => {
              if (stage.id === stageId) {
                return {
                  ...stage,
                  documents: [...stage.documents, document],
                };
              }
              return stage;
            }),
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header onHomeClick={handleHomeClick} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3">
            <ProductSelector
              products={products}
              selectedProductId={selectedProductId}
              onSelectProduct={handleSelectProduct}
              onAddProductClick={() => setIsModalOpen(true)}
            />
             {selectedProduct && <AnalyticsDashboard product={selectedProduct} />}
          </div>
          
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              {selectedProduct ? (
                <ProductTracker 
                  product={selectedProduct} 
                  onSelectStage={handleSelectStage}
                  selectedStageId={selectedStage?.id}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-800/50 rounded-lg p-8">
                  <p className="text-xl text-slate-400">Select a product to view its journey or add a new one.</p>
                </div>
              )}
            </div>
            <div className="xl:col-span-1">
              <DetailsPanel 
                stage={selectedStage} 
                product={selectedProduct}
                onAttachDocument={handleAttachDocument}
              />
            </div>
          </div>
        </div>
      </main>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default App;
