import Image from 'next/image';

export default function LocationsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-red-500 text-sm">REPAIR SERVICE CENTER LOCATIONS</span>
            <h2 className="text-3xl font-bold tracking-tighter">Repair Service Center Locations</h2>
            <ul className="list-disc pl-5 mt-4 text-muted-foreground md:text-xl">
              <li>Houston Kempwood Facility (US)</li>
              <li>Cincinnati Facility (US)</li>
              <li>Taoyuan City New Facility 2/2021 (Taiwan)</li>
            </ul>
          </div>
          <div>
            <Image
              src="/placeholder.svg"
              width={800}
              height={600}
              alt="Map showing facility locations"
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
