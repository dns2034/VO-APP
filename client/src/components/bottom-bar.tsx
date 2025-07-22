/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mGVggH0RgOv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background shadow-[0_-2px_4px_rgba(0,0,0,0.1)] md:h-16 py-10">
      {/* Use equal width for each nav item for even spacing */}
      <Link
        href="/refer"
        className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary flex-1 min-w-0"
        prefetch={false}
      >
        <ReferIcon className="h-6 w-6" />
        <span className="truncate w-full text-center block">Refer</span>
      </Link>
      <Link
        href="/book"
        className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary flex-1 min-w-0"
        prefetch={false}
      >
        <BookIcon className="h-6 w-6" />
        <span className="truncate w-full text-center block">Book</span>
      </Link>
      <Link
        href="/rewards"
        className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary flex-1 min-w-0"
        prefetch={false}
      >
        <RewardsIcon className="h-6 w-6" />
        <span className="truncate w-full text-center block">Rewards</span>
      </Link>
      <Link
        href="/businesses"
        className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary flex-1 min-w-0"
        prefetch={false}
      >
        <BusinessesIcon className="h-6 w-6" />
        <span className="truncate w-full text-center block">Businesses</span>
      </Link>
    </nav>
  );
}

// Refer icon (users)
function ReferIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Book icon (calendar)
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

// Rewards icon (gift)
function RewardsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3a2 2 0 1 1-4 4 2 2 0 1 1-4-4" />
      <path d="M12 7v14" />
    </svg>
  );
}

// Businesses icon (briefcase)
function BusinessesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3h-8v4h8V3z" />
    </svg>
  );
}
