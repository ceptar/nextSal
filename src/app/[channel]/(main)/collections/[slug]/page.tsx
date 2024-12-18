"use client";
import * as React from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { GET_COLLECTION_ID } from "@/lib/queries";
import { type ProductListItemFragment } from "@/gql/graphql";
import { PageTitle } from "@/ui/components/layout/PagesTitle";
import { ProductList } from "@/ui/components/ProductList";
import { FilterSheet } from "@/ui/components/FilterSheet";
import { saleorApiUrl } from "@/app/config";

interface CollectionNode {
	id: string;
	name: string;
	slug: string;
	products: {
		edges: {
			node: ProductListItemFragment;
		}[];
	};
}

interface CollectionData {
	collections: {
		edges: {
			node: CollectionNode;
		}[];
	};
}

export default function Page() {
	const [data, setData] = React.useState<CollectionNode | null>(null);
	const [filters, setFilters] = React.useState<{ [key: string]: string[] }>({});
	const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
	const params = useParams<{ slug: string }>();
	const [debouncedFilters] = useDebounce(filters, 500);

	const fetchData = async (variables: { [key: string]: any }) => {
		if (!saleorApiUrl) {
			throw new Error("saleorApiUrl is not defined");
		}
		const response = await fetch(saleorApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: GET_COLLECTION_ID,
				variables: variables,
			}),
			cache: "no-store",
		});
		const result = (await response.json()) as { data: CollectionData };
		const collectionNode = result.data.collections.edges[0]?.node || null;
		setData(collectionNode);
	};

	React.useEffect(() => {
		const activeFilters = Object.entries(debouncedFilters)
			.filter(([_, values]) => values.length > 0)
			.map(([key, values]) => ({
				slug: key,
				values: values,
			}));

		const loadData = async () => {
			try {
				await fetchData({
					channel: "default-channel",
					filter: {
						slugs: params.slug,
					},
					first: 1,
					productFilter: {
						attributes: activeFilters.length > 0 ? activeFilters : undefined,
					},
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Explicitly mark the promise with `void` to satisfy TypeScript
		void loadData();
	}, [params.slug, debouncedFilters]);

	const handleFilterChange = (attributeSlug: string, value: string, isChecked: boolean) => {
		setFilters((prevFilters) => {
			const currentValues = prevFilters[attributeSlug] || [];
			let newValues;
			if (isChecked) {
				newValues = [...currentValues, value];
			} else {
				newValues = currentValues.filter((v) => v !== value);
			}

			if (newValues.length === 0) {
				const { [attributeSlug]: _, ...rest } = prevFilters;
				return rest;
			}

			return { ...prevFilters, [attributeSlug]: newValues };
		});
	};

	const allAttributes = React.useMemo(() => {
		if (!data) return [];

		return data.products.edges.flatMap((edge) =>
			edge.node.attributes.map((attribute) => ({
				attribute: {
					id: attribute.attribute.id,
					name: attribute.attribute.name || "",
					slug: attribute.attribute.slug || "",
				},
				values: attribute.values.map((value) => ({
					id: value.id,
					name: value.name || "",
					slug: value.slug || "",
				})),
			})),
		);
	}, [data]);

	return (
		<div className="relative mb-[5rem] h-full w-full p-4">
			
			<PageTitle title={data?.name ?? null} />

			<div className="flex items-center z-[21] h-16 fixed top-0 left-[calc(100%-7rem)] md:left-[calc(100%-9rem)] flex-col justify-center ">
				<button
					onClick={() => setIsFilterSheetOpen(true)}
					className={clsx(
						"flex h-12 w-12 items-center justify-center transition duration-150 ease-in-out hover:bg-primary-foreground/20 md:h-16 md:w-16",
					)}
				>
					<svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M4.9239 7.38714H3V9.25792H4.9239C5.32796 10.6375 6.6024 11.6451 8.11286 11.6451C9.62332 11.6451 10.8978 10.6375 11.3018 9.25792H20.3871V7.38714H11.3018C10.8978 6.0076 9.62332 5 8.11286 5C6.6024 5 5.32796 6.0076 4.9239 7.38714ZM15.2743 13.3549C16.7847 13.3549 18.0592 14.3625 18.4632 15.7421H20.3871V17.6129H18.4632C18.0592 18.9924 16.7847 20 15.2743 20C13.7638 20 12.4894 18.9924 12.0853 17.6129H3V15.7421H12.0853C12.4894 14.3625 13.7638 13.3549 15.2743 13.3549ZM8.11286 6.87072C8.33789 6.87072 8.55004 6.92171 8.73926 7.01239C8.95023 7.11343 9.13327 7.26422 9.27306 7.44969C9.36148 7.56699 9.43235 7.69791 9.48209 7.83857C9.53546 7.98949 9.56464 8.15221 9.56464 8.3225C9.56464 8.49279 9.53546 8.65551 9.48209 8.80643C9.28262 9.37078 8.74445 9.77428 8.11286 9.77428C7.89701 9.77428 7.69305 9.72735 7.50976 9.64355C7.35647 9.57344 7.21724 9.4772 7.09788 9.36047C6.82799 9.09651 6.66108 8.72931 6.66108 8.3225C6.66108 7.52075 7.3111 6.87072 8.11286 6.87072ZM13.9051 17.1614C13.935 17.2462 13.9726 17.3273 14.0171 17.4041C14.1205 17.5824 14.2608 17.737 14.4276 17.8569C14.6659 18.0284 14.9578 18.1293 15.2743 18.1293C16.0761 18.1293 16.7261 17.4793 16.7261 16.6775C16.7261 16.3501 16.6181 16.0489 16.4357 15.8062C16.3911 15.747 16.3422 15.6913 16.2893 15.6395C16.0272 15.3832 15.6695 15.2257 15.2743 15.2257C14.6427 15.2257 14.1045 15.6292 13.9051 16.1936C13.8517 16.3445 13.8226 16.5072 13.8226 16.6775C13.8226 16.8478 13.8517 17.0105 13.9051 17.1614Z"
							fill="hsl(var(--primary-foreground))"
						/>
					</svg>
				</button>
			</div>
			<FilterSheet
				isOpen={isFilterSheetOpen}
				onClose={() => setIsFilterSheetOpen(false)}
				attributes={allAttributes}
				selectedFilters={filters}
				onFilterChange={handleFilterChange}
			/>

			{data?.products && <ProductList products={data.products.edges.map((edge) => edge.node)} />}
		</div>
	);
}
