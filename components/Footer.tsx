export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pt-8">
      <div className="flex flex-col items-start space-y-4 text-start">
        <div className="flex flex-col sm:flex-row items-start gap-2 text-sm text-content-tertiary">
          <span>© {currentYear} Winnie</span>
          <span className="hidden sm:inline">•</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
