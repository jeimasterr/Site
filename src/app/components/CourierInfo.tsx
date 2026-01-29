import { Phone, MessageCircle, Star } from 'lucide-react';

interface CourierInfoProps {
  variant?: 'mobile' | 'desktop';
}

export function CourierInfo({ variant = 'mobile' }: CourierInfoProps) {
  if (variant === 'desktop') {
    return (
      <div className="bg-white rounded-[10px] p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] border border-[#e2e2e8]">
        <div className="flex items-center gap-3">
          {/* Courier avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffcc00] to-[#e6b800] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-inter)' }}>
              АБ
            </span>
          </div>
          
          {/* Courier info */}
          <div className="flex-1">
            <p className="font-bold text-[#191919]" style={{ fontFamily: 'var(--font-inter)' }}>
              Алексей Белов
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-[#ffcc00] fill-[#ffcc00]" />
              <span className="text-sm text-[#686868]" style={{ fontFamily: 'var(--font-inter)' }}>
                4.9 • 256 доставок
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-[#e2e2e8] flex items-center justify-center hover:bg-[#fffbeb] hover:border-[#ffcc00] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#191919]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#ffcc00] flex items-center justify-center hover:bg-[#e6b800] transition-colors">
              <Phone className="w-4 h-4 text-[#191919]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffbeb] rounded-[10px] p-4 mx-4 border border-[#ffcc00]/20">
      <div className="flex items-center gap-3">
        {/* Courier avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffcc00] to-[#e6b800] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-inter)' }}>
            АБ
          </span>
        </div>
        
        {/* Courier info */}
        <div className="flex-1">
          <p className="font-bold text-[#191919]" style={{ fontFamily: 'var(--font-inter)' }}>
            Алексей Белов
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 text-[#ffcc00] fill-[#ffcc00]" />
            <span className="text-sm text-[#686868]" style={{ fontFamily: 'var(--font-inter)' }}>
              4.9
            </span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full border border-[#ffcc00] bg-white flex items-center justify-center hover:bg-[#fffbeb] transition-colors">
            <MessageCircle className="w-4 h-4 text-[#191919]" />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#ffcc00] flex items-center justify-center hover:bg-[#e6b800] transition-colors">
            <Phone className="w-4 h-4 text-[#191919]" />
          </button>
        </div>
      </div>
    </div>
  );
}
