import Image from 'next/image';

export default function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src="/placeholder.svg"
                width={64}
                height={64}
                alt="Icon"
                className="mb-4"
                style={{ aspectRatio: '64/64', objectFit: 'cover' }}
              />
              <h3 className="text-lg font-bold mb-2">Service {index + 1}</h3>
              <p className="text-muted-foreground">Description of Service {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
