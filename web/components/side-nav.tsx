// web/components/ui/side-nav.tsx
"use client";

import React from "react";

import Link from "next/link";

import useNavigation from "@/hook/use-navigation";
import { Icon } from "@iconify-icon/react";

const SideNav = () => {
  const { isChatActive, isPlanesActive, isTareasActive, isPerfilActive } =
    useNavigation();

  /* sm:hidden y md:flex en el primer <div> son la clave para el responsive */
  return (
    <div className="flex-col space-y-4 items-center py-8 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg hidden sm:hidden md:flex border-r h-full w-30 md:w-62.5 md:items-start fixed">
      <Link
        href="/"
        className="flex flex-row space-x-1 items-center hover:bg-white/10 p-4 rounded-full duration-200"
      >
        <Icon icon="" width="38" height="38"></Icon>{" "}
        {/* Aquí pondríamos el logo del Smart Life Coach */}
      </Link>
      <Link
        href="/"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 relative"
      >
        {isChatActive ? (
          <Icon
            style={{ color: "#2563EB" }}
            icon="bx:comment"
            width="38"
            height="38"
          />
        ) : (
          <Icon icon="bx:comment" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${isChatActive ? "font-bold text-[#2563EB]" : ""}`}
        >
          Chat
        </span>
        {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
      </Link>
      <Link
        href="/planes"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10"
      >
        {isPlanesActive ? (
          <Icon
            style={{ color: "#2563EB" }}
            icon="glyphs:target-bold"
            width="38"
            height="38"
            className=""
          />
        ) : (
          <Icon icon="glyphs:target-bold" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isPlanesActive ? "font-bold text-[#2563EB]" : ""
          }`}
        >
          Planes
        </span>
      </Link>
      <Link
        href="/tareas"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10"
      >
        {isTareasActive ? (
          <Icon
            style={{ color: "#2563EB" }}
            icon="material-symbols:select-check-box-rounded"
            width="38"
            height="38"
          />
        ) : (
          <Icon
            icon="material-symbols:select-check-box-rounded"
            width="38"
            height="38"
          />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isTareasActive ? "font-bold text-[#2563EB]" : ""
          }`}
        >
          Tareas
        </span>
      </Link>
      <Link
        href="/perfil"
        className="flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10"
      >
        {isPerfilActive ? (
          <Icon
            style={{ color: "#2563EB" }}
            icon="fa7-regular:user-alt"
            width="38"
            height="38"
          />
        ) : (
          <Icon icon="fa7-regular:user-alt" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isPerfilActive ? "font-bold text-[#2563EB]" : ""
          }`}
        >
          Perfil
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
