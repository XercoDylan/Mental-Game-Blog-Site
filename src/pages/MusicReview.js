import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './MusicReview.css';

const MusicReview = () => {
  const navigate = useNavigate();

  // Sample album reviews - replace with real data later
  const reviews = [
    {
      id: 1,
      artist: 'KENDRICK LAMAR',
      album: 'Mr. Morale & The Big Steppers',
      year: '2022',
      rating: 9.2,
      genre: 'CONSCIOUS RAP',
      reviewer: 'MENTAL GAME',
      date: 'MAY 15, 2022',
      albumCover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      summary: 'Kendrick delivers his most introspective and experimental album to date, diving deep into therapy, trauma, and transformation.',
      verdict: 'A masterclass in vulnerability and artistic evolution. Essential listening.'
    },
    {
      id: 2,
      artist: 'TYLER, THE CREATOR',
      album: 'Call Me If You Get Lost',
      year: '2021',
      rating: 8.8,
      genre: 'HIP-HOP',
      reviewer: 'MENTAL GAME',
      date: 'JUNE 25, 2021',
      albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
      summary: 'Tyler returns to his rap roots with luxurious production and confident bars. A victory lap from an artist fully comfortable in his own skin.',
      verdict: 'Tyler proves he can still rap while maintaining his signature sonic palette.'
    },
    {
      id: 3,
      artist: 'J. COLE',
      album: 'The Off-Season',
      year: '2021',
      rating: 7.9,
      genre: 'RAP',
      reviewer: 'MENTAL GAME',
      date: 'MAY 14, 2021',
      albumCover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      summary: 'Cole comes through with polished bars and production, showcasing technical prowess. Solid project that plays it safe.',
      verdict: 'Technically impressive but doesn\'t quite reach his previous heights.'
    },
    {
      id: 4,
      artist: 'TRAVIS SCOTT',
      album: 'UTOPIA',
      year: '2023',
      rating: 8.5,
      genre: 'TRAP',
      reviewer: 'MENTAL GAME',
      date: 'JULY 28, 2023',
      albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      summary: 'Travis delivers psychedelic production and maximalist soundscapes. A sonic journey that pushes boundaries.',
      verdict: 'Travis continues to innovate and create immersive musical experiences.'
    }
  ];

  return (
    <motion.div
      className="page-container music-review-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={() => navigate('/')}>
        ← BACK TO HOME
      </button>

      <div className="page-content">
        {/* Newspaper Header */}
        <div className="review-header">
          <div className="review-header-top">MUSIC CRITIQUE</div>
          <h1 className="page-title review-title">ALBUM REVIEWS</h1>
          <div className="review-header-subtitle">HONEST TAKES ON HIP-HOP'S LATEST RELEASES</div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Album Cover */}
              <div className="review-album-cover">
                <img src={review.albumCover} alt={review.album} className="album-image" />
                <div className="rating-badge">
                  <div className="rating-number">{review.rating}</div>
                  <div className="rating-scale">/10</div>
                </div>
              </div>

              {/* Review Content */}
              <div className="review-content">
                <div className="review-header">
                  <div className="review-meta">
                    <span className="review-genre">{review.genre}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <h3 className="review-artist">{review.artist}</h3>
                  <div className="review-album-title">"{review.album}"</div>
                  <div className="review-year">({review.year})</div>
                </div>

                <div className="review-body">
                  <p className="review-summary">{review.summary}</p>
                  <div className="review-verdict">
                    <span className="verdict-label">VERDICT:</span>
                    <span className="verdict-text">{review.verdict}</span>
                  </div>
                </div>

                <div className="review-footer">
                  <span className="reviewer-label">REVIEWED BY</span>
                  <span className="reviewer-name">{review.reviewer}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="coming-soon-banner">
          <h2 className="coming-soon-title">MORE REVIEWS COMING SOON</h2>
          <p className="coming-soon-text">
            We're constantly reviewing the latest releases. Check back regularly for fresh takes on hip-hop albums.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicReview;
