"use client";

import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const { products, subtotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: OrderStatus.CONFIRME,
        user: {
          connect: {
            id: data.user.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido realizado com sucesso!", {
        description: "Acompanhe o seu pedido na página de pedidos.",
        action: {
          label: "Pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen overflow-x-auto py-5 [&::-webkit-scrollbar]:hidden">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
            <Card className="my-5">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal: </span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator className="w-full border" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="font-medium uppercase text-primary">
                      Grátis
                    </span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>

                <Separator className="w-full border" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Desconto: </span>
                  <span>{formatCurrency(totalDiscount)}</span>
                </div>

                <Separator className="w-full border" />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total: </span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        )}

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleFinishOrderClick}>
                {isSubmitLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Cart;
