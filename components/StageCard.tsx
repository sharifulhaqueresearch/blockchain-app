
import React from 'react';
import { SupplyChainStage } from '../types';
import { CheckCircleIcon, ClockIcon, TruckIcon, BuildingStorefrontIcon, CubeTransparentIcon, FactoryIcon, WarehouseIcon } from './icons/StageIcons';

interface StageCardProps {
  stage: SupplyChainStage;
  isLast: boolean;
  onSelect: () => void;
  isSelected: boolean;
}

const getStatusIcon = (status: SupplyChainStage['status']) => {
  switch (status) {
    case 'Completed':
      return <CheckCircleIcon className="h-6 w-6 text-emerald-400" />;
    case 'In-Transit':
      return <TruckIcon className="h-6 w-6 text-amber-400 animate-pulse" />;
    case 'Processing':
      return <CubeTransparentIcon className="h-6 w-6 text-sky-400" />;
    case 'Pending':
      return <ClockIcon className="h-6 w-6 text-slate-500" />;
    default:
      return null;
  }
};

const getRoleIcon = (role: string) => {
    switch (role) {
        case 'Supplier':
            return <CubeTransparentIcon className="h-5 w-5 text-slate-400" />;
        case 'Manufacturer':
            return <FactoryIcon className="h-5 w-5 text-slate-400" />;
        case 'Logistics':
            return <TruckIcon className="h-5 w-5 text-slate-400" />;
        case 'Distributor':
            return <WarehouseIcon className="h-5 w-5 text-slate-400" />;
        case 'Retailer':
            return <BuildingStorefrontIcon className="h-5 w-5 text-slate-400" />;
        default:
            return null;
    }
}


const StageCard: React.FC<StageCardProps> = ({ stage, onSelect, isSelected }) => {
  const participant = stage.participants[0];

  return (
    <div className="flex items-start space-x-4 sm:space-x-6">
      <div className="flex flex-col items-center">
        <div className={`flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full z-10 ring-4 ring-slate-900 ${
            stage.status === 'Completed' ? 'bg-emerald-900/50' : stage.status === 'In-Transit' ? 'bg-amber-900/50' : 'bg-slate-700/80'
        }`}>
            {getStatusIcon(stage.status)}
        </div>
      </div>
      <div className="flex-1 pt-2">
        <button
          onClick={onSelect}
          className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
            isSelected ? 'bg-slate-700/80 ring-2 ring-sky-500' : 'bg-slate-800 hover:bg-slate-700/50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold text-slate-100">{stage.name}</p>
              {participant && (
                <div className="flex items-center space-x-2 text-sm text-slate-400 mt-1">
                    {getRoleIcon(participant.role)}
                    <span>{participant.name} ({participant.role})</span>
                </div>
              )}
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stage.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 
                stage.status === 'In-Transit' ? 'bg-amber-500/20 text-amber-400' : 
                'bg-slate-600 text-slate-300'
            }`}>
              {stage.status}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {stage.timestamp ? new Date(stage.timestamp).toLocaleString() : 'Awaiting event'}
          </div>
        </button>
      </div>
    </div>
  );
};

export default StageCard;
