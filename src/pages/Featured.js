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
            name: data.name || 'Featured Name',
            subtitle: data.subtitle || '',
            image1Url: data.image1Url || '',
            image2Url: data.image2Url || '',
            intro: data.intro || '',
            section1Title: data.section1Title || 'THE STORY',
            section1Subtitle: data.section1Subtitle || '',
            section1Text: data.section1Text || '',
            section2Title: data.section2Title || 'THE EXPERIENCE',
            section2Subtitle: data.section2Subtitle || '',
            section2Text: data.section2Text || '',
            section3Title: data.section3Title || 'THE TAKEAWAY',
            section3Subtitle: data.section3Subtitle || '',
            section3Text: data.section3Text || '',
            link1Url: data.link1Url || '',
            link1Label: data.link1Label || '',
            link2Url: data.link2Url || '',
            link2Label: data.link2Label || ''
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
            <h1 className="page-title">FEATURED FIGURE</h1>
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
            <h1 className="page-title">FEATURED FIGURE</h1>
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
          <div className="featured-header-top">FEATURED FIGURE</div>
          <h1 className="page-title featured-title">{featuredArtist.name.toUpperCase()}</h1>
          {featuredArtist.subtitle && (
            <div className="featured-header-subtitle">{featuredArtist.subtitle}</div>
          )}
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
        </div>

        {/* Intro Text */}
        {featuredArtist.intro && (
          <motion.div
            className="featured-intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="intro-text">{featuredArtist.intro}</p>
          </motion.div>
        )}

        {/* Story Content */}
        <div className="featured-story-content">
          {/* Section 1 */}
          {featuredArtist.section1Text && (
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="section-header">
                <h2 className="section-title">{featuredArtist.section1Title}</h2>
                {featuredArtist.section1Subtitle && (
                  <div className="section-subtitle">{featuredArtist.section1Subtitle}</div>
                )}
              </div>
              <div className="section-text-content">
                {featuredArtist.section1Text.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && <p key={idx} className="section-text">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Section 2 */}
          {featuredArtist.section2Text && (
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="section-header">
                <h2 className="section-title">{featuredArtist.section2Title}</h2>
                {featuredArtist.section2Subtitle && (
                  <div className="section-subtitle">{featuredArtist.section2Subtitle}</div>
                )}
              </div>
              <div className="section-text-content">
                {featuredArtist.section2Text.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && <p key={idx} className="section-text">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Section 3 */}
          {featuredArtist.section3Text && (
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="section-header">
                <h2 className="section-title">{featuredArtist.section3Title}</h2>
                {featuredArtist.section3Subtitle && (
                  <div className="section-subtitle">{featuredArtist.section3Subtitle}</div>
                )}
              </div>
              <div className="section-text-content">
                {featuredArtist.section3Text.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && <p key={idx} className="section-text">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links Section */}
          {(featuredArtist.link1Url || featuredArtist.link2Url) && (
            <motion.div
              className="featured-section streaming-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="section-header">
                <h2 className="section-title">LEARN MORE</h2>
                <div className="section-subtitle">CONNECT WITH {featuredArtist.name.toUpperCase()}</div>
              </div>
              <div className="streaming-buttons-row">
                {featuredArtist.link1Url && (
                  <a
                    href={featuredArtist.link1Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-button"
                  >
                    {featuredArtist.link1Label || 'LINK 1'} →
                  </a>
                )}
                {featuredArtist.link2Url && (
                  <a
                    href={featuredArtist.link2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-button"
                  >
                    {featuredArtist.link2Label || 'LINK 2'} →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>

                <div className="featured-images-row">
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
      </div>
    </motion.div>
  );
};

export default Featured;
