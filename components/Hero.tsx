import Navbar from "./Navbar";
import SearchBlock from "./SearchBlock";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(assets/images/mainBG.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 10,
        margin: 8,
      }}
      className="min-h-screen px-4 sm:px-8 flex flex-col justify-between p-8"
    >
      <Navbar />
      <div className="space-y-4 sm:space-y-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white">
          Navigate Roads <br className="block sm:hidden" /> with Comfort
        </h1>
        <SearchBlock />
      </div>
    </div>
  );
};

export default Hero;
