"use client";

import clsx from "clsx";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = useSelectedPathname();
  const isActive = pathname === href;

  return (
    <li className="inline-flex">
      <LinkWithChannel
        href={href}
        className={clsx(
          "inline-flex items-center border-b-2 pt-px text-sm font-medium",
          isActive
            ? "border-neutral-900 text-neutral-900"
            : "border-transparent text-neutral-500 hover:text-neutral-700"
        )}
      >
        {children}
      </LinkWithChannel>
    </li>
  );
}