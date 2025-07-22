'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n';

interface LanguageToggleProps {
  currentLocale?: Locale | null;
}

export default function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    // if current in multi-language route, switch language
    if (currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    } else {
      // if current in single-language route, redirect to multi-language homepage
      router.push(`/${newLocale}`);
    }
  };

  // if current not in multi-language route, hide language toggle
  if (!currentLocale) {
    return null;
  }

  return (
    <div
      className="flex flex-row items-center gap-1 cursor-pointer"
      onClick={() => switchLanguage(currentLocale === 'zh' ? 'en' : 'zh')}
    >
      <Globe className="h-4 w-4 text-content-tertiary" />
      <span className="text-sm uppercase text-content-tertiary">
        {currentLocale === 'zh' ? 'ZH' : 'EN'}
      </span>
    </div>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="sm">
    //       <Globe className="h-4 w-4" />
    //       <span className="ml-1 text-xs uppercase">{currentLocale}</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     {locales.map((locale) => (
    //       <DropdownMenuItem
    //         key={locale}
    //         onClick={() => switchLanguage(locale)}
    //         className={currentLocale === locale ? 'bg-accent' : ''}
    //       >
    //         <span className="text-xs uppercase">{locale}</span>
    //         <span className="ml-2">{locale === 'zh' ? '中文' : 'English'}</span>
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
