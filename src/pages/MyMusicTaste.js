import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './MyMusicTaste.css';

const MyMusicTaste = () => {
  const navigate = useNavigate();

  // Top artists with explanations
  const topArtists = [
    {
      rank: 1,
      name: 'KENDRICK LAMAR',
      reason: 'The most complete artist in hip-hop. Every project is a cultural moment. His ability to blend conscious commentary with hard-hitting beats is unmatched. GKMC changed my life.'
    },
    {
      rank: 2,
      name: 'J. COLE',
      reason: 'Relatable storytelling and technical excellence. Cole\'s bars resonate on a personal level. From Forest Hills to Off-Season, he\'s consistently delivered quality without compromise.'
    },
    {
      rank: 3,
      name: 'KANYE WEST',
      reason: 'Visionary production and fearless creativity. Ye redefined what hip-hop could sound like multiple times over. MBDTF and College Dropout are timeless masterpieces.'
    },
    {
      rank: 4,
      name: 'DRAKE',
      reason: 'Master of melodies and versatility. Drake understands how to craft hits while keeping authenticity. Take Care still hits different on late nights.'
    },
    {
      rank: 5,
      name: 'TRAVIS SCOTT',
      reason: 'Atmospheric production and incredible energy. Travis creates immersive sonic experiences. Rodeo and Astroworld showcase his unique artistic vision.'
    }
  ];

  // Power ranking - Current rotation
  const powerRanking = [
    { rank: 1, song: 'United in Grief', artist: 'Kendrick Lamar', album: 'Mr. Morale & The Big Steppers', status: 'up' },
    { rank: 2, song: 'FE!N', artist: 'Travis Scott ft. Playboi Carti', album: 'UTOPIA', status: 'same' },
    { rank: 3, song: 'Prada', artist: 'Cassö, RAYE, D-Block Europe', album: 'Single', status: 'new' },
    { rank: 4, song: 'WAIT FOR U', artist: 'Future ft. Drake & Tems', album: 'I NEVER LIKED YOU', status: 'down' },
    { rank: 5, song: 'Rich Baby Daddy', artist: 'Drake ft. Sexyy Red & SZA', album: 'For All The Dogs', status: 'up' },
    { rank: 6, song: 'First Person Shooter', artist: 'Drake ft. J. Cole', album: 'For All The Dogs', status: 'down' },
    { rank: 7, song: 'SICKO MODE', artist: 'Travis Scott', album: 'ASTROWORLD', status: 'same' },
    { rank: 8, song: 'm.A.A.d city', artist: 'Kendrick Lamar', album: 'good kid, m.A.A.d city', status: 'up' },
    { rank: 9, song: 'No Role Modelz', artist: 'J. Cole', album: '2014 Forest Hills Drive', status: 'same' },
    { rank: 10, song: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', status: 'new' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'new': return '★';
      default: return '—';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'up': return 'status-up';
      case 'down': return 'status-down';
      case 'new': return 'status-new';
      default: return 'status-same';
    }
  };

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

        {/* Two Column Layout */}
        <div className="taste-main-content">
          {/* Top Artists Section */}
          <div className="taste-section artists-section">
            <div className="section-header">
              <h2 className="section-title">TOP 5 ARTISTS</h2>
              <div className="section-subtitle">WHO I KEEP ON REPEAT & WHY</div>
            </div>

            <div className="artists-list">
              {topArtists.map((artist, index) => (
                <motion.div
                  key={artist.rank}
                  className="artist-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="artist-rank-circle">{artist.rank}</div>
                  <div className="artist-content">
                    <h3 className="artist-name">{artist.name}</h3>
                    <p className="artist-reason">{artist.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Power Ranking Section */}
          <div className="taste-section ranking-section">
            <div className="section-header">
              <h2 className="section-title">POWER RANKING</h2>
              <div className="section-subtitle">TOP 10 IN ROTATION RIGHT NOW</div>
            </div>

            <div className="ranking-legend">
              <span className="legend-item"><span className="legend-icon status-up">↑</span> MOVING UP</span>
              <span className="legend-item"><span className="legend-icon status-down">↓</span> MOVING DOWN</span>
              <span className="legend-item"><span className="legend-icon status-new">★</span> NEW ENTRY</span>
              <span className="legend-item"><span className="legend-icon status-same">—</span> HOLDING</span>
            </div>

            <div className="ranking-list">
              {powerRanking.map((track, index) => (
                <motion.div
                  key={track.rank}
                  className="ranking-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="ranking-left">
                    <div className="ranking-number">{track.rank}</div>
                    <div className={`ranking-status ${getStatusClass(track.status)}`}>
                      {getStatusIcon(track.status)}
                    </div>
                  </div>
                  <div className="ranking-info">
                    <div className="ranking-song">{track.song}</div>
                    <div className="ranking-artist">{track.artist}</div>
                    <div className="ranking-album">{track.album}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

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
