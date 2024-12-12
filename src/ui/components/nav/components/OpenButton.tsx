import clsx from "clsx";
import { type HTMLAttributes } from "react";

type Props = {
	onClick: () => void;
} & Pick<HTMLAttributes<HTMLButtonElement>, "aria-controls">;

export const OpenButton = (props: Props) => {
	return (
		<button
			className={clsx(
				"relative flex w-12 h-12 md:w-16 md:h-16 flex-col items-center justify-center self-end self-center hover:bg-primary-foreground/20 transition duration-150 ease-in-out",
			)}
			aria-controls={props["aria-controls"]}
			aria-expanded={false}
			aria-label="Open menu"
			onClick={props.onClick}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
className="w-7 h-7 md:w-8 md:h-8"
				viewBox="0 0 256 256"
			>
				<path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
					fill="hsl(var(--primary-foreground))"
				></path>
			</svg>
		</button>
	);
};
