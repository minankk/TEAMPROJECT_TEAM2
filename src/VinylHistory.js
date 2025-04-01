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
                <h2>THE HISTORY OF VINYL RECORDS</h2>

                <p>
                    Vinyl records emerged as the dominant music format in the mid-20th century, offering high-fidelity sound and a tangible connection to music.
                    Even with the rise of digital formats, vinyl remains beloved for its warm tones and collectible nature.
                </p>

                <p>
                    One of the key reasons vinyl continues to captivate listeners is its <strong>rich analog sound</strong>,
                    which many believe delivers a more <strong>authentic listening experience</strong> than digital formats.
                    The tactile nature of vinyl records, from <strong>carefully placing the needle</strong> to <strong>flipping the record</strong> creates a unique musical ritual.
                    Additionally, the <strong>large album covers</strong> provide a visual experience, featuring artwork that becomes part of the overall listening journey.
                </p>

                <p>
                    In recent years, vinyl has made a massive comeback. Independent record stores are thriving, and both classic reissues and new albums
                    are being pressed on vinyl. This resurgence highlights vinyl’s <strong>timeless appeal</strong> and its continued place in modern music culture.
                </p>
            </div>
        </section>
    );
};

export default VinylHistory;
