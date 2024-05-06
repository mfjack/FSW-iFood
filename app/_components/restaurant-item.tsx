import { Restaurant } from "@prisma/client";
import { Bike, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="max-w-[266px]: min-w-[266px] space-y-2">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}  
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-300 text-yellow-300" />
          <span className="text-xs font-semibold ">5.0</span>
        </div>

        <Button
          size="icon"
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-muted-foreground "
        >
          <HeartIcon size={16} className="fill-white" />
        </Button>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-4 items-center mt-1">
          <div className="flex items-center gap-1">
            <Bike size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <TimerIcon size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
