import Image from 'next/image';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

export default function HeroSection() {
  return (
    <HeroHighlight containerClassName="w-full h-screen bg-[url('/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="container px-6 md:px-12 flex flex-col md:flex-row items-center justify-center text-center h-full">
        <div className="w-full md:w-3/4 lg:w-2/3 mb-24 md:mb-0">
          <span className="text-red-500 text-base font-bold">INTERNASH GLOBAL SERVICES</span>
            <h1 className="mt-4 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <Highlight>Engineering, Repair,</Highlight>
            </h1>
            <h1 className="mt-4 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <Highlight>and Logistics Solutions</Highlight>
            </h1>
          <div className="mt-4 flex flex-col items-center text-lg md:text-xl text-black dark:text-white">
            <span className="mt-2">
              Engineering, Repair, & Logistics solutions create value and a competitive edge for our clients
            </span>
          </div>
          <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-center">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Contact Us
              </span>
            </button>
          </div>
        </div>
        <div className="mt-24 md:mt-0 md:ml-24">
          <Image
            src="/placeholder.svg"
            width={550}
            height={500}
            alt="Hero"
            className="rounded-lg object-cover"
            style={{ aspectRatio: '700/500', objectFit: 'cover' }}
          />
        </div>
      </div>
    </HeroHighlight>
  );
}
