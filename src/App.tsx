import { useState } from "react";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}


function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const API_KEY = "bd70edd1"; // Reemplaza con tu clave

  const searchMovies = async () => {
    if (!query) return;
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error buscando películas:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Buscador de Películas</h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={searchMovies} style={{ padding: "10px" }}>Buscar</button>
      
      <div style={{ marginTop: "20px" }}>
        {movies.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {movies.map((movie) => (
              <div key={movie.imdbID} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  );
}

export default App;
