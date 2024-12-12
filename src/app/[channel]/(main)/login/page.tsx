import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { LoginForm } from "@/ui/components/LoginForm";

export default function LoginPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto p-4">
				<LoginForm />
			</section>
		</Suspense>
	);
}
