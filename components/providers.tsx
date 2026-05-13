// "use client";

// export default function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <>{children}</>;
// }

"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function ClerkWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? "dark" : "light",
      }}
    >
      {children}
    </ClerkProvider>
  );
}