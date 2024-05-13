"use client";

import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";
import Link from "next/link";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decrementProductQuantity,
    incrementProductQuantity,
    removeProductCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decrementProductQuantity(cartProduct.id);
  };

  const handleIncrementQuantityClick = () => {
    incrementProductQuantity(cartProduct.id);
  };

  const handleRemoveProductClick = () => {
    removeProductCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href={`/products/${cartProduct.id}`}
          className="relative h-24 w-24"
        >
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
          />
        </Link>

        <div className="space-y-1">
          <h3 className="text-sm">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>

            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <span className="w-4">{cartProduct.quantity}</span>

            <Button
              className="h-7 w-7"
              size="icon"
              onClick={handleIncrementQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
