// web/components/bottom-nav.tsx
"use client";

import React from "react";

import Link from "next/link";

import useNavigation from "@/hook/use-navigation";
import useScrollingEffect from "@/hook/use-scroll";
import { Icon } from "@iconify-icon/react";

const BottomNav = () => {
  const scrollDirection = useScrollingEffect(); // Use the custom hook
  const navClass = scrollDirection === "up" ? "" : "opacity-100 duration-500";

  const {
    isChatActive,
    isPlanesActive,
    isTareasActive,
    isPerfilActive,
  } = useNavigation();

  // la clave para el texto es usar relative en el className de los <Link href>
  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg md:hidden ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <Link href="/" className="flex items-center relative">
          {isChatActive ? (
            <Icon style={{color: '#2563EB'}} icon="bx:comment" width="32" height="32" />
          ) : (
            <Icon icon="bx:comment" width="32" height="32" />
          )}
          <span className={`flex items-center mt-7 absolute -top-0.5 -left-1 ${isChatActive ? "font-bold text-[#2563EB]" : ""}`}>Chat</span>
        </Link>
        <Link href="/explore" className="flex items-center relative">
          {isPlanesActive ? (
            <Icon
              icon="glyphs:target-bold"
              width="32"
              height="32"
              className="stroke-current stroke-5"
            />
          ) : (
            <Icon icon="glyphs:target-bold" width="32" height="32" />
          )}
          <span className={`flex items-center mt-7 absolute -top-0.5 -left-1.5 ${isPlanesActive ? "font-bold text-[#2563EB]" : ""}`}>Planes</span>
        </Link>
        <Link href="/notifications" className="flex items-center relative">
          {isTareasActive ? (
            <Icon icon="material-symbols:select-check-box-rounded" width="32" height="32" />
          ) : (
            <Icon icon="material-symbols:select-check-box-rounded" width="32" height="32" />
          )}
          <span className={`flex items-center mt-7 absolute -top-0.5 -left-1.5 ${isTareasActive ? "font-bold text-[#2563EB]" : ""}`}>Tareas</span>
        </Link>
        <Link href="/messages" className="flex items-center relative">
          {isPerfilActive ? (
            <Icon icon="fa7-regular:user-alt" width="32" height="32" />
          ) : (
            <Icon icon="fa7-regular:user-alt" width="32" height="32" />
          )}
          <span className={`flex items-center mt-7 absolute -top-0.5 -left-1 ${isPerfilActive ? "font-bold text-[#2563EB]" : ""}`}>Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;