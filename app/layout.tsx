import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./briefing.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "New Rocket Play | Assessoria Gospel e Marketing Digital",
  description:
    "Assessoria gospel, agenciamento, produção de conteúdo e marketing digital para cantores, pregadores, igrejas, ministérios e eventos cristãos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
