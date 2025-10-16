import './globals.css';
import ThemeWrapper from '@/components/ThemeWrapper';

export const metadata = {
  title: 'Timothée Casilli - Portfolio',
  description: 'Portfolio de Timothée Casilli',
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body>
        <ThemeWrapper>
          <div className='main-wrapper'>{children}</div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
