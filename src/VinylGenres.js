import React from "react";
import "./VinylGenres.css";
import rock from "./assets/rock_genre_cover.png";
import pop from "./assets/pop_genre_cover.png";
import hiphop from "./assets/hiphop_sleeve.png";
import redrecord from "./assets/record_genre.png";
import soundtrack from "./assets/soundtrack_sleeve.png";
import altrock from "./assets/altrock_sleeve.png";

const genres = [
  { name: "ROCK", picks: ["Pink Floyd", "The Beatles"], image: rock },
  { name: "ALTERNATIVE ROCK", picks: ["Green Day", "Radiohead"], image: altrock },
  { name: "HIP-HOP", picks: ["Kendrick Lamar", "50 Cent"], image: hiphop },
  { name: "SOUNDTRACK", picks: ["Movie Soundtracks"], image: soundtrack },
  { name: "POP", picks: ["Ariana Grande", "Charlie XCX"], image: pop },
];

function VinylGenres() {
  return (
    <section className="vinyl-genres">
      <h2>Explore By Genre</h2>
      <h3>Dive Into Our Genres Selection and Discover Your Next Favorite Sound!</h3>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <div key={index} className="genre-sleeve">
            <div className="sleeve" style={{ backgroundImage: `url(${genre.image})` }}></div>
            <div className="sleeve-overlay"></div>
            <div className="sleeve-text">{genre.name}</div>
            <div className="record" style={{ backgroundImage: `url(${redrecord})` }} >
              <span className="record-text">{genre.picks.join(" - ")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VinylGenres;
