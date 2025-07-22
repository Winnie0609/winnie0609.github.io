'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageProvider';
import { isValidLocale, type Locale } from '@/lib/i18n';

// check current language
function getCurrentLocale(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0] as Locale;
  }
  return null;
}

const NavigationBar = () => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  // try to get language context, if not exist, use default value
  let t = null;
  try {
    const language = useLanguage();
    t = language.t;
  } catch {
    // if not in language context, use default label
    t = null;
  }

  // generate navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        labelKey: 'about',
        href: currentLocale ? `/${currentLocale}/about` : '/about',
        label: t ? t.nav.about : 'About',
      },
      {
        labelKey: 'writings',
        href: '/writings',
        label: t ? t.nav.writings : 'Writings',
      },
      {
        labelKey: 'projects',
        href: currentLocale ? `/${currentLocale}/projects` : '/projects',
        label: t ? t.nav.projects : 'Projects',
      },
      {
        labelKey: 'weeknotes',
        href: '/weeknotes',
        label: t ? t.nav.weeknotes : 'Weeknotes',
      },
    ];
    return baseItems;
  };

  const navigationItems = getNavigationItems();

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
              key={item.labelKey}
              className={`hidden md:block text-foreground transition-colors duration-300 ease-in-out px-2 py-1 text-neutral-500 hover:text-primary ${
                pathname === item.href ? 'text-primary' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LanguageToggle currentLocale={currentLocale} />
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mb-6">
        <div className="md:hidden flex gap-2 items-center justify-between">
          <Logo />
          <div className="flex gap-2 items-center">
            <LanguageToggle currentLocale={currentLocale} />
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
                  key={item.labelKey}
                  href={item.href}
                  className={`w-full text-3xl text-center text-foreground hover:text-primary transition-colors duration-300 ease-in-out text-content-tertiary hover:text-primary ${
                    pathname === item.href ? 'text-primary' : ''
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
