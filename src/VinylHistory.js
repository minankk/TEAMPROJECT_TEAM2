import "./VinylHistory.css";
import { useEffect, useState } from "react";
import VinylImage from "./assets/gold_vinyl.webp";

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
    "Records pressed in Japan are known for their exceptional quality due to the purity of the vinyl used."
];

const VinylHistory = () => {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [randomFacts, setRandomFacts] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showFact, setShowFact] = useState(false);

    useEffect(() => {
        const shuffledFacts = [...facts].sort(() => 0.5 - Math.random()).slice(0, 10);
        setRandomFacts(shuffledFacts);
        let factIndex = 0;

        const interval = setInterval(() => {
            setIsSpinning(true);
            setShowFact(false);
            setTimeout(() => {
                setIsSpinning(false);
                setCurrentFactIndex(factIndex);
                factIndex = (factIndex + 1) % shuffledFacts.length;
                setTimeout(() => setShowFact(true), 200);
            }, 2000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
<section id="vinyl-history">
    <h2>THE LEGACY OF VINYL</h2> {/* Move it above everything else */}

    <div className="vinyl-left">
        <h3 className="fact-title">Did You Know?</h3>
        <div className="vinyl-image-container">
            <img
                src={VinylImage}
                alt="Vinyl Record"
                className={`vinyl-record ${isSpinning ? "spin" : "pause"}`}
            />
        </div>
        <div className={`vinyl-fact-box ${showFact ? "show" : ""}`}>
            {randomFacts.length > 0 && <p key={currentFactIndex}>{randomFacts[currentFactIndex]}</p>}
        </div>
    </div>

            <div className="vinyl-history-content">
          <p>
          Vinyl records became the dominant music format in the mid-20th century, offering high-fidelity sound and a tangible connection to music. Despite digital formats, vinyl remains cherished for its warm tones and collectible nature.
          </p>
          <p>
          Vinyl’s <strong>rich analog sound</strong> is often considered more <strong>authentic</strong> than digital. The ritual of <strong>placing the needle</strong> and <strong>flipping the record</strong>, along with <strong>large album covers</strong>, enhances the listening experience.
          </p>
          <p>
          The vinyl market has seen a major resurgence in recent years, with independent stores thriving and both reissues and new albums being pressed, showcasing its <strong>timeless appeal</strong>.
          </p>
            </div>
        </section>
    );
};

export default VinylHistory;
