import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";
import { NavLeft } from "./nav/NavLeft";
import { HeaderBackground } from "./HeaderBackground";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky h-16 top-0 z-20 ">
			<HeaderBackground />

				<nav className="flex w-full h-16 items-center justify-between">
					<NavLeft channel={channel}/>
					<Logo />
					<Nav channel={channel} />
				</nav>

		</header>
	);
}
