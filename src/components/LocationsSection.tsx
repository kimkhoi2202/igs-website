"use client";
import dynamic from 'next/dynamic';
import { globeConfig, sampleArcs } from '@/components/ui/globeConfig';

const GlobeDemo = dynamic(() => import('@/components/ui/globe').then((m) => m.GlobeDemo), { ssr: false });

export default function LocationsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] flex items-center justify-center">
            <GlobeDemo globeConfig={globeConfig} data={sampleArcs} />
          </div>
          <div className="flex items-center justify-center">
            <div>
              <span className="text-red-500 text-sm">REPAIR SERVICE CENTER LOCATIONS</span>
              <h2 className="text-3xl font-bold tracking-tighter">Repair Service Center Locations</h2>
              <ul className="list-disc pl-5 mt-4 text-muted-foreground md:text-xl">
                <li>
                  <a href="#" className="text-left">
                    Houston Kempwood Facility (US)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-left">
                    Cincinnati Facility (US)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-left">
                    Taoyuan City New Facility (Taiwan)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
