import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

interface Props {
  header: string;
  subheader: string;
  items: {
    first?: string;
    second?: string;
    third?: string;
  };
}

function HeroSection({
  header,
  subheader,
  items: { first, second, third },
}: Props) {
  return (
    <BackgroundGradientAnimation containerClassName="hidden lg:block text-white">
      <div className="h-full min-h-screen flex flex-col items-center justify-center">
        <div className="w-full h-24 rounded-full flex flex-shrink-0 items-center justify-center mb-8 backdrop-blur-sm">
          <img src="/icon.webp" alt="Logo" className="h-20" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">{header}</h1>
        <p className="text-xl text-center mb-8 max-w-md text-white/80">
          {subheader}
        </p>

        <div className="space-y-6 w-full max-w-md flex flex-col pl-10">
          {first && (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-white/90 text-left text-lg">{first}</p>
            </div>
          )}

          {second && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-white/90 text-left text-lg">{second}</p>
            </div>
          )}

          {third && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-white/90 text-left text-lg">{third}</p>
            </div>
          )}
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}

export default HeroSection;
