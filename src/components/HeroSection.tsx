import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full bg-[url('/hero-bg.jpg')] bg-cover bg-center py-24 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6 flex flex-col-reverse md:flex-row items-center justify-between text-left">
        <div>
          <span className="text-red-500 text-sm">INTERNASH GLOBAL SERVICES</span>
          <h1 className="mt-4 text-black dark:text-white text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Engineering, Repair, &amp; Logistics Solutions
          </h1>
          <p className="mt-3 text-black dark:text-white text-lg md:text-xl">
            Engineering, Repair, &amp; Logistics solutions create value and a competitive edge for our clients
          </p>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <Button size="lg">Contact Us</Button>
          </div>
        </div>
        <Image
          src="/placeholder.svg"
          width={550}
          height={310}
          alt="Hero"
          className="mt-8 md:mt-0 md:ml-8 rounded-lg object-cover"
          style={{ aspectRatio: '550/310', objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
