import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">

			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
{/* 			BACKGROUND AND BORDER PRODUCT CARDS
 */}				<div className="">

				{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={640}
							
							priority={priority}
						/>
					)}

					<div className="flex justify-between">
						<div>
							<h3 className="mt-1 text-base font-titlefont uppercase font-bold text-primary">{product.name}</h3>
							<p className="text-sm text-primary" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="mt-1 text-base font-bold font-titlefont text-primary" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
					</div>

			</LinkWithChannel>

		</li>

	);
}
