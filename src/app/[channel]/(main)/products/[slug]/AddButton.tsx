"use client";

import { useFormStatus } from "react-dom";

export function AddButton({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
	const { pending } = useFormStatus();
	const isButtonDisabled = disabled || pending;

	return (
		<button
			type="button"
			aria-disabled={isButtonDisabled}
			aria-busy={pending}
			onClick={(e) => {
				if (!isButtonDisabled) {
					onClick();
				} else {
					e.preventDefault();
				}
			}}
			className="h-12 items-center bg-neutral-900 px-6 py-3 text-sm font-normal uppercase tracking-[0.1em] leading-4 text-white shadow hover:bg-neutral-800/70 disabled:cursor-not-allowed disabled:opacity-70 hover:disabled:bg-neutral-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-neutral-700"
		>
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
		</button>
	);
}
