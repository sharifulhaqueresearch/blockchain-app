
import React from 'react';
import { Document } from '../types';
import { XIcon } from './icons/MiscIcons';

interface DocumentViewerModalProps {
  document: Document | null;
  onClose: () => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
            <h2 className="text-xl font-bold text-slate-100">Document Details</h2>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <XIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="space-y-4 text-sm">
            <div>
                <p className="font-semibold text-slate-400">Document Name</p>
                <p className="text-slate-200">{document.name}</p>
            </div>
             <div>
                <p className="font-semibold text-slate-400">Document Type</p>
                <p className="bg-sky-500/20 text-sky-300 px-2 py-1 rounded-full inline-block text-xs font-medium mt-1">{document.type}</p>
            </div>
             <div>
                <p className="font-semibold text-slate-400">IPFS Hash (Decentralized Storage Link)</p>
                <p className="text-slate-300 font-mono text-xs bg-slate-900/70 p-2 rounded-md mt-1 break-all">{document.ipfsHash}</p>
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition-colors">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
