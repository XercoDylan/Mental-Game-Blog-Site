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
            genre: data.genre || 'Hip-Hop',
            image1Url: data.image1Url || '',
            image2Url: data.image2Url || '',
            story: data.story || 'Artist story',
            background: data.background || 'Artist background',
            impact: data.impact || 'Artist impact on music',
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
        {/* Header */}
        <div className="featured-header">
          <div className="featured-header-top">SPOTLIGHT SELECTION</div>
          <h1 className="page-title featured-title">FEATURED ARTIST</h1>
          <div className="featured-header-subtitle">{featuredArtist.name.toUpperCase()}</div>
        </div>

        {/* Artist Images Row */}
        <div className="featured-images-row">
          {featuredArtist.image1Url && (
            <motion.div
              className="featured-image-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={featuredArtist.image1Url}
                alt={`${featuredArtist.name} - Image 1`}
                className="featured-artist-image"
              />
            </motion.div>
          )}
          {featuredArtist.image2Url && (
            <motion.div
              className="featured-image-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src={featuredArtist.image2Url}
                alt={`${featuredArtist.name} - Image 2`}
                className="featured-artist-image"
              />
            </motion.div>
          )}
        </div>

        {/* Artist Story Content */}
        <div className="featured-story-content">
          {/* The Story Section */}
          <motion.div
            className="featured-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h2 className="section-title">THE STORY</h2>
              <div className="section-subtitle">THE JOURNEY OF {featuredArtist.name.toUpperCase()}</div>
            </div>
            <p className="section-text">{featuredArtist.story}</p>
          </motion.div>

          {/* Background Section */}
          <motion.div
            className="featured-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="section-header">
              <h2 className="section-title">BACKGROUND</h2>
              <div className="section-subtitle">WHERE THEY CAME FROM</div>
            </div>
            <p className="section-text">{featuredArtist.background}</p>
          </motion.div>

          {/* Impact Section */}
          <motion.div
            className="featured-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="section-header">
              <h2 className="section-title">IMPACT</h2>
              <div className="section-subtitle">WHY THIS ARTIST MATTERS</div>
            </div>
            <p className="section-text">{featuredArtist.impact}</p>
          </motion.div>

          {/* Streaming Links */}
          {(featuredArtist.spotifyLink || featuredArtist.appleMusicLink || featuredArtist.youtubeLink) && (
            <motion.div
              className="featured-section streaming-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="section-header">
                <h2 className="section-title">LISTEN NOW</h2>
                <div className="section-subtitle">STREAM {featuredArtist.name.toUpperCase()}'S MUSIC</div>
              </div>
              <div className="streaming-buttons-row">
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
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Featured;
