import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './Interview.css';

const Interview = () => {
  const navigate = useNavigate();

  const interviews = [
    {
      id: 'xsP7EURF1-c',
      artist: 'Lelo',
      title: 'Lelo Opens Up About His Creative Process',
      description: 'In this exclusive sit-down, Lelo takes us through his journey in the music industry, sharing insights on his creative process, influences, and what drives him to create authentic music that resonates with fans worldwide.',
      date: 'December 2024',
      tags: ['Hip-Hop', 'Rising Artist', 'Studio Session']
    },
    {
      id: 'h1ptnbNO64k',
      artist: '1300 Saint',
      title: '1300 Saint: The Underground Sound',
      description: 'We caught up with 1300 Saint to discuss the evolution of underground hip-hop, his approach to production, and how he stays true to his artistic vision while navigating the modern music landscape.',
      date: 'December 2024',
      tags: ['Underground', 'Producer', 'Culture']
    },
    {
      id: 'w5qK8u-mSnQ',
      artist: 'Kai H',
      title: 'Kai H Breaks Down His Latest Project',
      description: 'Kai H joins us to break down his latest musical project, discussing the stories behind the tracks, his collaboration process, and the message he wants listeners to take away from his work.',
      date: 'November 2024',
      tags: ['New Release', 'Storytelling', 'Artist Talk']
    },
    {
      id: 'zHgoL23XLLY',
      artist: 'Nardo$ Reign',
      title: 'Nardo$ Reign: Building a Legacy',
      description: 'An in-depth conversation with Nardo$ Reign about building a lasting legacy in music, the challenges of staying independent, and his vision for the future of his career and the culture.',
      date: 'November 2024',
      tags: ['Legacy', 'Independent', 'Vision']
    }
  ];

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
