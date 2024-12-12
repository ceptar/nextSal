"use client";

import Link from "next/link";
import { NavLink } from "./NavLink";

type NavItem = {
	id: string;
	href?: string;
	name?: string;
	category?: { slug: string; name: string };
	collection?: { slug: string; name: string };
	page?: { slug: string; title: string };
	url?: string;
};

export const NavLinks = ({ navItems }: { navItems: NavItem[] }) => {
	return (
		<>
			{navItems.map((item) => {
				if (item.href) {
					return (
						<NavLink key={item.id} href={`/default-channel/{item.href}`}>
							{item.name}
						</NavLink>
					);
				}
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/default-channel/categories/${item.category.slug}`}>
							{item.category.name}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/default-channel/collections/${item.collection.slug}`}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/default-channel/pages/${item.page.slug}`}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={`/default-channel/{item.url}`}>
							{item.name}
						</Link>
					);
				}
				return null;
			})}
		</>
	);
};

