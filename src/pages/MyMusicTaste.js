import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth, onAuthStateChanged } from '../firebase';
import './Page.css';
import './MyMusicTaste.css';

const MyMusicTaste = () => {
  const navigate = useNavigate();
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top 5 artists with playlist data
        const top5Collection = collection(db, 'top5');
        const top5Query = query(top5Collection, orderBy('rank', 'asc'));
        const top5Snapshot = await getDocs(top5Query);

        const top5List = top5Snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            rank: data.rank || 0,
            name: data.name || 'Artist Name',
            reason: data.reason || 'Artist description',
            songUrl: data.songUrl || data.playlistUrl || '',
            imageUrl: data.imageUrl || ''
          };
        });

        setTopArtists(top5List);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching music taste data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('MyMusicTaste - Full user object:', currentUser);
        console.log('MyMusicTaste - displayName:', currentUser.displayName);
        console.log('MyMusicTaste - email:', currentUser.email);
        console.log('MyMusicTaste - photoURL:', currentUser.photoURL);
        console.log('MyMusicTaste - providerData:', currentUser.providerData);
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Extract Spotify track ID from URL
  const getSpotifyEmbedUrl = (spotifyUrl) => {
    if (!spotifyUrl) return null;

    // Extract track ID from various Spotify URL formats
    const trackMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
    if (trackMatch && trackMatch[1]) {
      return `https://open.spotify.com/embed/track/${trackMatch[1]}`;
    }

    // Also support playlist format if needed
    const playlistMatch = spotifyUrl.match(/playlist\/([a-zA-Z0-9]+)/);
    if (playlistMatch && playlistMatch[1]) {
      return `https://open.spotify.com/embed/playlist/${playlistMatch[1]}`;
    }

    return null;
  };

  if (loading) {
    return (
      <motion.div
        className="page-container music-taste-page"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← BACK TO HOME
        </button>

        <div className="page-content">
          <div className="taste-header">
            <div className="taste-header-top">PERSONAL PLAYLIST</div>
            <h1 className="page-title taste-title">MY MUSIC TASTE</h1>
            <div className="taste-header-subtitle">Loading...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="page-container music-taste-page"
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
        <div className="taste-header">
          <div className="taste-header-top">PERSONAL PLAYLIST</div>
          <h1 className="page-title taste-title">MY MUSIC TASTE</h1>
          <div className="taste-header-subtitle">THE ARTISTS & TRACKS THAT DEFINE MY SOUND</div>
        </div>

        {/* Artists with Playlists */}
        <div className="taste-main-content">
          {topArtists.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', gridColumn: '1 / -1' }}>
              No artists found. Add some to your Firestore database!
            </p>
          ) : (
            topArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                className="artist-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Artist Header */}
                <div className="artist-header">
                  <div className="artist-rank-badge">#{artist.rank}</div>
                  {artist.imageUrl && (
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="artist-image"
                    />
                  )}
                  <div className="artist-header-content">
                    <h2 className="artist-name-large">{artist.name}</h2>
                    <p className="artist-reason-text">{artist.reason}</p>
                  </div>
                </div>

                {/* Spotify Song Embed */}
                {artist.songUrl && getSpotifyEmbedUrl(artist.songUrl) ? (
                  <div className="playlist-container">
                    <div className="playlist-header">
                      <span className="playlist-icon">🎵</span>
                      <span className="playlist-title">FEATURED {artist.name.toUpperCase()} SONG</span>
                    </div>
                    <iframe
                      src={getSpotifyEmbedUrl(artist.songUrl)}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`${artist.name} song`}
                      className="spotify-embed"
                    ></iframe>
                  </div>
                ) : (
                  <div className="no-playlist">
                    <p>No song available for this artist yet</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* What I'm Listening To Section */}
        <motion.div
          className="listening-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="listening-header">
            <div className="listening-header-icon">🎧</div>
            <h2 className="listening-title">WHAT I'M LISTENING TO</h2>
            <div className="listening-subtitle">MY CURRENT ROTATION</div>
          </div>
          <div className="listening-playlist">
            <iframe
              src="https://open.spotify.com/embed/playlist/4QvjxMnEscSFhRDGXtSzfV?si=rAb67zmyR0S-Jr8wmYcAVw"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="What I'm listening to playlist"
              className="playlist-embed"
            ></iframe>
          </div>
          <p className="listening-description">
            A curated collection of tracks that are currently on repeat. This playlist evolves constantly as I discover new music and revisit old favorites.
          </p>
        </motion.div>

        {/* Bottom Note */}
        <div className="taste-note">
          <p className="note-text">
            This list changes weekly based on what I'm currently obsessed with.
            Follow my journey as I discover and rediscover the sounds that inspire my content.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MyMusicTaste;
