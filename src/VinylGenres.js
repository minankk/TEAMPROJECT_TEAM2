import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./VinylGenres.css";
import rock from "./assets/rock_genre_cover.png";
import pop from "./assets/pop_sleeve.jpeg";
import hiphop from "./assets/hiphop_sleeve.png";
import redrecord from "./assets/record_genre.png";
import soundtrack from "./assets/soundtrack_sleeve.png";
import altrock from "./assets/altrock_sleeve.png";

const genres = [
  { name: "ALTERNATIVE ROCK", picks: ["Innovative Rock"], image: altrock, path: "/genres/alternative-rock" },
  { name: "HIP-HOP", picks: ["Urban Beats"], image: hiphop, path: "/genres/hip-hop" },
  { name: "SOUNDTRACK", picks: ["Cinematic Scores"], image: soundtrack, path: "/genres/soundtrack" },
  { name: "POP", picks: ["Mainstream Hits"], image: pop, path: "/genres/pop" },
  { name: "ROCK", picks: ["Classic Jams"], image: rock, path: "/genres/rock" },
];

function VinylGenres() {
  return (
    <section className="vinyl-genres">
      <h2>Explore By Genre</h2>
      <h3>Dive Into Our Genres Selection and Discover Your Next Favorite Sound!</h3>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <Link to={genre.path} key={index} className="genre-link"> {/* Wrap in Link */}
            <div className="genre-sleeve">
              <div className="sleeve" style={{ backgroundImage: `url(${genre.image})` }}></div>
              <div className="sleeve-overlay"></div>
              <div className="sleeve-text">{genre.name}</div>
              <div className="record" style={{ backgroundImage: `url(${redrecord})` }} >
                <span className="record-text">{genre.picks.join(" - ")}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default VinylGenres;
