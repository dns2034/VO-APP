import BottomBar from "@/components/bottom-bar";
export default function BusinessesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Businesses</h1>
          <p className="text-muted-foreground">
            Explore and connect with our partner businesses.
          </p>
        </div>
      </header>

      {/* Content for Businesses page goes here */}
      <div className="mt-6">
        <p>List of businesses will be displayed here.</p>
      </div>
      <BottomBar />
    </main>
  );
}
