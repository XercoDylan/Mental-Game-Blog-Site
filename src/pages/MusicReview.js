import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Page.css';
import './MusicReview.css';

const MusicReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'reviews');
        const reviewSnapshot = await getDocs(reviewsCollection);

        const reviewList = reviewSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            artist: data.artist || 'Artist Name',
            album: data.album || 'Album Title',
            year: data.year || '2024',
            rating: data.rating || 0,
            genre: data.genre || 'Genre',
            reviewer: 'Evan J',
            date: data.date || 'Date',
            albumCover: data.albumCover || '',
            summary: data.summary || 'Review summary',
            verdict: data.verdict || 'Review verdict'
          };
        });

        setReviews(reviewList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
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
          <div className="review-header">
            <div className="review-header-top">MUSIC CRITIQUE</div>
            <h1 className="page-title review-title">ALBUM REVIEWS</h1>
            <div className="review-header-subtitle">Loading reviews...</div>
          </div>
        </div>
      </motion.div>
    );
  }

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
          {reviews.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', gridColumn: '1 / -1' }}>
              No reviews found. Add some to your Firestore database!
            </p>
          ) : (
            reviews.map((review, index) => (
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
            ))
          )}
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
