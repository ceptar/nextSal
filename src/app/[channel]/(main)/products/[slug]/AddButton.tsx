"use client";
import { useFormStatus } from "react-dom";
import { AnimatedButton } from "@/ui/animated-button";

export function AddButton({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
	const { pending } = useFormStatus();
	const isButtonDisabled = disabled || pending;

	return (
		<AnimatedButton 		 
		onClick={(e) => {
			if (!isButtonDisabled) {
				onClick();
			} else {
				e.preventDefault();
			}
		}} 
		className="flex flex-row h-full font-large justify-start border-[2px] border-primary px-4 py-2 text-lg shadow-none">
			{pending ? (
				<div className="inline-flex items-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Processing...</span>
				</div>
			) : (
				<span>Add to cart</span>
			)}
		</AnimatedButton>
	);
}
