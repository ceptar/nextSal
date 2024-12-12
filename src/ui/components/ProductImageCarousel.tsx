"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductImage {
	id: string;
	url: string;
	alt: string;
}

interface ProductImageCarouselProps {
	images: ProductImage[];
}
/* eslint-disable */
export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [api, setApi] = React.useState<any>();

	const scrollTo = React.useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		api.on("select", () => {
			setCurrentIndex(api.selectedScrollSnap());
		});
	}, [api]);
	/* eslint-enable */
	if (images.length === 0) {
		return (
			<Card className="border-0">
				<CardContent className="flex aspect-square max-h-[80vh] items-center justify-center p-0">
					<div className="relative flex h-full w-full items-center justify-center bg-gray-200">
						<span className="text-gray-400">No image available</span>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="w-full">
			<Carousel
				setApi={setApi}
				opts={{
					loop: true,
				}}
				className="relative w-full"
			>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={image.id}>
							<Card className="border-0">
								<CardContent className="flex aspect-[4/6] items-center justify-center p-0">
									<div className="relative h-full w-full">
										<Image
											src={image.url}
											alt={image.alt}
											fill
											priority={index === 0}
											className="object-cover"
										/>
									</div>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				{images.length > 1 && (
					<>
						<CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
						<CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
					</>
				)}
			</Carousel>
			{images.length > 1 && (
				<div className="mt-4 flex justify-center gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => scrollTo(index)}
							className={cn(
								"h-2 w-2 rounded-full transition-colors",
								currentIndex === index ? "bg-primary" : "bg-gray-300",
							)}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
