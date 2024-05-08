import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurant = async () => {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Restaurantes recomendados</h2>
        <div className="mt-3 flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurant;
