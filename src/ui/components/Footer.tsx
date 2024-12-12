import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex w-full flex-col bg-primary/5 justify-evenly py-0 md:flex-row">
			<div className="flex min-h-full w-full flex-col justify-evenly py-0 md:flex-row">
				<div className="flex w-full flex-grow flex-col justify-evenly p-4 md:flex-row">
					<div className="-mx-2 flex min-h-full flex-grow flex-col justify-between py-10 sm:flex-row">
						<svg className="h-[75px] w-[108px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 150">
							<path
								d="m 30.933,86.537 c 3.951,0 7.182,3.236 7.182,7.159 0,3.922 -3.231,7.044 -7.182,7.044 z m -1.314,-6.36 h -5.445 v 67.643 c 2.214,0 4.446,-0.36 6.759,-0.91 11.826,-3.05 20.628,-13.91 20.628,-26.82 0,-7.96 -3.438,-15.12 -8.802,-20.148 1.017,-1.828 1.62,-4.036 1.62,-6.245 0,-7.464 -5.661,-13.52 -14.76,-13.52 z m 8.388,24.603 c 4.446,4.53 6.777,9.86 6.777,15.5 0,9.18 -5.859,16.95 -13.851,19.77 V 107.1 c 2.43,-0.38 4.554,-0.91 7.074,-2.32 z m 47.97,42.61 v -13.4 h 3.33 v -6.36 h -3.33 V 95.906 c 0,-5.941 -0.612,-8.378 -2.52,-11.197 -2.448,-3.427 -6.264,-5.332 -11.034,-5.332 -5.238,0 -9.666,2.628 -11.907,7.046 -1.116,2.322 -1.521,4.531 -1.521,9.978 v 31.229 h -3.339 v 6.36 h 3.339 v 13.4 h 6.777 v -13.4 h 13.446 v 13.4 z M 79.218,127.63 H 65.772 V 93.201 c 0,-4.57 2.817,-7.578 7.065,-7.578 3.933,0 6.381,2.932 6.381,7.464 z M 101.91,86.537 c 3.93,0 7.18,3.237 7.18,7.16 0,3.922 -3.25,7.043 -7.18,7.043 z m -1.31,-6.36 h -5.461 v 67.643 c 2.223,0 4.437,-0.36 6.771,-0.91 11.83,-3.05 20.62,-13.91 20.62,-26.82 0,-7.96 -3.43,-15.12 -8.79,-20.148 1,-1.828 1.6,-4.036 1.6,-6.245 0,-7.464 -5.64,-13.52 -14.74,-13.52 z m 8.36,24.603 c 4.48,4.53 6.81,9.86 6.81,15.5 0,9.18 -5.88,16.95 -13.86,19.77 V 107.1 c 2.44,-0.38 4.54,-0.91 7.05,-2.32 z m 41.22,42.61 v -6.35 h -13.43 v -41.02 h 16.88 v -6.323 h -16.88 v -7.16 h 13.43 v -6.36 h -20.2 v 13.52 h -3.37 v 6.323 h 3.37 v 47.37 z m 14.53,-33.55 c 2.58,2.51 7.06,5.94 7.06,12.61 0,8.04 -6.57,14.59 -14.75,14.59 v 6.78 c 11.92,0 21.5,-9.6 21.5,-21.37 0,-3.65 -0.9,-7.08 -1.9,-8.87 -2.02,-4.04 -4.48,-6.37 -7,-8.46 -4.35,-3.66 -5.84,-6.55 -5.84,-10.396 0,-6.741 5.47,-12.187 12.22,-12.187 v -6.741 c -10.5,0 -18.98,8.454 -18.98,18.928 0,4.726 1.98,9.676 7.69,15.116 z"
								fill="hsl(var(--primary))"
								id="path1"
							></path>
							<path
								d="m 31.134,13.514 c 8.488,4.851 14.248,13.914 14.248,24.3 0,10.359 -5.86,19.543 -14.248,24.303 z M 24.361,3.7762 v 0 67.9398 c 2.426,-0.532 4.65,-1.218 6.773,-2.133 12.429,-5.333 21.019,-17.63 21.019,-31.841 0,-14.4 -8.689,-26.694 -21.019,-31.9498 -2.123,-0.801 -4.347,-1.485 -6.773,-2.097 z M 66.06,71.371 V 4.1542 H 59.289 V 71.371 Z M 80.87,37.814 c 2.628,2.511 7.075,5.94 7.075,12.618 0,8.029 -6.561,14.582 -14.75,14.582 v 6.78 c 11.926,0 21.522,-9.599 21.522,-21.362 0,-3.663 -0.906,-7.092 -1.92,-8.883 -2.019,-4.041 -4.447,-6.354 -6.966,-8.451 -4.352,-3.654 -5.866,-6.552 -5.866,-10.404 0,-6.741 5.456,-12.186 12.231,-12.186 V 3.7762 c -10.508,0 -19.001,8.4508 -19.001,18.9178 0,4.734 2.023,9.684 7.675,15.12 z M 126.61,10.625 V 3.7762 c -2.43,0.603 -4.64,1.296 -6.67,2.088 C 107.61,11.12 98.821,23.423 98.821,37.814 c 0,14.211 8.689,26.513 21.119,31.842 2.03,0.919 4.24,1.601 6.67,2.138 v -6.971 c -2.73,-0.8 -4.54,-1.828 -6.67,-2.706 -8.49,-4.76 -14.35,-13.944 -14.35,-24.303 0,-10.386 5.77,-19.449 14.35,-24.3 2.13,-1.287 4.55,-2.016 6.67,-2.889 z m 32.61,-7.2718 c -19.11,0 -34.56,15.4168 -34.56,34.4608 0,18.933 15.45,34.357 34.56,34.357 19.1,0 34.55,-15.424 34.55,-34.357 0,-19.044 -15.45,-34.4608 -34.55,-34.4608 z m 0,6.7408 c 15.35,0 27.79,12.411 27.79,27.72 0,15.309 -12.44,27.618 -27.79,27.618 -15.37,0 -27.79,-12.309 -27.79,-27.618 0,-15.309 12.42,-27.72 27.79,-27.72 z"
								fill="hsl(var(--primary))"
								id="path1-8"
							></path>
						</svg>
					</div>
				</div>
				<div className="flex w-full flex-grow flex-col items-start justify-evenly md:flex-row">
				{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>
				<div className="flex w-full flex-grow flex-col items-start justify-evenly p-4 md:flex-row">
				{channels?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">Change currency:</span> <ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}
				</div>
			</div>
			<div className="flex flex-col justify-between p-1 pb-10 sm:flex-row">
					<p className="text-sm text-neutral-500">Copyright &copy; {currentYear} DiscoBabes</p>
					<p className="flex gap-1 text-sm text-neutral-500">SOCIAL</p>
				</div>
		</footer>

		/* 		<footer className="border-neutral-300 bg-rose-50">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-3 gap-8 py-16">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{channels?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">Change currency:</span> <ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}
				<div className="-mx-2 flex flex-col justify-between pt-10 sm:flex-row">
					<svg className="h-[75px] w-[108px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 150">
						<path
							d="m 30.933,86.537 c 3.951,0 7.182,3.236 7.182,7.159 0,3.922 -3.231,7.044 -7.182,7.044 z m -1.314,-6.36 h -5.445 v 67.643 c 2.214,0 4.446,-0.36 6.759,-0.91 11.826,-3.05 20.628,-13.91 20.628,-26.82 0,-7.96 -3.438,-15.12 -8.802,-20.148 1.017,-1.828 1.62,-4.036 1.62,-6.245 0,-7.464 -5.661,-13.52 -14.76,-13.52 z m 8.388,24.603 c 4.446,4.53 6.777,9.86 6.777,15.5 0,9.18 -5.859,16.95 -13.851,19.77 V 107.1 c 2.43,-0.38 4.554,-0.91 7.074,-2.32 z m 47.97,42.61 v -13.4 h 3.33 v -6.36 h -3.33 V 95.906 c 0,-5.941 -0.612,-8.378 -2.52,-11.197 -2.448,-3.427 -6.264,-5.332 -11.034,-5.332 -5.238,0 -9.666,2.628 -11.907,7.046 -1.116,2.322 -1.521,4.531 -1.521,9.978 v 31.229 h -3.339 v 6.36 h 3.339 v 13.4 h 6.777 v -13.4 h 13.446 v 13.4 z M 79.218,127.63 H 65.772 V 93.201 c 0,-4.57 2.817,-7.578 7.065,-7.578 3.933,0 6.381,2.932 6.381,7.464 z M 101.91,86.537 c 3.93,0 7.18,3.237 7.18,7.16 0,3.922 -3.25,7.043 -7.18,7.043 z m -1.31,-6.36 h -5.461 v 67.643 c 2.223,0 4.437,-0.36 6.771,-0.91 11.83,-3.05 20.62,-13.91 20.62,-26.82 0,-7.96 -3.43,-15.12 -8.79,-20.148 1,-1.828 1.6,-4.036 1.6,-6.245 0,-7.464 -5.64,-13.52 -14.74,-13.52 z m 8.36,24.603 c 4.48,4.53 6.81,9.86 6.81,15.5 0,9.18 -5.88,16.95 -13.86,19.77 V 107.1 c 2.44,-0.38 4.54,-0.91 7.05,-2.32 z m 41.22,42.61 v -6.35 h -13.43 v -41.02 h 16.88 v -6.323 h -16.88 v -7.16 h 13.43 v -6.36 h -20.2 v 13.52 h -3.37 v 6.323 h 3.37 v 47.37 z m 14.53,-33.55 c 2.58,2.51 7.06,5.94 7.06,12.61 0,8.04 -6.57,14.59 -14.75,14.59 v 6.78 c 11.92,0 21.5,-9.6 21.5,-21.37 0,-3.65 -0.9,-7.08 -1.9,-8.87 -2.02,-4.04 -4.48,-6.37 -7,-8.46 -4.35,-3.66 -5.84,-6.55 -5.84,-10.396 0,-6.741 5.47,-12.187 12.22,-12.187 v -6.741 c -10.5,0 -18.98,8.454 -18.98,18.928 0,4.726 1.98,9.676 7.69,15.116 z"
							fill="hsl(var(--primary))"
							id="path1"
						/>
						<path
							d="m 31.134,13.514 c 8.488,4.851 14.248,13.914 14.248,24.3 0,10.359 -5.86,19.543 -14.248,24.303 z M 24.361,3.7762 v 0 67.9398 c 2.426,-0.532 4.65,-1.218 6.773,-2.133 12.429,-5.333 21.019,-17.63 21.019,-31.841 0,-14.4 -8.689,-26.694 -21.019,-31.9498 -2.123,-0.801 -4.347,-1.485 -6.773,-2.097 z M 66.06,71.371 V 4.1542 H 59.289 V 71.371 Z M 80.87,37.814 c 2.628,2.511 7.075,5.94 7.075,12.618 0,8.029 -6.561,14.582 -14.75,14.582 v 6.78 c 11.926,0 21.522,-9.599 21.522,-21.362 0,-3.663 -0.906,-7.092 -1.92,-8.883 -2.019,-4.041 -4.447,-6.354 -6.966,-8.451 -4.352,-3.654 -5.866,-6.552 -5.866,-10.404 0,-6.741 5.456,-12.186 12.231,-12.186 V 3.7762 c -10.508,0 -19.001,8.4508 -19.001,18.9178 0,4.734 2.023,9.684 7.675,15.12 z M 126.61,10.625 V 3.7762 c -2.43,0.603 -4.64,1.296 -6.67,2.088 C 107.61,11.12 98.821,23.423 98.821,37.814 c 0,14.211 8.689,26.513 21.119,31.842 2.03,0.919 4.24,1.601 6.67,2.138 v -6.971 c -2.73,-0.8 -4.54,-1.828 -6.67,-2.706 -8.49,-4.76 -14.35,-13.944 -14.35,-24.303 0,-10.386 5.77,-19.449 14.35,-24.3 2.13,-1.287 4.55,-2.016 6.67,-2.889 z m 32.61,-7.2718 c -19.11,0 -34.56,15.4168 -34.56,34.4608 0,18.933 15.45,34.357 34.56,34.357 19.1,0 34.55,-15.424 34.55,-34.357 0,-19.044 -15.45,-34.4608 -34.55,-34.4608 z m 0,6.7408 c 15.35,0 27.79,12.411 27.79,27.72 0,15.309 -12.44,27.618 -27.79,27.618 -15.37,0 -27.79,-12.309 -27.79,-27.618 0,-15.309 12.42,-27.72 27.79,-27.72 z"
							fill="hsl(var(--primary))"
							id="path1-8"
						/>
					</svg>
				</div>
				<div className="flex flex-col justify-between p-1 pb-10 sm:flex-row">
					<p className="text-sm text-neutral-500">Copyright &copy; {currentYear} DiscoBabes</p>
					<p className="flex gap-1 text-sm text-neutral-500">SOCIAL</p>
				</div>
			</div>
		</footer> */
	);
}
