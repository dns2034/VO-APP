export default function AppHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="flex flex-row items-center bg-white text-gray-900 p-4 border-b border-border">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-bold text-lg flex items-center gap-2">{title}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </header>
  );
}
