// web/hook/use-navigation.tsx
"use client";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  
  return {
    isChatActive: pathname === "/",
    isPlanesActive: pathname === "/explore",
    isTareasActive: pathname === "/notifications",
    isPerfilActive: pathname === "/messages",
  };
};

export default useNavigation;
