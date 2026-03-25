// web/hook/use-navigation.tsx
"use client";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();

  return {
    isChatActive: pathname === "/",
    isPlanesActive: pathname === "/planes",
    isTareasActive: pathname === "/tareas",
    isPerfilActive: pathname === "/perfil",
  };
};

export default useNavigation;
