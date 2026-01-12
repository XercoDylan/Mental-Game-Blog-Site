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
            bio: data.bio || 'Artist biography',
            genre: data.genre || 'Hip-Hop',
            musicSignificance: data.musicSignificance || 'Artist music significance',
            favoriteSongs: data.favoriteSongs || [],
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

        {/* Two Column Layout */}
        <div className="featured-main-content">
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

          {/* Content Column */}
          <div className="featured-content-column">
            {/* About This Artist Section */}
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="section-header">
                <h2 className="section-title">ABOUT THIS ARTIST</h2>
                <div className="section-subtitle">WHO THEY ARE & WHERE THEY CAME FROM</div>
              </div>
              <p className="section-text">{featuredArtist.bio}</p>
            </motion.div>

            {/* Music Significance Section */}
            <motion.div
              className="featured-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="section-header">
                <h2 className="section-title">MUSIC SIGNIFICANCE</h2>
                <div className="section-subtitle">WHY THIS ARTIST MATTERS</div>
              </div>
              <p className="section-text">{featuredArtist.musicSignificance}</p>
            </motion.div>

            {/* My Favorite Songs Section */}
            {featuredArtist.favoriteSongs && featuredArtist.favoriteSongs.length > 0 && (
              <motion.div
                className="featured-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="section-header">
                  <h2 className="section-title">MY FAVORITE SONGS</h2>
                  <div className="section-subtitle">ESSENTIAL TRACKS TO START WITH</div>
                </div>
                <div className="favorite-songs-list">
                  {featuredArtist.favoriteSongs.map((song, index) => (
                    <motion.div
                      key={index}
                      className="favorite-song-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    >
                      <div className="song-number">{index + 1}</div>
                      <div className="song-info">
                        <div className="song-title">{song.title || song}</div>
                        {song.reason && (
                          <div className="song-reason">{song.reason}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Featured;
