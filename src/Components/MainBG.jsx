import PokemonGallery from "./PokemonGallery";

const MainBG = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center p-4 sm:p-10">
      <div className="relative max-w-screen-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-poppins uppercase text-center">
          Discover Everything You Need to Know About Pokémon
        </h1>
        <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2" width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 C50 20, 150 20, 200 10" stroke="#00BFFF" strokeWidth="4" />
        </svg>
      </div>
      <div className="Cards ">
        <PokemonGallery/>
      </div>
    </div>
  );
};

export default MainBG;
