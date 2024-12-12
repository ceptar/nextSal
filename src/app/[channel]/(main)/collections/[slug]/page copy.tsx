/* "use client";
import * as React from 'react';
import { GET_COLLECTION_ID } from '@/lib/queries'; // Adjust path as needed
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductList } from "@/ui/components/ProductList";

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

  const params = useParams<{ slug: string }>()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log("params", params)

  const fetchData = async (variables: { [key: string]: any }) => {
    const response = await fetch('https://discobabes.store/graphql/', {
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
    const result = await response.json() as { data: CollectionData };
    const collectionNode = result.data.collections.edges[0]?.node || null;
    setData(collectionNode);
  };

  React.useEffect(() => {
    fetchData({
      channel: "default-channel",
      filter: {
        slugs: params.slug
      },
      first: 1,
    });
  }, []);

  console.log("data", data);

  return (
    <div className="relative mb-[5rem] h-full w-full p-4">
     <h1 className="pb-8 pt-4 text-3xl uppercase font-light font-titlefont tracking-[0.05em] text-center">{data?.name}</h1> 			

      {data?.products && (
        
        <ProductList products={data.products.edges.map(edge => edge.node)} />
      )}
    </div>
  );
} */