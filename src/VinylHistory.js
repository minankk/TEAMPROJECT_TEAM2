import "./VinylHistory.css";
import { useEffect, useState } from "react";

const facts = [
    "The world’s first LP was *Mendelssohn’s Violin Concerto in E Minor*, released in 1948 by Columbia Records.",
    "Vinyl records are made from PVC (polyvinyl chloride), giving them durability and flexibility.",
    "The longest vinyl record ever made was a 90-minute album by The Flaming Lips.",
    "The most expensive vinyl ever sold was a rare copy of *The Beatles’ White Album*, which went for $790,000.",
    "Colored vinyl and picture discs were originally used as promotional gimmicks but became collector favorites.",
    "Before LPs, 78 RPM records could only hold about 3-4 minutes per side.",
    "Vinyl records can be cut in custom shapes, including hearts, triangles, and even skulls.",
    "Some modern turntables use laser technology to read vinyl without touching the grooves.",
    "The 'wow and flutter' effect in vinyl playback comes from minor speed variations in the turntable.",
    "Records pressed in Japan are known for their exceptional quality due to the purity of the vinyl used.",
    "Glow-in-the-dark and scented vinyl records exist as novelty items.",
    "Jack White’s album *Lazaretto* includes hidden tracks that play at different speeds.",
    "Some records have secret messages etched into the runout groove.",
    "In the 1970s, vinyl was used to create flexi-discs, ultra-thin records printed on paper or plastic.",
    "The largest vinyl record collection belongs to Zero Freitas, a Brazilian businessman with millions of records."
];

const VinylHistory = () => {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [randomFacts, setRandomFacts] = useState([]);

    useEffect(() => {
        const shuffledFacts = [...facts].sort(() => 0.5 - Math.random()).slice(0, 10);
        setRandomFacts(shuffledFacts);
        let factIndex = 0;

        const interval = setInterval(() => {
            setCurrentFactIndex(factIndex);
            factIndex = (factIndex + 1) % shuffledFacts.length;
        }, 4000); // Change fact every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="vinyl-history">
            <h2>The History of Vinyl Records</h2>
            <p>
            Vinyl records are a sound recording format that was developed in the
            middle of the 20th century and was used mainly before analogues of
            digital sound media. Despite technological advances and the advent
            of CD, MP3, and streaming services, vinyl has its own products and
            appeals to music lovers with its warm sound and spaciousness.
            Collectors appreciate vinyl for its tangible nature and unique album art,
            making it not just a medium for music, but a cultural experience.
            As a result, vinyl records have seen a resurgence in recent years,
            becoming a staple in both nostalgia-driven and modern music collections
            </p>

            <h3>10 Vinyl Facts</h3>
            <ul id="vinyl-facts">
                {randomFacts.length > 0 && <li key={currentFactIndex}>{randomFacts[currentFactIndex]}</li>}
            </ul>
        </section>
    );
};

export default VinylHistory;
