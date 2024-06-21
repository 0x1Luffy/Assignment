import { useState, useEffect } from 'react';

const PokemonGallery = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon('https://pokeapi.co/api/v2/pokemon');

  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredList = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filteredList);
    }
  }, [searchTerm, pokemonList]);

  const fetchNextPage = () => {
    if (nextPageUrl) {
      fetchPokemon(nextPageUrl);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="pokemon-gallery max-w-screen-lg mx-auto mt-8 p-8">
      <div className="flex justify-center mb-4 p-8">
        <input
          type="text"
          placeholder="Search Pokémon by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-64 sm:w-80 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="pokemon-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-28">
        {filteredPokemonList.map((pokemon, index) => (
          <div className="pokemon-card bg-white rounded-lg p-4 shadow-md" key={index}>
            <h3 className="text-lg font-serif font-semibold uppercase mb-2 text-center">{pokemon.name}</h3>
            <img
              className="mx-auto"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div>
      {nextPageUrl && (
        <div className="flex justify-center mt-4">
          <button onClick={fetchNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Load More
          </button>
        </div>
      )}
      {pokemonList.length === 0 && (
        <p className="text-white text-center mt-4">Loading...</p>
      )}
    </div>
  );
};

export default PokemonGallery;
