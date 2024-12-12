/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
		unoptimized: true,
	},
	experimental: {
		typedRoutes: false,
		serverActions: {
			allowedOrigins: ["localhost:3001"],
		}

	},
	
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
			  ? "export"
			  : undefined,
};

export default config;
