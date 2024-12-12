"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HeaderBackground() {
	const pathname = usePathname();
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const newOpacity = Math.min(currentScrollY / 30, 1);
			setOpacity(newOpacity);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (pathname === "/default-channel") {
		return (
			<div
				className={cn("absolute top-0 mt-0 h-16 w-full transition-colors duration-200")}
				style={{ backgroundColor: `rgb(var(--backgroundrgb) / ${opacity})` }}
			></div>
		);
	}

	return (
		<div
			className={cn("absolute top-0 mt-0 h-16 w-full transition-colors duration-200")}
			style={{ backgroundColor: `rgb(var(--backgroundrgb) / 1)` }}
		></div>
	);
}
