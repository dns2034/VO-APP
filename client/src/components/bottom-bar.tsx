import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background shadow-[0_-2px_4px_rgba(0,0,0,0.1)] px-2 pb-2 pt-2 md:pt-3 md:pb-3">
      <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
        <BarItem href="/refer" label="Refer">
          <ReferIcon className="h-6 w-6" />
        </BarItem>
        <BarItem href="/rewards" label="Rewards">
          <RewardsIcon className="h-6 w-6" />
        </BarItem>
        <div className="flex flex-col items-center justify-end">
          <Link
            href="/book"
            className="flex flex-col items-center justify-end"
            prefetch={false}
            style={{ zIndex: 2 }}
          >
            <span
              className="bg-(--primary) rounded-full shadow-lg border-2 border-primary flex items-center justify-center"
              style={{ width: 60, height: 60, marginTop: -36 }}
            >
              <BookIcon className="h-7 w-7 text-white" />
            </span>
            {/* Move label below the icon, aligned with other labels */}
            <span
              className="block text-xs font-medium text-primary mt-2 pb-1 text-center"
              style={{ minHeight: 18 }}
            >
              Book
            </span>
          </Link>
        </div>
        <BarItem href="/businesses" label="Businesses">
          <BusinessesIcon className="h-6 w-6" />
        </BarItem>
        <BarItem href="/profile" label="Profile">
          <Avatar className="size-6">
            <AvatarImage src={"/placeholder.png"} alt={"placeholder"} />
            <AvatarFallback>
              {"Placeholder Image"
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </BarItem>
      </div>
    </nav>
  );
}

function BarItem({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-end gap-1 text-xs font-medium text-muted-foreground hover:text-primary focus:text-primary py-1"
      prefetch={false}
    >
      {children}
      <span className="truncate w-full text-center block">{label}</span>
    </Link>
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
      <rect x="3" y="4" width="16" height="16" rx="2" />
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

