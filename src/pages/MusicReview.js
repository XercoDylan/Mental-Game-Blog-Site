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
      summary: 'Kendrick delivers his most introspective and experimental album to date, diving deep into therapy, trauma, and transformation. A bold artistic statement that challenges listeners.',
      highlights: ['United in Grief', 'N95', 'Father Time', 'Mother I Sober'],
      verdict: 'A masterclass in vulnerability and artistic evolution. Not easy listening, but essential.'
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
      summary: 'Tyler returns to his rap roots with luxurious production and confident bars. The album feels like a victory lap from an artist fully comfortable in his own skin.',
      highlights: ['LUMBERJACK', 'WUSYANAME', 'MASSA', 'SWEET / I THOUGHT YOU WANTED TO DANCE'],
      verdict: 'Tyler proves he can still rap his ass off while maintaining his signature sonic palette.'
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
      summary: 'Cole comes through with polished bars and production, showcasing technical prowess. Solid project but plays it safe compared to his more ambitious works.',
      highlights: ['95 south', 'amari', 'my life', 'hunger on hillside'],
      verdict: 'A technically impressive album that satisfies but doesn\'t quite reach his previous heights.'
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
              {/* Review Header */}
              <div className="review-card-header">
                <div className="review-meta">
                  <span className="review-genre">{review.genre}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-artist">{review.artist}</div>
                <div className="review-album">"{review.album}"</div>
                <div className="review-year">({review.year})</div>
              </div>

              {/* Rating Box */}
              <div className="rating-container">
                <div className="rating-box">
                  <div className="rating-number">{review.rating}</div>
                  <div className="rating-scale">/ 10</div>
                </div>
                <div className="rating-label">MENTAL GAME SCORE</div>
              </div>

              {/* Review Body */}
              <div className="review-body">
                <h3 className="review-section-title">THE TAKE</h3>
                <div className="review-divider"></div>
                <p className="review-summary">{review.summary}</p>

                <h3 className="review-section-title">STANDOUT TRACKS</h3>
                <div className="review-divider"></div>
                <ul className="review-highlights">
                  {review.highlights.map((track, idx) => (
                    <li key={idx} className="highlight-item">
                      <span className="track-bullet">♪</span>
                      <span className="track-name">{track}</span>
                    </li>
                  ))}
                </ul>

                <div className="review-verdict-box">
                  <div className="verdict-label">VERDICT</div>
                  <p className="verdict-text">{review.verdict}</p>
                </div>
              </div>

              {/* Review Footer */}
              <div className="review-footer">
                <div className="reviewer-info">
                  REVIEWED BY <span className="reviewer-name">{review.reviewer}</span>
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
