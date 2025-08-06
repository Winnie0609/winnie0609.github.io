'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import { useLanguage } from './LanguageProvider';

const NavigationBar = () => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const pathname = usePathname();
  const tab = pathname.split('/')[1];
  // TODO: use zh first
  // const { language } = useLanguage();
  const language = 'zh';

  // Define navigation items
  const navigationItems = [
    {
      label: language === 'zh' ? '關於我' : 'About Me',
      href: '/about',
    },
    {
      label: language === 'zh' ? '文章' : 'Writings',
      href: '/writings',
    },
    {
      label: language === 'zh' ? '專案' : 'Projects',
      href: '/projects',
    },
    {
      label: language === 'zh' ? '週記' : 'Weeknotes',
      href: '/weeknotes',
    },
  ];

  useEffect(() => {
    setToggleOpen(false);
  }, [pathname]);

  return (
    <div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex gap-4 items-center">
          {navigationItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={`hidden md:block transition-colors duration-300 ease-in-out px-2 pt-1 text-content-tertiary hover:text-content-secondary ${
                tab === item.href.split('/')[1]
                  ? 'text-primary border-b-[1.5px] border-primary'
                  : 'border-b-[1.5px] border-transparent'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mb-6">
        <div className="md:hidden flex gap-2 items-center justify-between">
          <Logo />
          <div className="flex gap-2 items-center">
            <ModeToggle />
            <div
              className="cursor-pointer"
              onClick={() => setToggleOpen(!isToggleOpen)}
            >
              {isToggleOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          {isToggleOpen && (
            <div className="flex flex-col gap-4 mt-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full text-3xl text-center hover:text-content-primary transition-colors duration-300 ease-in-out text-content-tertiary hover:text-content-primary ${
                    tab === item.href.split('/')[1]
                      ? 'text-content-primary'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
