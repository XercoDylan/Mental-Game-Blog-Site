import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Page.css';
import './Interview.css';

const Interview = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to extract YouTube video ID from various URL formats
  const extractVideoId = (url) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const interviewsCollection = collection(db, 'interviews');
        const interviewSnapshot = await getDocs(interviewsCollection);
        const interviewList = interviewSnapshot.docs.map(doc => {
          const data = doc.data();

          // Convert Firestore Timestamp to readable date string
          let sortDate = new Date(0);
          let dateString = 'Date';
          if (data.date) {
            if (data.date.toDate) {
              // It's a Firestore Timestamp
              sortDate = data.date.toDate();
              dateString = data.date.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            } else if (typeof data.date === 'string') {
              // It's already a string
              dateString = data.date;
              sortDate = new Date(data.date);
            }
          }

          return {
            id: extractVideoId(data.link) || doc.id,
            artist: data.artist || 'Artist Name',
            title: data.title || 'Interview Title',
            description: data.description || 'Interview description',
            date: dateString,
            sortDate: sortDate,
            tags: data.tags || [],
            link: data.link
          };
        });
        interviewList.sort((a, b) => b.sortDate - a.sortDate);
        setInterviews(interviewList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <motion.div
      className="page-container interview-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <button className="back-button" onClick={() => navigate('/')}>
        ← BACK TO HOME
      </button>

      <div className="page-content">
        {/* Page Header */}
        <div className="interview-header">
          <h1 className="page-title">EXCLUSIVE INTERVIEWS</h1>
          <p className="interview-subtitle">
            In-depth conversations with the artists shaping today's sound
          </p>
        </div>

        {/* Interviews Grid */}
        <div className="interviews-grid">
          {interviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              className="interview-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Video Embed */}
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${interview.id}`}
                  title={interview.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Interview Info */}
              <div className="interview-info">
                <div className="interview-meta">
                  <span className="interview-date">{interview.date}</span>
                  <span className="interview-artist">{interview.artist}</span>
                </div>

                <h2 className="interview-title">{interview.title}</h2>

                <p className="interview-description">{interview.description}</p>

                <div className="interview-tags">
                  {interview.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${interview.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-button"
                >
                  WATCH ON YOUTUBE →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h3 className="cta-title">MORE COMING SOON</h3>
          <p className="cta-text">
            Subscribe to our{' '}
            <a
              href="https://www.youtube.com/@MentalGameCo"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              YouTube channel
            </a>{' '}
            to never miss an interview.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Interview;
