export default function ProfilePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and account settings.
          </p>
        </div>
      </header>

      {/* Content for Profile page goes here */}
      <div className="mt-6">
        <p>Your profile details will be displayed here.</p>
      </div>
    </main>
  );
}
