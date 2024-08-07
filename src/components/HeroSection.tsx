import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

export default function HeroSection() {
  return (
    <HeroHighlight containerClassName="w-full bg-[url('/hero-bg.jpg')] bg-cover bg-center min-h-screen flex items-center">
      <div className="container px-6 md:px-12 flex flex-col md:flex-row items-center justify-center text-center">
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
            <Button size="lg">Contact Us</Button>
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
