// web/components/max-width-wrapper.tsx
import { ReactNode } from "react";

export default function MaxWidthWrapper({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl md:px-2.5">{children}</div>;
}
