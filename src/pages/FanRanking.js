import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth, onAuthStateChanged } from '../firebase';
import './Page.css';
import './FanRanking.css';

const FanRanking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [userRankings, setUserRankings] = useState([]);
  const [selectedRappers, setSelectedRappers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [hasUserRanked, setHasUserRanked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch nominees
        const nomineesCollection = collection(db, 'nominations');
        const nomineesQuery = query(nomineesCollection, orderBy('name', 'asc'));
        const nomineesSnapshot = await getDocs(nomineesQuery);

        const nomineesList = nomineesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Rapper Name',
            image: data.image || '',
            monthNominated: data.monthNominated || ''
          };
        });

        // Fetch all user rankings
        const rankingsCollection = collection(db, 'fanrankings');
        const rankingsQuery = query(rankingsCollection, orderBy('timestamp', 'desc'));
        const rankingsSnapshot = await getDocs(rankingsQuery);

        const rankingsList = rankingsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userPhoto: data.userPhoto,
            rankings: data.rankings || [],
            month: data.month,
            timestamp: data.timestamp,
            likes: data.likes || 0
          };
        });

        setNominees(nomineesList);
        setUserRankings(rankingsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fan ranking data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Check if user has already submitted a ranking
      if (currentUser) {
        const fetchRankings = async () => {
          const rankingsCollection = collection(db, 'fanrankings');
          const rankingsSnapshot = await getDocs(rankingsCollection);
          const userHasRanked = rankingsSnapshot.docs.some(
            doc => doc.data().userId === currentUser.uid
          );
          setHasUserRanked(userHasRanked);
        };
        fetchRankings();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectRapper = (rapper) => {
    if (selectedRappers.find(r => r.id === rapper.id)) {
      // Deselect rapper
      setSelectedRappers(selectedRappers.filter(r => r.id !== rapper.id));
    } else if (selectedRappers.length < 5) {
      // Add rapper to selection
      setSelectedRappers([...selectedRappers, rapper]);
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newRankings = [...selectedRappers];
    [newRankings[index - 1], newRankings[index]] = [newRankings[index], newRankings[index - 1]];
    setSelectedRappers(newRankings);
  };

  const handleMoveDown = (index) => {
    if (index === selectedRappers.length - 1) return;
    const newRankings = [...selectedRappers];
    [newRankings[index], newRankings[index + 1]] = [newRankings[index + 1], newRankings[index]];
    setSelectedRappers(newRankings);
  };

  const handleSubmitRanking = async () => {
    if (!user || selectedRappers.length !== 5) return;

    try {
      const rankingsCollection = collection(db, 'fanrankings');
      const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

      await addDoc(rankingsCollection, {
        userId: user.uid,
        userName: user.providerData?.[0]?.displayName || user.displayName || 'Anonymous',
        userPhoto: user.photoURL || user.providerData?.[0]?.photoURL || '',
        rankings: selectedRappers.map((rapper, index) => ({
          rank: index + 1,
          name: rapper.name,
          image: rapper.image
        })),
        month: currentMonth,
        timestamp: serverTimestamp(),
        likes: 0
      });

      // Refresh rankings
      const rankingsQuery = query(rankingsCollection, orderBy('timestamp', 'desc'));
      const rankingsSnapshot = await getDocs(rankingsQuery);
      const rankingsList = rankingsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          userName: data.userName,
          userPhoto: data.userPhoto,
          rankings: data.rankings || [],
          month: data.month,
          timestamp: data.timestamp,
          likes: data.likes || 0
        };
      });

      setUserRankings(rankingsList);
      setSelectedRappers([]);
      setShowCreateForm(false);
      setHasUserRanked(true);
    } catch (error) {
      console.error('Error submitting ranking:', error);
    }
  };

  if (loading) {
    return (
      <motion.div
        className="page-container fan-ranking-page"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← BACK TO HOME
        </button>

        <div className="page-content">
          <div className="ranking-header">
            <div className="ranking-header-top">COMMUNITY VOICE</div>
            <h1 className="page-title ranking-title">FAN RANKING</h1>
            <div className="ranking-header-subtitle">Loading...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="page-container fan-ranking-page"
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
        <div className="ranking-header">
          <div className="ranking-header-top">COMMUNITY VOICE</div>
          <h1 className="page-title ranking-title">FAN RANKING</h1>
          <div className="ranking-header-subtitle">
            {nominees.length > 0 && nominees[0].monthNominated
              ? `${nominees[0].monthNominated.toUpperCase()} NOMINATIONS`
              : 'VOTE FOR YOUR TOP 5'}
          </div>
        </div>

        {/* Create Ranking Section */}
        {!showCreateForm ? (
          <div className="create-ranking-prompt">
            <div className="prompt-content">
              <h2 className="prompt-title">CAST YOUR VOTE</h2>
              <p className="prompt-text">
                {!user
                  ? 'Log in with Discord on the homepage to create your own top 5 ranking!'
                  : hasUserRanked
                  ? 'You have already submitted your ranking for this month. Check out what others are voting for below!'
                  : 'Select your top 5 rappers from this month\'s nominees and rank them in order!'}
              </p>
              {user && !hasUserRanked && (
                <button
                  className="create-ranking-button"
                  onClick={() => setShowCreateForm(true)}
                >
                  CREATE MY RANKING
                </button>
              )}
              {!user && (
                <button
                  className="go-home-button"
                  onClick={() => navigate('/')}
                >
                  GO TO HOMEPAGE
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="create-ranking-section">
            <div className="section-header">
              <h2 className="section-title">CREATE YOUR TOP 5</h2>
              <div className="section-subtitle">
                SELECT 5 RAPPERS & RANK THEM IN ORDER ({selectedRappers.length}/5)
              </div>
            </div>

            {/* Nominees Grid */}
            <div className="nominees-grid">
              {nominees.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem' }}>
                  No nominees found for this month.
                </p>
              ) : (
                nominees.map((nominee) => {
                  const isSelected = selectedRappers.find(r => r.id === nominee.id);
                  return (
                    <motion.div
                      key={nominee.id}
                      className={`nominee-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectRapper(nominee)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {nominee.image && (
                        <img
                          src={nominee.image}
                          alt={nominee.name}
                          className="nominee-image"
                        />
                      )}
                      <div className="nominee-name">{nominee.name}</div>
                      {isSelected && (
                        <div className="selected-badge">
                          ✓ #{selectedRappers.findIndex(r => r.id === nominee.id) + 1}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Selected Rankings */}
            {selectedRappers.length > 0 && (
              <div className="selected-rankings">
                <h3 className="selected-title">YOUR TOP 5</h3>
                <div className="selected-list">
                  {selectedRappers.map((rapper, index) => (
                    <div key={rapper.id} className="selected-item">
                      <div className="selected-rank">#{index + 1}</div>
                      {rapper.image && (
                        <img
                          src={rapper.image}
                          alt={rapper.name}
                          className="selected-image"
                        />
                      )}
                      <div className="selected-name">{rapper.name}</div>
                      <div className="selected-controls">
                        <button
                          className="move-button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          ▲
                        </button>
                        <button
                          className="move-button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === selectedRappers.length - 1}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="submit-section">
              <button
                className="submit-ranking-button"
                onClick={handleSubmitRanking}
                disabled={selectedRappers.length !== 5}
              >
                SUBMIT MY RANKING
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setShowCreateForm(false);
                  setSelectedRappers([]);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* Community Rankings Feed */}
        <div className="rankings-feed">
          <div className="section-header">
            <h2 className="section-title">COMMUNITY RANKINGS</h2>
            <div className="section-subtitle">
              SEE WHAT THE COMMUNITY IS VOTING FOR
            </div>
          </div>

          <div className="rankings-list">
            {userRankings.length === 0 ? (
              <p className="no-rankings">
                No rankings yet. Be the first to submit your top 5!
              </p>
            ) : (
              userRankings.map((ranking, index) => (
                <motion.div
                  key={ranking.id}
                  className="ranking-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="ranking-card-header">
                    <div className="ranking-user-info">
                      {ranking.userPhoto && (
                        <img
                          src={ranking.userPhoto}
                          alt={ranking.userName}
                          className="ranking-user-avatar"
                        />
                      )}
                      <div className="ranking-user-details">
                        <span className="ranking-user-name">{ranking.userName}</span>
                        <span className="ranking-timestamp">
                          {ranking.timestamp?.toDate?.().toLocaleDateString() || 'Just now'}
                        </span>
                      </div>
                    </div>
                    <div className="ranking-month-badge">{ranking.month}</div>
                  </div>

                  <div className="ranking-card-content">
                    {ranking.rankings.map((rapper, idx) => (
                      <div key={idx} className="ranking-entry">
                        <div className="ranking-entry-number">#{rapper.rank}</div>
                        {rapper.image && (
                          <img
                            src={rapper.image}
                            alt={rapper.name}
                            className="ranking-entry-image"
                          />
                        )}
                        <div className="ranking-entry-name">{rapper.name}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FanRanking;
