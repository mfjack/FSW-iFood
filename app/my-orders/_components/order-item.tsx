"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRME":
      return "Confirmado";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Em preparação";
    case "DELIVERING":
      return "Em transporte";
    case "COMPLETED":
      return "Finalizado";
    default:
      return "Indefinido";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const handleOrderClick = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }

    router.push(`/restaurants/${order.restaurant.id}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`
          w-fit rounded-full bg-muted px-2 py-1 text-muted-foreground 
          ${order.status === "CANCELED" && "bg-red-600 text-white"} 
          ${order.status === "PREPARING" && "bg-yellow-600 text-white"} 
          ${order.status === "DELIVERING" && "bg-blue-600 text-white"}
          ${order.status === "CONFIRME" && "bg-green-600 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatus(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>

            <span className="text-sm font-semibold text-muted-foreground">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurant.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div>
          {order.products.map((product) => (
            <div className="flex items-center gap-2" key={product.id}>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-prymary text-xs"
            onClick={handleOrderClick}
          >
            Refazer o Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
