import { ArrowLeft } from 'lucide-react';
import { EvoLogo } from '@/app/components/EvoLogo';

export function MobileHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft className="w-6 h-6 text-[#191919]" />
      </button>
      
      <div className="flex items-center gap-2">
        <EvoLogo className="w-8 h-8" />
        <span 
          className="font-bold text-lg text-[#191919]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          evo
        </span>
      </div>
      
      <div className="w-10" /> {/* Spacer for centering */}
    </div>
  );
}
