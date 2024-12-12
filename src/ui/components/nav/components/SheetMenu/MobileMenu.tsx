"use client";

import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";

type NavItem = {
    id: string;
    href?: string;
    name?: string;
    category?: { slug: string; name: string };
    collection?: { slug: string; name: string };
    page?: { slug: string; title: string };
    url?: string;
};

interface MobileMenuProps {
    navItems: NavItem[];
    children: React.ReactNode; // This will be the SearchBar
}

export function MobileMenu({ navItems, children }: MobileMenuProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button
                    className={clsx(
                        "relative flex w-12 h-12 md:w-16 md:h-16 flex-col items-center justify-center hover:bg-primary-foreground/20 transition duration-150 ease-in-out",
                    )}
                >
                    <svg
                        className="w-7 h-7 md:w-8 md:h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 16.125V14.625H20.5V16.125H3ZM3 8.5V7H20.5V8.5H3Z"
                            fill="hsl(var(--primary-foreground))"
                        ></path>
                    </svg>
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full md:w-[1/2]" aria-describedby="Drawer Menu">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="my-16">
                    {children} {/* This is where the SearchBar will be rendered */}
                </div>
                <nav className="flex flex-col border-b-[2px] border-primary" aria-describedby="Drawer Menu">
                    {navItems.map((item) => {
                        let href = "";
                        let label = "";

                        if (item.href) {
                            href = `/default-channel/${item.href}`;
                            label = item.name || "";
                        } else if (item.category) {
                            href = `/default-channel/categories/${item.category.slug}`;
                            label = item.category.name;
                        } else if (item.collection) {
                            href = `/default-channel/collections/${item.collection.slug}`;
                            label = item.collection.name;
                        } else if (item.page) {
                            href = `/default-channel/pages/${item.page.slug}`;
                            label = item.page.title;
                        } else if (item.url) {
                            href = `/default-channel/${item.url}`;
                            label = item.name || "";
                        }

                        return (
                            <Link
                                key={item.id}
                                href={href}
                                className="text-lg py-3 px-1 border-t-[2px] border-primary uppercase font-medium hover:underline"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
}