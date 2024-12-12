import { Suspense } from "react";
import { NavWrapper } from "./components/SheetMenu/NavWrapper";

export const Nav = ({ channel }: { channel: string }) => {
	return (
<>
			<div className="flex items-center mr-4">

				{/* PLACEHOLDER */}
				<Suspense fallback={<div className="w-8" />}>
					<div className="w-12 h-12 md:w-16 md:h-16" />
				</Suspense>


			
<NavWrapper channel={channel} />
			</div>
			</>
	);
};
