import { EvoLogo } from '@/app/components/EvoLogo';
import { User, Bell } from 'lucide-react';

export function DesktopHeader() {
  return (
    <div className="absolute top-0 right-0 left-[630px] z-50 bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <EvoLogo className="w-10 h-10" />
        <span 
          className="font-bold text-xl text-[#191919]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          evo
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#fffbeb] rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-[#191919]" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-[#ffcc00] rounded-full" />
        </button>
        <button className="p-2 hover:bg-[#fffbeb] rounded-full transition-colors">
          <User className="w-5 h-5 text-[#191919]" />
        </button>
      </div>
    </div>
  );
}
