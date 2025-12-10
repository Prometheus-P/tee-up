import Link from 'next/link';
import { Button } from './ui/Button';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-tee-ink-light/20 bg-tee-surface px-space-4 py-space-3">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-space-2">
          <Image
            src="/favicon.svg" // Adjust path as needed
            alt="TEE:UP Logo"
            width={24}
            height={24}
            priority
          />
          <span className="text-h3 font-bold text-tee-ink-strong">TEE:UP</span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-space-8">
            <li>
              <Link href="/find-pros" className="text-body font-medium text-tee-ink-strong hover:text-tee-accent-primary">
                프로 찾기
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="text-body font-medium text-tee-ink-strong hover:text-tee-accent-primary">
                이용 방법
              </Link>
            </li>
            <li>
              <Link href="/community" className="text-body font-medium text-tee-ink-strong hover:text-tee-accent-primary">
                커뮤니티
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="text-body font-medium text-tee-ink-strong hover:text-tee-accent-primary">
                마이페이지
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-space-4">
          <ThemeToggle />
          {/* Primary CTA */}
          <Button asChild variant="primary" size="md">
            <Link href="/get-started">
              바로 시작하기
            </Link>
          </Button>

          {/* Mobile Hamburger (Hidden on Desktop) */}
          <button className="md:hidden">
            {/* Hamburger Icon */}
            <svg
              className="h-space-8 w-space-8 text-tee-ink-strong"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
