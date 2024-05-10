"use client";

import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOut,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => {
    signOut();
  };

  const handleLoginClick = () => {
    signIn();
  };

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/" className="relative h-[30px] w-[100px]">
        <Image
          src="/logo.svg"
          alt="Logotipo FSW Food"
          fill
          className="object-cover"
        />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="mt-6 flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image as string | undefined}
                  alt={data?.user?.name as string | undefined}
                />
                <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">{data?.user?.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data?.user?.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex items-center justify-between">
              <h2 className="font-semibold">Olá, faça seu login</h2>
              <Button size="icon" variant="ghost" onClick={handleLoginClick}>
                <LogInIcon size={18} />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-sm font-normal"
          >
            <HomeIcon size="16" />
            <span className="block">Inicio</span>
          </Button>

          {data?.user && (
            <>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                >
                  <ScrollTextIcon size="16" />
                  <span className="block">Meus Pedidos </span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                >
                  <HeartIcon size="16" />
                  <span className="block">Restaurante Favoritos</span>
                </Button>
              </div>

              <div className="py-6">
                <Separator />
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 text-sm font-normal"
                onClick={handleSignOutClick}
              >
                <LogOutIcon size="16" />
                <span className="block">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
