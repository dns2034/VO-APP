export default function Header() {
  return (
    <>
      <header className="flex flex-row justify-center text-center items-center bg-white text-gray-900 p-4 border-b">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Book</h1>
          <p className="text-xs text-gray-500">
            Book at your own pace and convenience.
          </p>
        </div>
      </header>
    </>
  );
}
