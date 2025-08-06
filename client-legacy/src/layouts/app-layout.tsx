import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function AppLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (user === undefined) return <h1>Loading layout...</h1>;

  if (user === null) return <Navigate to="/" replace />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="#">Virtual Office</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const label = value.charAt(0).toUpperCase() + value.slice(1);
                  const isLast = index === pathnames.length - 1;

                  return (
                    <Fragment key={to}>
                      <BreadcrumbSeparator key={`sep-${to}`} />
                      <BreadcrumbItem key={to}>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
