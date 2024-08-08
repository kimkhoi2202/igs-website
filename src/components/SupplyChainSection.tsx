import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function SupplyChainSection() {
  return (
    <AuroraBackground className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-white">Supply Chain Solution</h2>
        <Image
          src="/supply-chain.png"
          width={1200}
          height={600}
          alt="Supply Chain Solution"
          className="w-full h-auto rounded-lg mt-8"
          style={{ aspectRatio: '1200/600', objectFit: 'contain' }}
        />
      </div>
    </AuroraBackground>
  );
}
