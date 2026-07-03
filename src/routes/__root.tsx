import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4 text-cream">
      <div className="max-w-md text-center">
        <p className="eyebrow">DrillThru Banquet</p>
        <h1 className="font-display mt-4 text-7xl gold-text">404</h1>
        <p className="mt-3 text-sm text-white/60">
          The page you're looking for has drifted from the ballroom.
        </p>
        <Link to="/" className="btn-gold mt-8 inline-flex">
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // removed Lovable error reporting integration
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4 text-cream">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something interrupted the evening</p>
        <h1 className="font-display mt-4 text-4xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-white/60">Please try again in a moment.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost-gold">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DrillThru Banquet — Luxury Wedding & Event Venue in Nepal" },
      {
        name: "description",
        content:
          "DrillThru Banquet is Nepal's premier luxury venue for weddings, receptions, corporate galas and celebrations. Grand halls, royal decor and exceptional hospitality.",
      },
      { name: "author", content: "DrillThru Banquet" },
      { name: "theme-color", content: "#111111" },
      {
        property: "og:title",
        content: "DrillThru Banquet — Where Celebrations Become Timeless Memories",
      },
      {
        property: "og:description",
        content:
          "Luxury weddings, receptions, corporate events and private celebrations at Nepal's most refined banquet venue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DrillThru Banquet — Luxury Wedding Venue" },
      { name: "twitter:description", content: "Where celebrations become timeless memories." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
