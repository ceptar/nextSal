'use server'
import { Suspense } from "react";
import { SearchBar } from "../SearchBar";
import { MobileMenu } from "./MobileMenu";
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
// import { NavLinks } from "./NavLinks";

interface NavItem {
	id: string;
	href: string;
	name: string;
	category?: {
		slug: string;
		name: string;
	};
	collection?: {
		slug: string;
		name: string;
	};
	children?: NavItem[];
}

export const NavWrapper = async ({ channel }: { channel: string }) => {
	const navLinksData = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel: channel },
		revalidate: 60 * 60 * 24,
	});

	const navItems: NavItem[] = [
		{ id: "all", href: "products", name: "All" },
		...(navLinksData.menu?.items?.map((item) => ({
			id: item.id,
			name: item.name,
			href: item.url || "",
			category: item.category ? { slug: item.category.slug, name: item.category.name } : undefined,
			collection: item.collection ? { slug: item.collection.slug, name: item.collection.name } : undefined,
			children:
				item.children?.map((child) => ({
					id: child.id,
					name: child.name,
					href: child.url || "",
					category: child.category ? { slug: child.category.slug, name: child.category.name } : undefined,
					collection: child.collection
						? { slug: child.collection.slug, name: child.collection.name }
						: undefined,
				})) || [],
		})) || []),
	];
console.log('navItems', navItems)
	return (
		<div className="flex items-center z-[100]">
			{/* <Suspense fallback={<div className="w-8" />}>
				<CartNavItem channel={channel} />
			</Suspense> 
			<NavLinks navItems={navItems} />*/}
			<MobileMenu navItems={navItems}>
				<Suspense>
					<SearchBar channel={channel} />
				</Suspense>
			</MobileMenu>
		</div>
	);
};
