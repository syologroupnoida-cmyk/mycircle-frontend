import "./globals.css";

export const metadata = {
  title: "MyCircle | Your world, all in one place",
  description: "Connect with people and discover possibilities across every chapter of life.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}

