import './globals.css';
import type { Metadata } from 'next';
import { Inter, Pretendard } from 'next/font/google'; // Assuming Pretendard is locally hosted or setup for next/font
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configure fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pretendard = Pretendard({ // Replace with actual setup for Pretendard
  subsets: ['latin'], // Or appropriate subsets for Pretendard
  variable: '--font-pretendard',
  // You might need to configure this differently based on how Pretendard is integrated
  // For example, if it's a local font, you'd use localFont
});

export const metadata: Metadata = {
  title: 'TEE:UP - 프리미엄 골프 레슨 매칭 플랫폼',
  description: 'AI 기반 맞춤형 골프 레슨 프로 매칭. 나에게 꼭 맞는 최적의 레슨을 경험하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${pretendard.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
