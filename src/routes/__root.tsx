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
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1428" },
      { title: "Medimint — Tokenized Diagnostics" },
      { name: "description", content: "Premium token holder cockpit for MDMT — live yield, linked machines, marketplace and rewards." },
      { property: "og:title", content: "Medimint — Tokenized Diagnostics" },
      { property: "og:description", content: "Premium token holder cockpit for MDMT — live yield, linked machines, marketplace and rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Medimint — Tokenized Diagnostics" },
      { name: "twitter:description", content: "Premium token holder cockpit for MDMT — live yield, linked machines, marketplace and rewards." },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Medimint" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "application-name", content: "Medimint" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d14e4a64-7bc3-4f61-98c9-e6ca0d0906ae/id-preview-5d321fc1--92c61527-2e73-4bd1-b4b7-d90e4e43d442.lovable.app-1780768319644.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d14e4a64-7bc3-4f61-98c9-e6ca0d0906ae/id-preview-5d321fc1--92c61527-2e73-4bd1-b4b7-d90e4e43d442.lovable.app-1780768319644.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icons/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const SPLASH_CSS = `
  #medimint-splash{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:radial-gradient(120% 80% at 50% 0%,#2a1a4a 0%,#1a1428 55%,#0f0a1e 100%);transition:opacity .45s ease;opacity:1;pointer-events:none}
  #medimint-splash.medimint-splash--hide{opacity:0}
  #medimint-splash img{width:104px;height:104px;border-radius:24px;box-shadow:0 20px 60px -20px rgba(139,92,246,.55);animation:medimint-splash-pop .6s cubic-bezier(.2,.8,.2,1) both}
  #medimint-splash .medimint-splash__wm{font:600 13px/1 'Space Grotesk',system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#b5a3e0;opacity:.85}
  #medimint-splash .medimint-splash__dot{width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#22d3ee);animation:medimint-splash-pulse 1.1s ease-in-out infinite}
  @keyframes medimint-splash-pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes medimint-splash-pulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.6);opacity:1}}
`;

const SPLASH_HIDE_JS = `(function(){function h(){var e=document.getElementById('medimint-splash');if(!e)return;e.classList.add('medimint-splash--hide');setTimeout(function(){e&&e.remove()},500)}if(document.readyState==='complete')setTimeout(h,400);else window.addEventListener('load',function(){setTimeout(h,250)});})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: SPLASH_CSS }} />
      </head>
      <body>
        <div id="medimint-splash" aria-hidden="true">
          <img src="/icons/icon-192.png" alt="" width={104} height={104} />
          <div className="medimint-splash__wm">Medimint</div>
          <div className="medimint-splash__dot" />
        </div>
        {children}
        <Scripts />
        <script dangerouslySetInnerHTML={{ __html: SPLASH_HIDE_JS }} />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
