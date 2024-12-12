// 'use client'

// import Image from 'next/image'
// import { useState } from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import { Card, CardContent } from '@/ui/card'
// import { Button } from '@/ui/button'

// interface ProductImage {
//   id: string
//   type: string
//   url: string
//   alt: string
// }

// interface ProductDetails {
//   id: string
//   name: string
//   slug: string
//   description: string
//   seoTitle: string
//   seoDescription: string
//   media: ProductImage[]
//   category: {
//     id: string
//     name: string
//   }
//   pricing: {
//     priceRange: {
//       start: {
//         gross: {
//           amount: number
//           currency: string
//         }
//       }
//     }
//   }
// }

// export default function ProductDetailPage({ product }: { product: ProductDetails }) {
//   const [emblaRef] = useEmblaCarousel()
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <div className="grid md:grid-cols-2 gap-8">
//         <Card>
//           <CardContent className="p-0">
//             <div className="embla overflow-hidden" ref={emblaRef}>
//               <div className="embla__container flex">
//                 {product.media.map((image, index) => (
//                   <div key={image.id} className="embla__slide flex-[0_0_100%]">
//                     <Image
//                       src={image.url}
//                       alt={image.alt || product.name}
//                       width={800}
//                       height={800}
//                       className="w-full h-auto object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center mt-4">
//               {product.media.map((image, index) => (
//                 <Button
//                   key={image.id}
//                   variant="ghost"
//                   size="sm"
//                   className={`mx-1 ${index === currentImageIndex ? 'bg-primary' : ''}`}
//                   onClick={() => {
//                     setCurrentImageIndex(index)
//                     emblaRef.current?.scrollTo(index)
//                   }}
//                 >
//                   {index + 1}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//         <div>
//           <p className="text-2xl font-bold mb-4">
//             {product.pricing.priceRange.start.gross.amount} {product.pricing.priceRange.start.gross.currency}
//           </p>
//           <p className="mb-4">{product.description}</p>
//           <p className="mb-2">
//             <strong>Category:</strong> {product.category.name}
//           </p>
//           <Button className="w-full">Add to Cart</Button>
//         </div>
//       </div>
//     </div>
//   )
// }
