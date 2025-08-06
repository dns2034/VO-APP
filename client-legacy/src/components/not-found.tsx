// just strictly based on the Figma design
export function NotFound() {
  return (
    <div className="min-h-screen w-full grid place-content-center justify-center items-center text-center">
      <div className="w-full grid grid-cols-1 gap-3 md:max-w-md lg:max-w-3xl">
        <h1 className="font-bold text-3xl lg:text-6xl">This Page Does Not Exist</h1>
        <p className="text-muted-foreground mb-24 md:mb-28 lg:mb-32 lg:text-lg">
          We couldn’t find what you were looking for. Try checking the URL or
          return to the homepage.
        </p>

        <div className="relative">
          <img
            className="w-11/12 mx-auto lg:w-8/12"
            src="/not-found-1.png"
            alt="Ellipse 15"
          />
          <img
            className="absolute w-8/12 -top-1/2 left-1/2 -translate-x-1/2 lg:w-5/12"
            src="/not-found-2.png"
            alt="36"
          />
        </div>
      </div>
    </div>
  );
}
