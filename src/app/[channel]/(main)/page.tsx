import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { HeroTwo } from "@/ui/components/HeroTwo";
import { PageTitle } from "@/ui/components/layout/PagesTitle";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "ACME Storefront, powered by Saleor & Next.js",
	description:
		"Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.",
};

export default async function Page({ params }: { params: { channel: string } }) {
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);
    const title="featured products";

	return (
		<>
			<section className="absolute top-0 h-[100vh] w-full">
				<HeroTwo />
			</section>
			<section className="">
			<div className="flex relative h-[calc(100vh-64px)] w-full"></div>
			</section>
			<section className="mb-[5rem] p-4">

            <PageTitle title={title} />

				<ProductList products={products} />
			</section>
		</>
	);
}
