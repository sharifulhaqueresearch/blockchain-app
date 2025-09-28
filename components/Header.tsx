
import React from 'react';
import { ChainIcon } from './icons/ChainIcon';
import { HomeIcon } from './icons/MiscIcons';

interface HeaderProps {
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ChainIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Blockchain Supply Chain Visualizer
            </h1>
          </div>
          <button onClick={onHomeClick} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Home">
            <HomeIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
