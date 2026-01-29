import { ActiveOrderWidget } from "@/app/components/ActiveOrderWidget";

const DISHES_BREAKFAST = [
  {
    id: 1,
    name: "Завтрак курильщика",
    description: "Завтрак для тех, кто не очень любит завтракать",
    price: 1000,
    priceFrom: false,
  },
  {
    id: 2,
    name: "Завтрак чемпиона",
    description: "Лучший сбалансированный завтрак",
    price: 100,
    priceFrom: true,
  },
  {
    id: 3,
    name: "Завтрак среднестатестического человека",
    description: "Обычный завтрак",
    price: 400,
    priceFrom: true,
  },
];

const DISHES_COMBO = [
  {
    id: 4,
    name: "Бургер кккомбо",
    description: "",
    price: 263,
    priceFrom: true,
  },
  {
    id: 5,
    name: "Комбо 1019",
    description:
      "Собери своё удивительное сочетание наших вкуснейших римских пицц за 1019 рублей!!!!",
    price: 1019,
    oldPrice: 1100,
    priceFrom: false,
  },
  {
    id: 6,
    name: "Ролл-комбо",
    description: "",
    price: 1500,
    priceFrom: false,
  },
  {
    id: 7,
    name: "Снэк-комбо",
    description: "",
    price: 465,
    priceFrom: true,
  },
];

interface RestaurantLandingProps {
  onTrackCourier: () => void;
}

export function RestaurantLanding({ onTrackCourier }: RestaurantLandingProps) {
  return (
    <div
      className="min-h-screen bg-[#f5f5f5]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Шапка */}
      <header className="sticky top-0 z-40 border-b border-[#e0e0e0] bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-[#191919]">
            Доставка роллов и пиццы Красноярск
          </h1>
          <p className="hidden text-sm text-[#686868] sm:block">
            Доставка работает с 00:00 до 23:50
          </p>
        </div>
      </header>

      {/* Промо-полоса */}
      <div className="bg-[#ffcc00] px-4 py-3">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-center text-sm font-medium text-[#191919] sm:text-left">
            Скачивай приложение, получай 1000₽ за первый заказ и другие
            индивидуальные скидки, все акции и бонусы в одном месте
          </p>
          <button
            type="button"
            className="rounded-full bg-[#191919] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#333]"
          >
            Скачать
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Виджет активного заказа — сверху или в сайдбаре на десктопе */}
        <div className="mb-8 lg:float-right lg:ml-6 lg:mb-6 lg:w-[320px]">
          <ActiveOrderWidget onTrackCourier={onTrackCourier} />
        </div>

        {/* Секция Завтраки */}
        <section className="mb-10">
          <h2 className="mb-1 text-lg font-bold text-[#191919]">
            Завтраки
          </h2>
          <p className="mb-4 text-sm text-[#686868]">Доступно до 16:05</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISHES_BREAKFAST.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
              >
                <h3 className="font-semibold text-[#191919]">{dish.name}</h3>
                {dish.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-[#686868]">
                    {dish.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-baseline gap-2">
                    {dish.priceFrom && (
                      <span className="text-sm text-[#686868]">от </span>
                    )}
                    <span className="text-lg font-bold text-[#191919]">
                      {dish.price.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg bg-[#ffcc00] px-4 py-2 text-sm font-semibold text-[#191919] transition-colors hover:bg-[#e6b800]"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Секция Комбо */}
        <section className="clear-both mb-10 lg:clear-none">
          <h2 className="mb-1 text-lg font-bold text-[#191919]">Комбо</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISHES_COMBO.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
              >
                <h3 className="font-semibold text-[#191919]">{dish.name}</h3>
                {dish.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-[#686868]">
                    {dish.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-baseline gap-2">
                    {dish.priceFrom && (
                      <span className="text-sm text-[#686868]">от </span>
                    )}
                    <span className="text-lg font-bold text-[#191919]">
                      {dish.price.toLocaleString("ru-RU")} ₽
                    </span>
                    {dish.oldPrice != null && (
                      <span className="text-sm text-[#686868] line-through">
                        {dish.oldPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="rounded-lg bg-[#ffcc00] px-4 py-2 text-sm font-semibold text-[#191919] transition-colors hover:bg-[#e6b800]"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
