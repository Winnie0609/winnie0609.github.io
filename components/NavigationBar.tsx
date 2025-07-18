import Link from 'next/link';
import ModeToggle from './ModeToggle';

const NavigationBar = () => {
  const navigationItems = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Writings',
      href: '/writings',
    },
    {
      label: 'Weeknotes',
      href: '/weeknotes',
    },
  ];

  return (
    <div className="flex gap-4">
      {navigationItems.map((item) => (
        <Link href={item.href} key={item.label}>
          {item.label}
        </Link>
      ))}
      <ModeToggle />
    </div>
  );
};

export default NavigationBar;
