import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { Metadata } from "next";

import SideNav from "@/app/components/sidenav";
import { cn } from "@/app/lib/utils";
import "@/app/globals.css";
import theme from "@/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: { template: "%s | MUI Customization", default: "MUI Customization" },
  description: "Showcase of restyled Material UI components.",
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(`antialiased ${roboto.variable}`)}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow px-4 md:overflow-y-auto md:px-12 mt-4">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
