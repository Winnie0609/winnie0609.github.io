'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';

const Logo = () => {
  const pathname = usePathname();

  // 检测当前语言
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale =
    segments.length > 0 && isValidLocale(segments[0]) ? segments[0] : null;

  // 如果在多语言路由下，链接到对应语言的首页
  const homeHref = currentLocale ? `/${currentLocale}` : '/zh';

  return (
    <div>
      <Link href={homeHref}>wthex</Link>
    </div>
  );
};

export default Logo;
