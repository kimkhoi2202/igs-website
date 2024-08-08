import Image from 'next/image';

export default function SupplyChainSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-white">Supply Chain Solution</h2>
        <div className="w-full h-auto rounded-lg mt-8">
          <Image
            src="/supply-chain-light-mode.png"
            width={1200}
            height={600}
            alt="Supply Chain Solution"
            className="w-full h-auto rounded-lg mt-8 dark:hidden"
            style={{ aspectRatio: '1200/600', objectFit: 'contain' }}
          />
          <Image
            src="/supply-chain-dark-mode.png"
            width={1200}
            height={600}
            alt="Supply Chain Solution"
            className="w-full h-auto rounded-lg mt-8 hidden dark:block"
            style={{ aspectRatio: '1200/600', objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );
}
