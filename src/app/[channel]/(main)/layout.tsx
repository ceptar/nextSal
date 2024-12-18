import { type ReactNode } from "react";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";
import { CookieConsent } from "@/ui/components/cookie/CookieConsent";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

export default function RootLayout(props: { children: ReactNode; params: { channel: string } }) {
	return (
		<>
			<Header channel={props.params.channel} />

			<main className="flex-1">{props.children}</main>
			<CookieConsent demo={false} variant="small" />
			<Footer channel={props.params.channel} />
		</>
	);
}
