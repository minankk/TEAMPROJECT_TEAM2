import React, { useState } from 'react';
import './BlogPage.css';

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: 'The Resurgence of Vinyl Records',
      date: 'October 26, 2023',
      summary: 'The resurgence of vinyl records refers to the renewed interest and increased sales of vinyl records in the music industry.',
      link: '/article/vinyl-resurgence',
      fullContent: 'The resurgence of vinyl records refers to the renewed interest and increased sales of vinyl records in the music industry. This revival has been driven by several factors, including nostalgia, the desire for physical media, and dissatisfaction with digital streaming services. In fact, for the first time since 1986, vinyl records outsold CDs in annual sales, with a significant portion of consumers willing to pay for vinyl. The rich, warm sound of vinyl is often cited as superior to digital formats, and the tactile experience of handling a record and its artwork is a unique part of the appeal. Limited edition releases and special pressings have also fueled the demand for vinyl, with collectors eager to own these exclusive items.',
    },
    {
      id: 3,
      title: 'The Evolution of Hip-Hop in the 21st Century',
      date: 'November 12, 2023',
      summary: 'As the century turned, the music industry entered into a crisis brought on by the advent of digital downloading.',
      link: '/article/hip-hop-evolution',
      fullContent: 'The 21st century has seen hip-hop evolve in numerous ways, from its sonic experimentation to its lyrical content. The genre has embraced elements of electronic music, pop, and R&B, creating a diverse and ever-changing soundscape. Lyrically, hip-hop has become more introspective, with artists exploring themes of mental health, social issues, and personal struggles. The rise of streaming platforms has also democratized the genre, allowing independent artists to reach a global audience without the need for major label support. Hip-hop\'s influence can be seen in fashion, language, and art, making it a cultural force that transcends music.',
    },
    {
      id: 5,
      title: 'The Ever-Changing Landscape of Pop Music',
      date: 'November 26, 2023',
      summary: 'Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      link: '/article/pop-music-landscape',
      fullContent: 'Pop music has always been a reflection of the times, adapting and evolving to meet the changing tastes of its audience. From the early days of rock and roll to the synth-driven sounds of the 80s and the digital production of today, pop has consistently reinvented itself. The rise of streaming platforms has further diversified the genre, allowing artists from around the world to reach a global audience. Pop\'s ability to blend with other genres, such as hip-hop, electronic music, and Latin styles, has kept it relevant and exciting. As technology continues to shape the music industry, pop will undoubtedly continue to evolve, reflecting the ever-changing landscape of popular culture.',
    },
    {
      id: 6,
      title: 'The Power of Rock Anthems',
      date: 'December 3, 2023',
      summary: 'Rock anthems have the power to unite and inspire, with their soaring melodies and powerful lyrics.',
      link: '/article/rock-anthems',
      fullContent: 'Rock anthems have the power to unite and inspire, with their soaring melodies and powerful lyrics. From classic rock to modern alternative, these songs have become timeless classics that resonate with generations. The energy and passion of rock anthems can ignite a sense of rebellion and freedom, making them a staple in music history.',
    },
    {
      id: 7,
      title: 'The Magic of Movie Soundtracks',
      date: 'December 10, 2023',
      summary: 'Movie soundtracks have the ability to enhance the emotional impact of a film, creating a powerful and immersive experience.',
      link: '/article/movie-soundtracks',
      fullContent: 'Movie soundtracks have the ability to enhance the emotional impact of a film, creating a powerful and immersive experience. From iconic scores that define a movie\'s identity to carefully curated songs that amplify key moments, soundtracks play a vital role in storytelling. The magic of movie soundtracks lies in their ability to transport the audience into the world of the film, evoking a range of emotions and memories.',
    },
    {
      id: 8,
      title: 'The Evolution of Rock Music',
      date: 'December 17, 2023',
      summary: 'Rock music has evolved significantly since its origins in the 1950s, with various subgenres emerging and influencing the music scene.',
      link: '/article/rock-evolution',
      fullContent: 'Rock music has evolved significantly since its origins in the 1950s, with various subgenres emerging and influencing the music scene. From classic rock to heavy metal, punk rock, and indie rock, the genre has continuously reinvented itself. The rise of digital platforms has also allowed for greater experimentation and fusion with other genres, leading to a diverse and dynamic rock landscape.',
    },
    {
      id: 9,
      title: 'The Global Impact of Hip-Hop Culture',
      date: 'December 24, 2023',
      summary: 'Hip-hop culture has spread globally, influencing music, fashion, art, and language in diverse and profound ways.',
      link: '/article/hiphop-global',
      fullContent: 'Hip-hop culture has spread globally, influencing music, fashion, art, and language in diverse and profound ways. From its roots in the Bronx, hip-hop has become a global phenomenon, with artists from around the world embracing the genre and adding their unique cultural perspectives. The impact of hip-hop can be seen in the rise of international hip-hop scenes, the use of hip-hop in advertising and film, and the adoption of hip-hop fashion and slang in mainstream culture.',
    },
    {
      id: 10,
      title: 'The Rise of Alternative Rock',
      date: 'December 31, 2023',
      summary: 'Alternative rock emerged in the 1980s as a reaction against mainstream rock, offering a more diverse and experimental sound.',
      link: '/article/alternative-rock',
      fullContent: 'Alternative rock emerged in the 1980s as a reaction against mainstream rock, offering a more diverse and experimental sound. With bands like R.E.M., Sonic Youth, and Pixies leading the way, alternative rock challenged the conventions of rock music and paved the way for the grunge and indie rock movements of the 1990s. The genre\'s influence can still be heard in contemporary rock music, with many artists drawing inspiration from its diverse and innovative sound.',
    },
  ];

  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleReadMoreClick = (id) => {
    setExpandedArticleId(id === expandedArticleId ? null : id);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Music Blog</h1>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <main className="blog-main">
        <ul className="article-list">
          {filteredArticles.map((article) => (
            <li key={article.id} className="blog-article">
              <div className="article-content">
                <h2>{article.title}</h2>
                <p className="article-date">{article.date}</p>
                <p className="article-summary">{article.summary}</p>
                <button onClick={() => handleReadMoreClick(article.id)} className="read-more">
                  {expandedArticleId === article.id ? 'Read Less' : 'Read More'}
                </button>
                {expandedArticleId === article.id && (
                  <div className="full-content">
                    <p>{article.fullContent}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BlogPage;