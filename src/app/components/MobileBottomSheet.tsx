import { Drawer } from "vaul";
import { useState, useEffect, useRef } from "react";

interface MobileBottomSheetProps {
  onStateChange?: (isExpanded: boolean) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export function MobileBottomSheet({
  onStateChange,
  onOpenChange,
}: MobileBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

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

  // Отслеживаем изменение высоты drawer для определения состояния
  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
      if (onStateChange) {
        onStateChange(false);
      }
      return;
    }

    const checkHeight = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const heightPercent = rect.height / windowHeight;
        // Если высота больше 80% экрана, считаем панель развернутой (для центрирования точек)
        const expanded = heightPercent > 0.8;
        if (expanded !== isExpanded) {
          setIsExpanded(expanded);
          if (onStateChange) {
            onStateChange(expanded);
          }
        }
      }
    };

    // Проверяем периодически и при изменении размера
    const interval = setInterval(checkHeight, 150);
    const observer = new ResizeObserver(checkHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Первоначальная проверка
    setTimeout(checkHeight, 200);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isOpen, isExpanded, onStateChange]);

  return (
    <>
      {/* Minimal Panel - Always visible at bottom, opens drawer on swipe */}
      <div
        className="bg-[#474a51] rounded-t-xl shadow-[0px_-4px_20px_rgba(0,0,0,0.2)] cursor-grab active:cursor-grabbing"
        onClick={() => setIsOpen(true)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startY = touch.clientY;

          const handleTouchMove = (moveEvent: TouchEvent) => {
            const currentTouch = moveEvent.touches[0];
            const deltaY = startY - currentTouch.clientY;

            // Если свайп вверх больше 10px, открываем drawer
            if (deltaY > 10) {
              setIsOpen(true);
              document.removeEventListener(
                "touchmove",
                handleTouchMove,
              );
              document.removeEventListener(
                "touchend",
                handleTouchEnd,
              );
            }
          };

          const handleTouchEnd = () => {
            document.removeEventListener(
              "touchmove",
              handleTouchMove,
            );
            document.removeEventListener(
              "touchend",
              handleTouchEnd,
            );
          };

          document.addEventListener(
            "touchmove",
            handleTouchMove,
            { passive: true }
          );
          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-2.5 pb-1.5">
          <div className="w-10 h-1 bg-[#d9d9d9] rounded-full opacity-50" />
        </div>

        {/* Minimal Content - Only ETA */}
        <div className="px-4 pb-2.5">
          <p
            className="text-white text-center text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Прибудет через ~25 минут
          </p>
        </div>
      </div>

      {/* Drawer that opens on swipe */}
      <Drawer.Root
        modal={false}
        dismissible={true}
        open={isOpen}
        onOpenChange={handleOpenChange}
        snapPoints={[0.7, 0.95]}
        shouldScaleBackground={false}
        activeSnapPoint={isExpanded ? 0.95 : 0.7}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40 pointer-events-none" />
          <Drawer.Content
            ref={contentRef}
            className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[#474a51] rounded-t-xl shadow-[0px_-4px_20px_rgba(0,0,0,0.2)] z-50 flex flex-col outline-none min-h-0"
            style={{ 
              maxHeight: "95vh",
              minHeight: "70vh",
            }}
          >
            {/* Drag Handle */}
            <div 
              className="flex justify-center pt-4 pb-3 flex-shrink-0 cursor-grab active:cursor-grabbing"
              data-vaul-no-drag={false}
            >
              <div className="w-10 h-1 bg-[#d9d9d9] rounded-full opacity-50" />
            </div>

            {/* Compact view when partially open */}
            <div className="px-4 pb-4 flex-shrink-0" data-vaul-no-drag={false}>
              {/* ETA Text */}
              <p
                className="text-white text-center mb-3 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Прибудет через ~25 минут
              </p>

              {/* Progress line with dots */}
              <div className="relative mb-4">
                <div className="flex items-center justify-between">
                  {/* Start point - yellow */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] relative z-10" />

                  {/* Middle dots */}
                  <div className="flex-1 flex items-center justify-evenly px-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#d9d9d9]"
                      />
                    ))}
                  </div>

                  {/* End point - teal */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00af54] relative z-10" />
                </div>

                {/* Background line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#d9d9d9] -z-10 transform -translate-y-1/2 opacity-30" />
              </div>
            </div>

            {/* Full details - scroll area + кнопка всегда внизу */}
            <div className="flex-1 min-h-0 flex flex-col bg-white rounded-t-xl overflow-hidden">
              {/* Scrollable content area */}
              <div
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
                data-vaul-no-drag
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                }}
                onTouchStart={(e) => {
                  // Prevent drawer drag when scrolling content
                  e.stopPropagation();
                }}
              >
                {/* Header Info */}
                <div className="px-4 pb-3 pt-4 border-b border-[#e2e2e8]">
                  <Drawer.Title asChild>
                    <h2
                      className="text-[32px] font-bold text-[#191919] leading-none mb-2"
                      style={{
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      №234567
                    </h2>
                  </Drawer.Title>

                  <Drawer.Description asChild>
                    <div>
                      <p
                        className="text-base text-[#686868] mb-1.5"
                        style={{
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        пр-т Металлургов, д. 32, под. 1, эт. 13,
                        кв. 432
                      </p>

                      <p
                        className="text-base text-[#686868]"
                        style={{
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        ~25-30 минут
                      </p>
                    </div>
                  </Drawer.Description>
                </div>

                {/* Order items */}
                <div className="px-4 py-4">
                  <h3
                    className="text-lg font-bold mb-4 text-[#191919]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Состав заказа
                  </h3>

                  <div className="space-y-4 mb-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3"
                      >
                        {/* Item image placeholder */}
                        <div className="w-[43px] h-[43px] rounded-full bg-[#e2e2e8] flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-[#686868]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <p
                            className="text-sm text-[#191919] mb-0.5"
                            style={{
                              fontFamily: "var(--font-inter)",
                            }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="text-xs text-[#686868]"
                            style={{
                              fontFamily: "var(--font-inter)",
                            }}
                          >
                            {item.quantity} шт × {item.price} ₽
                          </p>
                        </div>

                        <p
                          className="font-bold text-[#191919] text-base"
                          style={{
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {item.quantity * item.price} ₽
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#e2e2e8] mb-4">
                    <div className="flex justify-between items-center">
                      <p
                        className="text-lg text-[#191919] font-bold"
                        style={{
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        Итого:
                      </p>
                      <p
                        className="text-xl font-bold text-[#191919]"
                        style={{
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        750 ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка «Позвонить» — всегда прижата к низу drawer */}
              <div 
                className="px-4 pb-6 pt-3 border-t border-[#e2e2e8] flex-shrink-0 bg-white rounded-b-xl"
                data-vaul-no-drag
              >
                <button
                  className="w-full border-2 border-[#ffcc00] text-[#191919] uppercase font-bold h-[40px] rounded-[50px] hover:bg-[#fffbeb] active:bg-[#fff4cc] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Звоним в ресторан...");
                  }}
                >
                  ПОЗВОНИТЬ В РЕСТОРАН
                </button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
