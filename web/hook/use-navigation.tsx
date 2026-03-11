// web/hook/use-navigation.tsx
"use client";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  
  return {
    isHomeActive: pathname === "/",
    isExploreActive: pathname === "/explore",
    isNotificationsActive: pathname === "/notifications",
    isMessagesActive: pathname === "/messages",
  };
};

export default useNavigation;
