import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="page-container about-page"
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
        <div className="newspaper-header">
          <div className="newspaper-date">EST. 2024 • MUSIC • CULTURE • LIFESTYLE</div>
          <h1 className="page-title about-title">ABOUT MENTAL GAME</h1>
          <div className="newspaper-subtitle">WHERE CULTURE MEETS AUTHENTICITY</div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="about-main-content">
          {/* Left Column - Main Story */}
          <div className="about-column main-column">
            <div className="article-section">
              <h2 className="section-heading">WHO I AM</h2>
              <div className="article-divider"></div>
              <p className="article-text">
                <span className="drop-cap">M</span>y name is Evan Johnson, a media creative and psychology scholar exploring the mental and emotional worlds behind music, culture, and creative ambition. My work sits at the intersection of storytelling, research, and real human experience—focusing on how artists think, adapt, and grow in environments shaped by pressure, identity, and expectation.
              </p>
              <p className="article-text">
                I created Mental Game as a space for deeper conversations with musicians, creatives, and cultural leaders. Instead of surface-level interviews, I focus on mindset, motivation, resilience, and the psychological forces that shape creative careers. The goal is simple: to understand the people behind the art and give audiences a more honest look at what success really requires.
              </p>
            </div>

            <div className="article-section">
              <h2 className="section-heading">MY BACKGROUND</h2>
              <div className="article-divider"></div>
              <p className="article-text">
                When I created Mental Game, I was a junior at Morgan State University studying psychology. During that time, I earned multiple academic honors, including three appearances on the Dean's List for achieving a 4.0 GPA across three different semesters. Much of that success comes from my ability to think critically and listen deeply—skills that shape not only how I perform in academic and professional spaces, but also how I engage with music.
              </p>
              <blockquote className="pull-quote">
                "Understanding what you're hearing, why it feels the way it does, and what it reveals about the artist."
              </blockquote>
              <p className="article-text">
                I bring that same level of attention and analysis to every song, project, and artist I encounter. I'm especially interested in how artists communicate trauma, confidence, vulnerability, and ambition through sound, and how those emotional expressions reflect broader psychological and cultural patterns. My goal is for audiences to walk away with more than just an opinion on a song—to understand what they're hearing, why it feels the way it does, and what it reveals about the artist and the world around them.
              </p>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="about-column sidebar-column">
            <div className="info-box">
              <h3 className="info-box-title">WHAT I DO</h3>
              <div className="info-divider"></div>
              <ul className="info-list">
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Exclusive artist interviews</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">In-depth album reviews</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Music rankings & lists</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Cultural commentary</span>
                </li>
                <li className="info-item">
                  <span className="bullet">▸</span>
                  <span className="info-text">Emerging artist spotlights</span>
                </li>
              </ul>
            </div>

            <div className="info-box">
              <h3 className="info-box-title">MY VALUES</h3>
              <div className="info-divider"></div>
              <div className="value-item">
                <div className="value-number">01</div>
                <div className="value-content">
                  <h4 className="value-title">AUTHENTICITY</h4>
                  <p className="value-desc">No fake hype, just honest opinions</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">02</div>
                <div className="value-content">
                  <h4 className="value-title">INTEGRITY</h4>
                  <p className="value-desc">I can't be bought or influenced</p>
                </div>
              </div>
              <div className="value-item">
                <div className="value-number">03</div>
                <div className="value-content">
                  <h4 className="value-title">PASSION</h4>
                  <p className="value-desc">Driven by love for the culture</p>
                </div>
              </div>
            </div>

            <div className="info-box featured-box">
              <h3 className="info-box-title">THE VISION</h3>
              <div className="info-divider"></div>
              <p className="info-text">
                Building Mental Game into a trusted voice in music media—where artists want to be featured and fans come for real recommendations.
              </p>
              <p className="info-text">
                From interviews to documentaries, festival coverage to industry insights, I'm creating a comprehensive platform for hip-hop culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
