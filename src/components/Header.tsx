import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';

function HomeIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="bg-background px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link href="#" className="flex items-center" prefetch={false}>
        <HomeIcon className="h-6 w-6" />
        <span className="sr-only">Acme Supply Chain</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {['Home', 'Solutions', 'Expertise', 'Services', 'Contact'].map((item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink href="#" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                {item}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 items-center">
        <ModeToggle /> {/* Add the ModeToggle component here */}
        <Button variant="outline" size="sm">
          Login
        </Button>
        <Button size="sm">Contact Us</Button>
      </div>
    </header>
  );
}
