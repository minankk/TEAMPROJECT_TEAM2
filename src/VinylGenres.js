import React from "react";
import "./VinylGenres.css";

const genres = [
  { name: "Rock", picks: ["Pink Floyd", "The Beatles"] },
  { name: "Hip-Hop", picks: ["Kendrick Lamar", "Nas"] },
  { name: "Jazz", picks: ["Miles Davis", "John Coltrane"] },
];

function VinylGenres() {
  return (
    <section className="vinyl-genres parallax">
      <h2>Explore by Genre</h2>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <div key={index} className="genre-card">
            <div className="genre-front">
              <h3>{genre.name}</h3>
            </div>
            <div className="genre-back">
              <p>Top Picks: {genre.picks.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VinylGenres;
