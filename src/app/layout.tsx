import localFont from 'next/font/local'
import "./globals.css";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";

const inter = localFont({
	src: '../ui/fonts/DMSansVar.woff',
	display: 'swap',
	variable: '--font-inter',
  })

const titlefont = localFont({
	src: '../ui/fonts/BebasNeue.woff2',
	display: 'swap',
	variable: '--font-titlefont',
})

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout({
	children,
  }: {
	children: React.ReactNode
  }) {
	return (
		<html lang="en" className={`${inter.variable} ${titlefont.variable}`}>			
		<body className={`min-h-dvh`}>
				{children}
				<DraftModeNotification />
			</body>
		</html>
	);
}
