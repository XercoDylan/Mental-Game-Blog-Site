import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db, auth, onAuthStateChanged, signInWithDiscord } from '../firebase';
import './Page.css';
import './MusicReview.css';

const MusicReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [newRating, setNewRating] = useState({});
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, 'musicreviewscomments');
        const commentsSnapshot = await getDocs(commentsCollection);

        const commentsByReview = {};
        commentsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          const reviewId = data.reviewId;

          if (!commentsByReview[reviewId]) {
            commentsByReview[reviewId] = [];
          }

          commentsByReview[reviewId].push({
            id: doc.id,
            userName: data.userName || 'Anonymous',
            userPhoto: data.userPhoto || '',
            rating: data.rating || 0,
            comment: data.comment || '',
            timestamp: data.timestamp
          });
        });

        setComments(commentsByReview);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitComment = async (reviewId) => {
    if (!user) {
      alert('Please log in with Discord to comment');
      return;
    }

    const rating = newRating[reviewId];
    const comment = newComment[reviewId];

    if (!rating || !comment || rating < 1 || rating > 10) {
      alert('Please provide a rating (1-10) and a comment');
      return;
    }

    try {
      const commentsCollection = collection(db, 'musicreviewscomments');
      await addDoc(commentsCollection, {
        reviewId: reviewId,
        userId: user.uid,
        userName: user.providerData?.[0]?.displayName || user.displayName || 'Anonymous',
        userPhoto: user.photoURL || user.providerData?.[0]?.photoURL || '',
        rating: parseInt(rating),
        comment: comment,
        timestamp: serverTimestamp()
      });

      // Update local comments state
      const newCommentObj = {
        userName: user.providerData?.[0]?.displayName || user.displayName || 'Anonymous',
        userPhoto: user.photoURL || user.providerData?.[0]?.photoURL || '',
        rating: parseInt(rating),
        comment: comment,
        timestamp: new Date()
      };

      setComments(prev => ({
        ...prev,
        [reviewId]: [...(prev[reviewId] || []), newCommentObj]
      }));

      // Clear inputs
      setNewRating(prev => ({ ...prev, [reviewId]: '' }));
      setNewComment(prev => ({ ...prev, [reviewId]: '' }));
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment');
    }
  };

  const toggleComments = (reviewId) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const handleLogin = async () => {
    try {
      await signInWithDiscord();
    } catch (error) {
      console.error('Error signing in with Discord:', error);
    }
  };

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

                  {/* Comments Section */}
                  <div className="comments-section">
                    <button
                      className="toggle-comments-btn"
                      onClick={() => toggleComments(review.id)}
                    >
                      {expandedReview === review.id ? '▼' : '▶'} USER REVIEWS ({comments[review.id]?.length || 0})
                    </button>

                    {expandedReview === review.id && (
                      <div className="comments-container">
                        {/* Add Comment Form */}
                        {user ? (
                          <div className="add-comment-form">
                            <div className="comment-form-header">
                              <img
                                src={user.photoURL || user.providerData?.[0]?.photoURL || 'https://via.placeholder.com/40'}
                                alt="Your profile"
                                className="comment-user-photo"
                              />
                              <span className="comment-user-name">
                                {user.providerData?.[0]?.displayName || user.displayName || 'You'}
                              </span>
                            </div>
                            <div className="rating-input-group">
                              <label className="rating-label">Your Rating:</label>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={newRating[review.id] || ''}
                                onChange={(e) => setNewRating(prev => ({ ...prev, [review.id]: e.target.value }))}
                                className="rating-input"
                                placeholder="1-10"
                              />
                              <span className="rating-scale-input">/10</span>
                            </div>
                            <textarea
                              value={newComment[review.id] || ''}
                              onChange={(e) => setNewComment(prev => ({ ...prev, [review.id]: e.target.value }))}
                              placeholder="Share your thoughts on this album..."
                              className="comment-textarea"
                              rows="3"
                            />
                            <button
                              onClick={() => handleSubmitComment(review.id)}
                              className="submit-comment-btn"
                            >
                              POST REVIEW
                            </button>
                          </div>
                        ) : (
                          <div className="login-prompt">
                            <p>Please log in with Discord to leave a review</p>
                            <button onClick={handleLogin} className="login-button">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="discord-icon-small">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                              </svg>
                              LOGIN WITH DISCORD
                            </button>
                          </div>
                        )}

                        {/* Comments List */}
                        <div className="comments-list">
                          {comments[review.id]?.length > 0 ? (
                            comments[review.id].map((comment, idx) => (
                              <div key={idx} className="comment-item">
                                <div className="comment-header">
                                  <img
                                    src={comment.userPhoto || 'https://via.placeholder.com/40'}
                                    alt={comment.userName}
                                    className="comment-user-photo"
                                  />
                                  <div className="comment-user-info">
                                    <span className="comment-user-name">{comment.userName}</span>
                                    <div className="comment-rating">
                                      <span className="comment-rating-number">{comment.rating}</span>
                                      <span className="comment-rating-scale">/10</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="comment-text">{comment.comment}</p>
                              </div>
                            ))
                          ) : (
                            <p className="no-comments">No user reviews yet. Be the first!</p>
                          )}
                        </div>
                      </div>
                    )}
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
