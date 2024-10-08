"use client";

import { useRef, useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/components/context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage } = useLanguage(); // Use language context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navigation, setNavigation] = useState<{ name: string; href: string; current: boolean }[]>([]);
  const [textData, setTextData] = useState<any>({}); // State to hold JSON data

  const languageButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageButtonRef.current && !languageButtonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch JSON data when component mounts
    fetch('/Text/Navbar-text.json')
      .then(response => response.json())
      .then(data => {
        setTextData(data); // Store the fetched data
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error); // Handle fetch error
      });
  }, []);

  useEffect(() => {
    if (textData && textData[language]) {
      const navItems = [
        { name: textData[language].home || 'Home', href: '#home', current: false },
        { name: textData[language].solutions || 'Solutions', href: '#solutions', current: false },
        { name: textData[language].expertise || 'Expertise', href: '#expertise', current: false },
        { name: textData[language].services || 'Services', href: '#services', current: false },
        { name: textData[language].joinUs || 'Join Us', href: '#joinus', current: false },
      ];
      setNavigation(navItems);
    }
  }, [language, textData]);

  return (
    <Disclosure as="nav" className="bg-red-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image src="/favicon.png" alt="Favicon" width={32} height={32} className="h-8 w-auto" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-2 sm:ml-6 sm:static sm:inset-auto sm:pr-0">
                <DropdownMenu open={isDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="language"
                      size="icon"
                      className="h-10 w-28"
                      ref={languageButtonRef}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {textData[language]?.language || 'Language'} {/* Display current language */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onMouseDown={() => { setLanguage('en'); setIsDropdownOpen(false); }}>English</DropdownMenuItem>
                    <DropdownMenuItem onMouseDown={() => { setLanguage('vi'); setIsDropdownOpen(false); }}>Tiếng Việt</DropdownMenuItem>
                    <DropdownMenuItem onMouseDown={() => { setLanguage('es'); setIsDropdownOpen(false); }}>Español</DropdownMenuItem>
                    <DropdownMenuItem onMouseDown={() => { setLanguage('zh'); setIsDropdownOpen(false); }}>中文</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
