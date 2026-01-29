import { useState } from "react";
import { CourierMap } from "@/app/components/CourierMap";
import { MobileBottomSheet } from "@/app/components/MobileBottomSheet";
import { RestaurantLanding } from "@/app/components/RestaurantLanding";
import { X } from "lucide-react";

export default function App() {
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const orderItems = [
    {
      id: 1,
      name: "Бургер классический",
      quantity: 2,
      price: 450,
    },
    { id: 2, name: "Картофель фри", quantity: 1, price: 180 },
    { id: 3, name: "Кока-кола 0.5л", quantity: 2, price: 120 },
  ];

  const handleMapInteraction = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  // Главный экран — сайт доставки с виджетом активного заказа
  if (!showTrackingPopup) {
    return (
      <RestaurantLanding
        onTrackCourier={() => setShowTrackingPopup(true)}
      />
    );
  }

  // Попап отслеживания курьера (мобильный и десктоп)
  return (
    <div
      className="min-h-screen bg-[#fafafa]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Mobile: карта + нижняя панель */}
      <div className="lg:hidden w-full h-screen max-w-[375px] mx-auto bg-white overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 relative">
          <CourierMap
            isPanelExpanded={isPanelExpanded}
            onMapInteraction={handleMapInteraction}
          />
        </div>
        <MobileBottomSheet
          onStateChange={setIsPanelExpanded}
          onOpenChange={setIsDrawerOpen}
        />
      </div>

      {/* Desktop: модальное окно с картой и панелью заказа */}
      <div className="hidden lg:flex items-center justify-center min-h-screen bg-black/40">
        <div className="w-[1028px] h-[680px] bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex overflow-hidden">
          <div className="w-[719px] h-full relative">
            <CourierMap />
          </div>
          <div className="w-[309px] h-full bg-white flex flex-col">
            <div className="px-6 pt-6 pb-4 border-b border-[#e2e2e8]">
              <div className="flex items-start justify-between mb-3">
                <h1
                  className="text-[20px] leading-tight font-bold text-[#191919] flex-1 pr-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Ваш заказ №234567 в пути!
                </h1>
                <button
                  onClick={() => setShowTrackingPopup(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5 text-[#686868]" />
                </button>
              </div>
              <p
                className="text-sm text-[#686868] mb-1.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Курьер едет к вам по адресу: пр-т Металлургов,
                д. 32, под. 1, эт. 13, кв. 432
              </p>
              <p
                className="text-sm text-[#686868]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Ожидаемое время доставки: ~25-30 минут
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="bg-white rounded-[10px] p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] mb-5">
                <h3
                  className="text-base font-bold mb-3 text-[#191919]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Состав заказа
                </h3>
                <div className="max-h-[200px] overflow-y-auto space-y-3 mb-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2"
                    >
                      <div className="w-[38px] h-[38px] rounded-full bg-[#e2e2e8] flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-[#686868]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs text-[#191919] truncate"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-[10px] text-[#686868]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.quantity} шт × {item.price} ₽
                        </p>
                      </div>
                      <p
                        className="text-sm font-bold text-[#191919] flex-shrink-0"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.quantity * item.price} ₽
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#e2e2e8]">
                  <div className="flex justify-between items-center">
                    <p
                      className="text-base text-[#191919] font-bold"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Итого:
                    </p>
                    <p
                      className="text-lg font-bold text-[#191919]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      750 ₽
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-3 border-t border-[#e2e2e8]">
              <button
                className="w-full border-2 border-[#ffcc00] text-[#191919] uppercase font-bold h-[40px] rounded-[50px] hover:bg-[#fffbeb] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ПОЗВОНИТЬ В РЕСТОРАН
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* На мобильном — кнопка «Назад» поверх карты */}
      <button
        onClick={() => setShowTrackingPopup(false)}
        className="fixed top-4 left-4 z-50 rounded-full bg-white px-4 py-2 shadow-lg lg:hidden"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Назад к заказу
      </button>
    </div>
  );
}