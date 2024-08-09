import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function FacebookIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background pb-4 w-full"> {/* Changed to pb-4 for bottom padding only */}
      <div className="container flex flex-col items-center justify-between max-w-7xl mx-auto">
        <Separator className="my-4" />
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-full">
            <FacebookIcon className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="rounded-full">
            <LinkedinIcon className="w-5 h-5" />
          </Button>
        </div>
        <p className="mt-4 text-sm text-primary-foreground">Copyrights © 2021. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
