import clsx from "clsx";
import * as Checkout from "@/lib/checkout";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const CartNavItem = async ({ channel }: { channel: string }) => {
	const checkoutId = Checkout.getIdFromCookies(channel);
	const checkout = checkoutId ? await Checkout.find(checkoutId) : null;

	const lineCount = checkout ? checkout.lines.reduce((result, line) => result + line.quantity, 0) : 0;

	return (
		<LinkWithChannel href="/cart" className="relative flex items-center" data-testid="CartNavItem">
    <button
      className={clsx(
        "relative flex h-12 w-12 md:h-16 md:w-16 flex-col items-center justify-center self-end self-center hover:bg-primary-foreground/20 transition duration-150 ease-in-out",
      )}
      aria-expanded={false}
      aria-label="Open cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.58685 4.52119C8.13473 5.30848 7.89148 6.23359 7.79663 7.01978H13.0613L13.85 4.0212L14.305 4.08248C14.2756 4.03868 14.2445 3.9947 14.2115 3.95079C13.7789 3.37407 12.9938 2.75077 11.4986 2.75C10.0827 2.74928 9.17663 3.4942 8.58685 4.52119ZM16.0878 4.32262C16.0826 4.30755 16.0771 4.29224 16.0715 4.27672C15.9513 3.94392 15.7476 3.49878 15.4114 3.05063C14.7191 2.12776 13.5041 1.25103 11.4994 1.25C9.41528 1.24893 8.07131 2.40686 7.28609 3.77419C6.68191 4.82627 6.38627 6.02872 6.2878 7.01963L3.38724 7.01902L1.125 21.7501H22.9175L20.832 11.5343L22.0124 10.7042L18.1861 4.60523L16.0878 4.32262ZM14.9635 5.68472L14.314 8.15421L16.9825 12.4077L19.9855 10.2958L17.2891 5.99796L14.9635 5.68472ZM12.7726 8.51978L4.67443 8.51929L2.87294 20.2501H21.0804L19.4933 12.4758L16.5522 14.5442L12.7726 8.51978Z"
          fill="hsl(var(--primary-foreground))"
        ></path>
      </svg>
      {lineCount > 0 ? (
        <div
          className={clsx(
            "absolute bottom-0 right-0 mb-2 mr-2 md:mb-4 md:mr-4 flex h-4 flex-col items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground",
            lineCount > 9 ? "w-[3ch]" : "w-[2ch]",
          )}
        >
          {lineCount} <span className="sr-only">item{lineCount > 1 ? "s" : ""} in cart, view bag</span>
        </div>
      ) : (
        <span className="sr-only">0 items in cart</span>
      )}
    </button>
    </LinkWithChannel>
  );
};