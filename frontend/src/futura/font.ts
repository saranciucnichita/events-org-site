import localFont from 'next/font/local';


export const customFont = localFont({
  src: './futura.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-custom',
});