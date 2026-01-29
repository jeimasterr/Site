import { Truck } from "lucide-react";

interface ActiveOrderWidgetProps {
  onTrackCourier: () => void;
}

export function ActiveOrderWidget({ onTrackCourier }: ActiveOrderWidgetProps) {
  return (
    <div
      className="rounded-xl bg-[#00a651] p-5 text-white shadow-lg"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Верх: иконка + статус и дата/время */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white">
            <Truck className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide opacity-95">
              Доставляем
            </p>
            <p className="text-sm font-medium uppercase tracking-wide opacity-95">
              заказ
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">12 ноября</p>
          <p className="text-sm font-medium">12:30–12:45</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-white/30 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide opacity-90">
            Номер заказа
          </p>
          <p className="text-2xl font-bold">246</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide opacity-90">
            Сумма
          </p>
          <p className="text-2xl font-bold">1 586 ₽</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onTrackCourier}
        className="mt-4 w-full rounded-lg bg-white py-3 font-bold text-[#00a651] transition-colors hover:bg-gray-100 active:bg-gray-200"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Отследить курьера
      </button>
    </div>
  );
}
