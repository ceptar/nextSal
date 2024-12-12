// NavLeft.tsx
import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";

export const NavLeft = ({ channel }: { channel: string }) => {
  return (
    <div className="flex items-center ml-4">
      <Suspense fallback={<div className="w-8" />}>
        <UserMenuContainer />
      </Suspense>

      <Suspense fallback={<div className="w-8" />}>
        <CartNavItem channel={channel} />
      </Suspense>
    </div>
  );
};