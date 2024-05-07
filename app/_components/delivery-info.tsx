import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around p-5">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BikeIcon />
          <span className="text-xs">Entrega</span>
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p>Entrega grátis</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TimerIcon />
          <span className="text-xs">Entrega</span>
        </div>
        <span className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min.
        </span>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
