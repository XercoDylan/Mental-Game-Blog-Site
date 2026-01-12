import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, onAuthStateChanged } from '../firebase';
import './Page.css';
import './MyMusicTaste.css';

const MyMusicTaste = () => {
  const navigate = useNavigate();
  const [topArtists, setTopArtists] = useState([]);
  const [powerRanking, setPowerRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top 5 artists
        const top5Collection = collection(db, 'top5');
        const top5Query = query(top5Collection, orderBy('rank', 'asc'));
        const top5Snapshot = await getDocs(top5Query);

        const top5List = top5Snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            rank: data.rank || 0,
            name: data.name || 'Artist Name',
            reason: data.reason || 'Artist description'
          };
        });

        // Fetch power ranking
        const rankingCollection = collection(db, 'ranking');
        const rankingQuery = query(rankingCollection, orderBy('rank', 'asc'));
        const rankingSnapshot = await getDocs(rankingQuery);

        const rankingList = rankingSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            rank: data.rank || 0,
            song: data.song || 'Song Title',
            artist: data.artist || 'Artist Name',
            album: data.album || 'Album Name',
            albumCover: data.albumCover || ''
          };
        });

        setTopArtists(top5List);
        setPowerRanking(rankingList);
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

  useEffect(() => {
    // Fetch comments when a song is selected
    const fetchComments = async () => {
      if (!selectedSong) return;

      try {
        const commentsCollection = collection(db, 'musictastecomments');
        const commentsQuery = query(
          commentsCollection,
          orderBy('timestamp', 'desc')
        );
        const commentsSnapshot = await getDocs(commentsQuery);

        const commentsList = commentsSnapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              songId: data.songId,
              comment: data.comment,
              userName: data.userName,
              userPhoto: data.userPhoto,
              userId: data.userId,
              timestamp: data.timestamp
            };
          })
          .filter(comment => comment.songId === selectedSong.id);

        setComments(commentsList);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [selectedSong]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !selectedSong) return;

    try {
      const commentsCollection = collection(db, 'musictastecomments');
      await addDoc(commentsCollection, {
        songId: selectedSong.id,
        comment: newComment.trim(),
        userName: user.providerData?.[0]?.displayName || user.displayName || 'Anonymous',
        userPhoto: user.photoURL || user.providerData?.[0]?.photoURL || '',
        userId: user.uid,
        timestamp: serverTimestamp()
      });

      // Refresh comments
      const commentsQuery = query(
        commentsCollection,
        orderBy('timestamp', 'desc')
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsList = commentsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            songId: data.songId,
            comment: data.comment,
            userName: data.userName,
            userPhoto: data.userPhoto,
            userId: data.userId,
            timestamp: data.timestamp
          };
        })
        .filter(comment => comment.songId === selectedSong.id);

      setComments(commentsList);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
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

        {/* Two Column Layout */}
        <div className="taste-main-content">
          {/* Top Artists Section */}
          <div className="taste-section artists-section">
            <div className="section-header">
              <h2 className="section-title">TOP 5 ARTISTS</h2>
              <div className="section-subtitle">WHO I KEEP ON REPEAT & WHY</div>
            </div>

            <div className="artists-list">
              {topArtists.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem' }}>
                  No artists found. Add some to your Firestore database!
                </p>
              ) : (
                topArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
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
                ))
              )}
            </div>
          </div>

          {/* Power Ranking Section */}
          <div className="taste-section ranking-section">
            <div className="section-header">
              <h2 className="section-title">POWER RANKING</h2>
              <div className="section-subtitle">TOP 10 IN ROTATION RIGHT NOW</div>
            </div>

            <div className="ranking-list">
              {powerRanking.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem' }}>
                  No rankings found. Add some to your Firestore database!
                </p>
              ) : (
                powerRanking.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`ranking-item ${selectedSong?.id === track.id ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedSong(track)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ranking-number">{track.rank}</div>
                    {track.albumCover && (
                      <img
                        src={track.albumCover}
                        alt={track.album}
                        className="ranking-album-cover"
                      />
                    )}
                    <div className="ranking-info">
                      <div className="ranking-song">{track.song}</div>
                      <div className="ranking-artist">{track.artist}</div>
                      <div className="ranking-album">{track.album}</div>
                    </div>
                    <div className="comment-indicator">
                      💬 Click to comment
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {selectedSong && (
          <motion.div
            className="comments-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="comments-header">
              <h2 className="section-title">COMMUNITY THOUGHTS</h2>
              <div className="comments-song-info">
                <span className="comments-song-name">{selectedSong.song}</span>
                <span className="comments-artist-name">by {selectedSong.artist}</span>
              </div>
            </div>

            {!user ? (
              <div className="login-prompt">
                <p className="login-prompt-text">
                  Please log in with Discord on the homepage to share your thoughts!
                </p>
                <button className="go-home-button" onClick={() => navigate('/')}>
                  GO TO HOMEPAGE
                </button>
              </div>
            ) : (
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <div className="comment-input-container">
                  <img
                    src={user.photoURL || user.providerData?.[0]?.photoURL || ''}
                    alt="Your avatar"
                    className="comment-user-avatar"
                    onError={(e) => {
                      console.log('Avatar failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <textarea
                    className="comment-input"
                    placeholder="Share your thoughts on this track..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="submit-comment-button"
                  disabled={!newComment.trim()}
                >
                  POST COMMENT
                </button>
              </form>
            )}

            <div className="comments-list">
              {comments.length === 0 ? (
                <p className="no-comments">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    className="comment-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <img
                      src={comment.userPhoto || ''}
                      alt={comment.userName}
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-user-name">{comment.userName}</span>
                        <span className="comment-timestamp">
                          {comment.timestamp?.toDate?.().toLocaleDateString() || 'Just now'}
                        </span>
                      </div>
                      <p className="comment-text">{comment.comment}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

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
