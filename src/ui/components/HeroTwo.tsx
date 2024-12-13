export const HeroTwo = () => {
    return (
        <>
        <div className="relative h-[calc(100vh-64px)] w-full"></div>
        <div className="absolute top-0 flex h-[100dvh] w-full flex-col bg-primary md:flex-row">
            <div className="flex h-full w-full flex-col md:h-full md:w-[50%] md:flex-row">
                <div className="relative h-full w-full">
                        <img
                            src="/heroTwo.webp"
                            fetchPriority="high"
                            alt="Hero Image"
                            className="absolute w-full h-full object-cover"
                        />
                      <div className="flex h-full w-full pl-4 pr-4 pt-16 md:w-[50vw] md:flex-col md:pb-16 md:pr-0">
                    <div className="relative z-0 h-full w-full border-l-[2px] border-r-[2px] border-t-[2px] border-white md:border-b-[2px] md:border-r-0"></div>
                </div>
            </div>
        </div>
        <div className="w-full h-full flex pr-4 pb-16 pl-4 bg-pink-700 md:w-[50vw] md:flex-col md:pt-16 md:pl-0">
            <div className="h-full w-full border-b-[2px] border-l-[2px] border-r-[2px] border-white md:border-l-0 md:border-t-[2px]">
                <div className="flex h-full w-full flex-col justify-center">
                    <div className="flex flex-row">
                                <h1 className="w-full px-12 font-sans text-3xl font-extralight uppercase leading-snug text-neutral-50">
                                    Life&apos;s too short to wear boring
                                </h1>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="w-full px-12 font-titlefont text-4xl font-black uppercase leading-snug text-neutral-50">
                                    Jewelry
                                </h1>
                                </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};