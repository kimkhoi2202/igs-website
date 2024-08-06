import Image from 'next/image';

export default function SupplyChainSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter">Supply Chain Solution</h2>
        <Image
          src="/placeholder.svg"
          width={1200}
          height={600}
          alt="Supply Chain Solution"
          className="w-full h-auto rounded-lg object-cover mt-8"
          style={{ aspectRatio: '1200/600', objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
