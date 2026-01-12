import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import './Page.css';
import './Featured.css';

const Featured = () => {
  const navigate = useNavigate();
  const [featuredArtist, setFeaturedArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArtist = async () => {
      try {
        const featuredCollection = collection(db, 'featured');
        const featuredQuery = query(featuredCollection, limit(1));
        const featuredSnapshot = await getDocs(featuredQuery);

        if (!featuredSnapshot.empty) {
          const data = featuredSnapshot.docs[0].data();
          setFeaturedArtist({
            id: featuredSnapshot.docs[0].id,
            name: data.name || 'Artist Name',
            album: data.album || 'Album Title',
            year: data.year || '2024',
            albumCover: data.albumCover || '',
            backgroundImage: data.backgroundImage || '',
            bio: data.bio || 'Artist biography',
            genre: data.genre || 'Hip-Hop',
            highlights: data.highlights || [],
            stats: data.stats || {},
            quote: data.quote || '',
            spotifyLink: data.spotifyLink || '',
            appleMusicLink: data.appleMusicLink || '',
            youtubeLink: data.youtubeLink || ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured artist:', error);
        setLoading(false);
      }
    };

    fetchFeaturedArtist();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="page-container featured-page"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← BACK TO HOME
        </button>

        <div className="page-content">
          <div className="featured-page-header">
            <h1 className="page-title">FEATURED ARTIST</h1>
            <p className="featured-subtitle">Loading featured artist...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!featuredArtist) {
    return (
      <motion.div
        className="page-container featured-page"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← BACK TO HOME
        </button>

        <div className="page-content">
          <div className="featured-page-header">
            <h1 className="page-title">FEATURED ARTIST</h1>
            <p className="featured-subtitle">No featured artist found.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="page-container featured-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={() => navigate('/')}>
        ← BACK TO HOME
      </button>

      <div className="page-content">
        {/* Hero Section */}
        <motion.div
          className="featured-hero"
          style={{ backgroundImage: `url(${featuredArtist.backgroundImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="featured-hero-overlay"></div>
          <div className="featured-hero-content">
            <motion.div
              className="featured-badge-large"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="badge-icon-large">⭐</span>
              <span className="badge-text-large">FEATURED THIS WEEK</span>
            </motion.div>

            <motion.h1
              className="featured-hero-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {featuredArtist.name}
            </motion.h1>

            <motion.div
              className="featured-hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="album-label-hero">NOW REVIEWING</span>
              <span className="album-title-hero">{featuredArtist.album}</span>
              <span className="year-hero">({featuredArtist.year})</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="featured-content-grid">
          {/* Album Cover Card */}
          <motion.div
            className="featured-album-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={featuredArtist.albumCover}
              alt={featuredArtist.album}
              className="featured-album-image"
            />
            <div className="album-card-info">
              <h3 className="album-card-title">{featuredArtist.album}</h3>
              <p className="album-card-artist">{featuredArtist.name}</p>
              <p className="album-card-genre">{featuredArtist.genre} • {featuredArtist.year}</p>
            </div>

            {/* Streaming Links */}
            {(featuredArtist.spotifyLink || featuredArtist.appleMusicLink || featuredArtist.youtubeLink) && (
              <div className="streaming-links">
                <p className="streaming-label">LISTEN NOW</p>
                {featuredArtist.spotifyLink && (
                  <a
                    href={featuredArtist.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-button spotify"
                  >
                    SPOTIFY →
                  </a>
                )}
                {featuredArtist.appleMusicLink && (
                  <a
                    href={featuredArtist.appleMusicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-button apple"
                  >
                    APPLE MUSIC →
                  </a>
                )}
                {featuredArtist.youtubeLink && (
                  <a
                    href={featuredArtist.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-button youtube"
                  >
                    YOUTUBE →
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Bio Section */}
          <motion.div
            className="featured-bio-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">ABOUT THE ARTIST</h2>
            <div className="bio-divider"></div>
            <p className="bio-text">{featuredArtist.bio}</p>

            {featuredArtist.quote && (
              <div className="featured-quote">
                <div className="quote-mark">"</div>
                <p className="quote-text">{featuredArtist.quote}</p>
                <p className="quote-author">— {featuredArtist.name}</p>
              </div>
            )}
          </motion.div>

          {/* Stats Section */}
          {featuredArtist.stats && Object.keys(featuredArtist.stats).length > 0 && (
            <motion.div
              className="featured-stats-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="section-title">BY THE NUMBERS</h2>
              <div className="bio-divider"></div>
              <div className="stats-grid">
                {Object.entries(featuredArtist.stats).map(([key, value], index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-value">{value}</div>
                    <div className="stat-label">{key}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Highlights Section */}
          {featuredArtist.highlights && featuredArtist.highlights.length > 0 && (
            <motion.div
              className="featured-highlights-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="section-title">ALBUM HIGHLIGHTS</h2>
              <div className="bio-divider"></div>
              <ul className="highlights-list">
                {featuredArtist.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="highlight-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    <span className="highlight-bullet">▸</span>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Featured;
