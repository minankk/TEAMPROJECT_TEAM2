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
      id: 4,
      title: 'The Influence of Jazz on Modern Music',
      date: 'November 19, 2023',
      summary: 'An exploration of how jazz music has influenced and continues to influence various genres in today\'s music scene.',
      link: '/article/jazz-influence',
      fullContent: 'Jazz, with its rich history and improvisational nature, has left an indelible mark on modern music. Its influence can be heard in the complex harmonies of contemporary R&B, the rhythmic experimentation of hip-hop, and the melodic structures of pop. Jazz\'s emphasis on individual expression and pushing musical boundaries has inspired artists across genres to explore new sonic territories. The genre\'s legacy can also be seen in film scores, where jazz harmonies and instrumentation are used to create mood and atmosphere. As music continues to evolve, the influence of jazz remains a vital part of its DNA.',
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
        {filteredArticles.map((article, index) => (
          <article
            key={article.id}
            className="blog-article"
            style={index >= 4 ? { gridColumn: '1 / -1' } : {}}
          >
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
          </article>
        ))}
      </main>
    </div>
  );
};

export default BlogPage;