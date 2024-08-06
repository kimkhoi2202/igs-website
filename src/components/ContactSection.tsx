import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">Please get in touch with us</h2>
          <p className="text-muted-foreground md:text-xl">
            We&#39;re always excited to collaborate on new ideas and projects. If you&#39;re interested in a teaming
            opportunity or just want to touch base, we&#39;d love to hear from you!
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-center">Contact Us</h2>
          <p className="text-muted-foreground md:text-xl text-center">
            Fill out the form below to learn more about our supply chain solutions.
          </p>
          <form className="mt-8 grid grid-cols-1 gap-6">
            <Input type="text" placeholder="Name*" required />
            <Input type="email" placeholder="Email*" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" />
            <Input type="tel" placeholder="Phone*" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
            <Textarea placeholder="Message" />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
