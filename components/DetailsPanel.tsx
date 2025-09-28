
import React, { useState, useEffect } from 'react';
import { SupplyChainStage, Product, Document } from '../types';
import { explainBlockchainConcept } from '../services/geminiService';
import { DocumentIcon, LinkIcon, SparklesIcon, PaperClipIcon } from './icons/MiscIcons';
import DocumentViewerModal from './DocumentViewerModal';

interface DetailsPanelProps {
  stage: SupplyChainStage | null;
  product: Product | null;
  onAttachDocument: (productId: string, stageId: string, document: Document) => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ stage, product, onAttachDocument }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  
  const [isAddingDocument, setIsAddingDocument] = useState<boolean>(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState<'Certification' | 'Invoice' | 'Bill of Lading' | 'Quality Report'>('Quality Report');
  
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  useEffect(() => {
    // Reset states when stage changes
    setExplanation('');
    setShowExplanation(false);
    setIsAddingDocument(false);
    setNewDocName('');
  }, [stage]);

  const handleExplainClick = async () => {
    if (!stage || !product) return;

    setShowExplanation(true);
    setIsLoading(true);
    const prompt = `In the context of a supply chain for "${product.name}", explain the importance and function of the "${stage.name}" stage. Specifically, how does blockchain technology with smart contracts (like "${stage.smartContracts[0]?.name || 'automated agreements'}") enhance transparency and security at this step?`;
    
    const result = await explainBlockchainConcept(prompt);
    setExplanation(result);
    setIsLoading(false);
  };

  const handleAddDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName || !product || !stage) return;

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: newDocName,
      type: newDocType,
      ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}...`,
    };

    onAttachDocument(product.id, stage.id, newDocument);

    // Reset form
    setIsAddingDocument(false);
    setNewDocName('');
    setNewDocType('Quality Report');
  };

  if (!stage) {
    return (
      <div className="sticky top-24 bg-slate-800/50 rounded-lg p-6 shadow-lg h-full flex items-center justify-center">
        <p className="text-slate-400 text-center">Select a stage from the timeline to see details.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-24 bg-slate-800/50 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-700 pb-3">{stage.name} Details</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-slate-400">Location</p>
            <p className="text-slate-200">{stage.location}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-400">Timestamp</p>
            <p className="text-slate-200">{stage.timestamp ? new Date(stage.timestamp).toLocaleString() : 'N/A'}</p>
          </div>
          
          <div className="pt-2">
              <p className="font-semibold text-slate-400 mb-1">Blockchain Record</p>
              <div className="bg-slate-900/70 p-2 rounded-md font-mono text-xs space-y-1">
                  <p className="truncate"><span className="text-sky-400">TX Hash:</span> {stage.txHash || 'Pending...'}</p>
                  <p className="truncate"><span className="text-sky-400">Prev TX:</span> {stage.prevTxHash}</p>
              </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-slate-400">Attached Documents</p>
              {!isAddingDocument && (
                <button onClick={() => setIsAddingDocument(true)} className="text-xs flex items-center space-x-1 text-sky-400 hover:text-sky-300">
                  <PaperClipIcon className="h-4 w-4" />
                  <span>Attach</span>
                </button>
              )}
            </div>
            
            {isAddingDocument && (
              <form onSubmit={handleAddDocumentSubmit} className="bg-slate-700/50 p-3 rounded-md mb-2 space-y-3">
                <input
                  type="text"
                  placeholder="Document Name"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full bg-slate-800 border-slate-600 rounded-md p-2 text-white text-xs focus:ring-sky-500 focus:border-sky-500"
                  required
                />
                <select 
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
                  className="w-full bg-slate-800 border-slate-600 rounded-md p-2 text-white text-xs focus:ring-sky-500 focus:border-sky-500"
                >
                  <option>Quality Report</option>
                  <option>Certification</option>
                  <option>Invoice</option>
                  <option>Bill of Lading</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setIsAddingDocument(false)} className="text-xs px-2 py-1 bg-slate-600 rounded hover:bg-slate-500">Cancel</button>
                  <button type="submit" className="text-xs px-2 py-1 bg-sky-600 rounded hover:bg-sky-500 font-semibold">Save</button>
                </div>
              </form>
            )}

            <ul className="space-y-2">
              {stage.documents.map(doc => (
                <li key={doc.id}>
                  <button onClick={() => setViewingDocument(doc)} className="w-full flex items-center space-x-2 bg-slate-700/50 p-2 rounded-md hover:bg-slate-700 transition-colors text-left">
                      <DocumentIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      <span className="flex-grow text-slate-300">{doc.name} ({doc.type})</span>
                      <LinkIcon className="h-4 w-4 text-sky-400" />
                  </button>
                </li>
              ))}
               {stage.documents.length === 0 && !isAddingDocument && (
                <p className="text-xs text-slate-500 italic">No documents attached.</p>
              )}
            </ul>
          </div>

          {stage.smartContracts.length > 0 && (
            <div>
              <p className="font-semibold text-slate-400 mb-2">Automated Actions (Smart Contracts)</p>
              <ul className="space-y-2">
                  {stage.smartContracts.map(sc => (
                      <li key={sc.name} className="p-2 bg-slate-700/50 rounded-md">
                          <div className="flex justify-between items-center">
                              <span className="text-slate-300">{sc.name}</span>
                              <span className={`text-xs font-bold ${sc.triggered ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {sc.triggered ? 'EXECUTED' : 'PENDING'}
                              </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{sc.description}</p>
                      </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <button onClick={handleExplainClick} disabled={isLoading} className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            <SparklesIcon className="h-5 w-5" />
            <span>{isLoading ? 'Thinking...' : 'Explain with AI'}</span>
          </button>
          {showExplanation && (
              <div className="mt-4 p-4 bg-slate-900/70 rounded-md">
                  {isLoading ? (
                      <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                      </div>
                  ) : (
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{explanation}</p>
                  )}
              </div>
          )}
        </div>
      </div>
      <DocumentViewerModal document={viewingDocument} onClose={() => setViewingDocument(null)} />
    </>
  );
};

export default DetailsPanel;
