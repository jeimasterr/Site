import { Package } from 'lucide-react';

export function OrderBottomPanel() {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#00af54] rounded-t-xl shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]">
      <div className="max-w-[375px] mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Order info */}
          <div className="flex-1">
            <p 
              className="text-white text-[38.62px] leading-none font-bold mb-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              №234567
            </p>
            <p 
              className="text-white text-xl mb-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              17:30 - 18:00
            </p>
            <p 
              className="text-white text-base opacity-90"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Сумма: 750 ₽
            </p>
          </div>
          
          {/* Right side - Delivery icon */}
          <div className="w-16 h-16 rounded-full bg-white border-2 border-white flex items-center justify-center flex-shrink-0">
            <Package className="w-8 h-8 text-[#00af54]" />
          </div>
        </div>
      </div>
    </div>
  );
}