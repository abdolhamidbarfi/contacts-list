import StoreProvider from "./StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Header from "@/components/Header";

const yekanBakhRegular = localFont({
  src: "../styles/fonts/YekanBakh-Regular.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | دفترچه مخاطبین",
    default: "  دفترچه مخاطبین  ",
  },
  description:
    "یک برنامه ساده و کاربردی برای مدیریت مخاطبین شما. می‌توانید مخاطبین خود را اضافه، ویرایش و حذف کنید و همه اطلاعات را به راحتی مدیریت نمایید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${yekanBakhRegular.className}  antialiased`}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
