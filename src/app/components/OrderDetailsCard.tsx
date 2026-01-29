import { MessageCircle, Phone } from 'lucide-react';

interface OrderDetailsCardProps {
  variant?: 'mobile' | 'desktop';
}

export function OrderDetailsCard({ variant = 'mobile' }: OrderDetailsCardProps) {
  const orderItems = [
    { id: 1, name: 'Бургер классический', quantity: 2, price: 450 },
    { id: 2, name: 'Картофель фри', quantity: 1, price: 180 },
    { id: 3, name: 'Кока-кола 0.5л', quantity: 2, price: 120 },
  ];

  if (variant === 'desktop') {
    return (
      <div className="bg-white rounded-[10px] p-6 shadow-[0px_0px_5px_rgba(0,0,0,0.15)]">
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
          Состав заказа
        </h3>
        
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {/* Item image placeholder */}
              <div className="w-[43px] h-[43px] rounded-full bg-[#e2e2e8] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#686868]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
              </div>
              
              <div className="flex-1">
                <p className="text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                  {item.name}
                </p>
                <p className="text-xs text-[#686868]">
                  {item.quantity} шт × {item.price} ₽
                </p>
              </div>
              
              <p className="font-bold" style={{ fontFamily: 'var(--font-inter)' }}>
                {item.quantity * item.price} ₽
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#e2e2e8]">
          <div className="flex justify-between items-center">
            <p className="text-lg" style={{ fontFamily: 'var(--font-inter)' }}>
              Итого:
            </p>
            <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-inter)' }}>
              750 ₽
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[10px] p-4 mx-4 shadow-[0px_0px_5px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#ffcc00] flex items-center justify-center">
          <svg className="w-4 h-4 text-[#191919]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
        <p className="text-base" style={{ fontFamily: 'var(--font-inter)' }}>
          Курьер уже в пути
        </p>
      </div>
      
      <button
        className="w-full bg-[#ffcc00] text-[#191919] uppercase font-bold py-3 rounded-[30px] hover:bg-[#e6b800] transition-colors"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        ОТКРЫТЬ КАРТУ
      </button>
      
      {/* Contact buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#ffcc00] rounded-[30px] hover:bg-[#fffbeb] transition-colors">
          <MessageCircle className="w-4 h-4 text-[#191919]" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-inter)' }}>Чат</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#ffcc00] rounded-[30px] hover:bg-[#fffbeb] transition-colors">
          <Phone className="w-4 h-4 text-[#191919]" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-inter)' }}>Звонок</span>
        </button>
      </div>
    </div>
  );
}
