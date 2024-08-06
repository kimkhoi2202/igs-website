import Image from 'next/image';

export default function DifferentiatorSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 w-full">Differentiator</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-muted-foreground">
              IGS has over 15 years of experience streamlining the supply chain of global tech leaders like Apple
              and Dell along with various OEM/ODMs who contribute to today&#39;s advancement in the tech industry, i.e.
              smart devices, medical equipment, mobile-energy, and power sources.
            </p>
            <p className="text-muted-foreground">
              IGS customizes our solution to your specific business size and needs. We assemble SMART devices and
              complex equipment on demand or in bulk assembles, completing all orders within ISO certified located
              in Texas and Ohio.
            </p>
            <p className="text-muted-foreground font-bold">IGS Quality Policy:</p>
            <p className="text-muted-foreground">
              Quality is the foundation of IGS, and its employees are committed to meet the quality requirements
              expected by our customers to drive customer satisfaction. We strive to provide excellent quality and
              service in the most efficient and consistent manner through a process of continual improvement.
            </p>
            <p className="text-muted-foreground">
              All employees are required to be engaged in IGS quality culture to understand their responsibility in
              achieving its quality objectives.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center gap-8 mt-12 md:mt-0">
          <Image
            src="/placeholder.svg"
            width={400}
            height={300}
            alt=""
            className="object-cover rounded-lg"
            style={{ aspectRatio: '400/300', objectFit: 'cover' }}
          />
          <Image
            src="/placeholder.svg"
            width={400}
            height={300}
            alt=""
            className="object-cover rounded-lg"
            style={{ aspectRatio: '400/300', objectFit: 'cover' }}
          />
        </div>
      </div>
      <Image
        src="/placeholder.svg"
        width={1200}
        height={600}
        alt=""
        className="w-full h-auto rounded-lg object-cover mt-12"
        style={{ aspectRatio: '1200/600', objectFit: 'cover' }}
      />
    </section>
  );
}
