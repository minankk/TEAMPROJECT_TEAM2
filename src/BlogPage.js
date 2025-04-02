import React from 'react';
import './BlogPage.css';

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      title: 'The Resurgence of Vinyl Records',
      date: 'October 26, 2023',
      summary: 'The resurgence of vinyl records refers to the renewed interest and increased sales of vinyl records in the music industry. This revival has been driven by several factors, including nostalgia, the desire for physical media, and dissatisfaction with digital streaming services. In fact, for the first time since 1986, vinyl records outsold CDs in annual sales, with a significant portion of consumers willing to pay for vinyl.',
      imageUrl: 'https://via.placeholder.com/600x400',
      link: '/article/vinyl-resurgence',
    },
    {
      id: 3,
      title: 'The Evolution of Hip-Hop in the 21st Century',
      date: 'November 12, 2023',
      summary: 'As the century turned, the music industry entered into a crisis brought on by the advent of digital downloading. Hip-hop suffered at least as severely as or worse than other genres, with sales tumbling throughout the decade. Simultaneously, though, it solidified its standing as the dominant influence on global youth culture.',
      imageUrl: 'https://via.placeholder.com/600x400',
      link: '/article/hip-hop-evolution',
    },
    {
      id: 4,
      title: 'The Influence of Jazz on Modern Music',
      date: 'November 19, 2023',
      summary: 'An exploration of how jazz music has influenced and continues to influence various genres in today\'s music scene. It introduced new harmonies, rhythms, and improvisation techniques. Genres like rock, R&B, hip-hop, and pop have been shaped by jazz. Jazz rhythms and harmonies are featured in styles like R&B and Latin music. Hip-hop and modern R&B have deep roots in jazz.',
      imageUrl: 'https://via.placeholder.com/600x400',
      link: '/article/jazz-influence',
    },
    {
      id: 5,
      title: 'The Ever-Changing Landscape of Pop Music',
      date: 'November 26, 2023',
      summary: 'Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom. During the 1950s and 1960s, pop music encompassed rock and roll and the youth-oriented styles it influenced. Rock and pop music remained roughly synonymous until the late 1960s, after which pop became associated with music that was more commercial, ephemeral, and accessible.',
      imageUrl: 'https://via.placeholder.com/600x400',
      link: '/article/pop-music-landscape',
    },
  ];

  return (
    <div className="blog-page">
      <h1>Music Blog</h1>
      <div className="articles-container">
        {articles.map((article) => (
          <article key={article.id} className="article">
            <img src={article.imageUrl} alt={article.title} className="article-image" />
            <h2>{article.title}</h2>
            <p className="article-date">{article.date}</p>
            <p className="article-summary">{article.summary}</p>
            <a href={article.link} className="read-more">Read More</a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;