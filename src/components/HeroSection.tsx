import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

export default function HeroSection() {
  return (
    <HeroHighlight containerClassName="w-full bg-[url('/hero-bg.jpg')] bg-cover bg-center py-24 md:py-32 lg:py-40">
      <div className="container px-6 md:px-12 flex flex-col md:flex-row items-center justify-center text-center">
        <div className="w-full md:w-3/4 lg:w-2/3 mb-24 md:mb-0">
          <span className="text-red-500 text-base">INTERNASH GLOBAL SERVICES</span>
          <h1 className="mt-4 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Engineering, Repair, and Logistics Solutions
          </h1>
          <p className="mt-3 text-black dark:text-white text-lg md:text-xl">
            <Highlight>
              Engineering, Repair, & Logistics solutions
            </Highlight>create value and a competitive edge for our clients
          </p>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-center">
            <Button size="lg">Contact Us</Button>
          </div>
        </div>
        <div className="mt-24 md:mt-0 md:ml-24">
          <Image
            src="/placeholder.svg"
            width={550}
            height={310}
            alt="Hero"
            className="rounded-lg object-cover"
            style={{ aspectRatio: '550/310', objectFit: 'cover' }}
          />
        </div>
      </div>
    </HeroHighlight>
  );
}
