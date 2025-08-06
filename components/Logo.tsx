'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // avoid hydration mismatch
  const logoPath =
    mounted && resolvedTheme === 'dark'
      ? '/images/logo-white.png'
      : '/images/logo.png';

  return (
    <div className="text-content-primary">
      <Link href="/">
        <Image src={logoPath} alt="logo" width={30} height={30} />
      </Link>
    </div>
  );
};

export default Logo;
