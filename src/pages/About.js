import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Page.css';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('story');

  const sections = [
    { id: 'story', label: 'MY STORY', icon: '📰' },
    { id: 'why', label: 'WHY I DO THIS', icon: '🎵' },
    { id: 'future', label: 'THE VISION', icon: '🚀' }
  ];

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
          <h1 className="page-title about-title">THE MENTAL GAME CHRONICLE</h1>
          <div className="newspaper-subtitle">EXCLUSIVE: INSIDE THE MIND BEHIND THE BRAND</div>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="tabs-container">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tab-icon">{section.icon}</span>
              <span className="tab-label">{section.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="about-content">
          {activeSection === 'story' && (
            <motion.div
              className="content-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="article-column">
                <h2 className="section-heading">MY STORY</h2>
                <div className="article-divider"></div>
                <p className="article-text">
                  <span className="drop-cap">I</span>t all started with a passion for music that
                  couldn't be contained. Growing up, I was always that person who discovered new
                  artists before they blew up, the one curating playlists that became the soundtrack
                  to everyone's lives.
                </p>
                <p className="article-text">
                  Mental Game wasn't born from a business plan—it came from late-night conversations
                  about underground artists who deserved more recognition, from countless hours
                  analyzing lyrics and production, from the belief that music journalism could be
                  more raw, more real, more honest.
                </p>
                <blockquote className="pull-quote">
                  "This isn't just content creation—this is cultural documentation."
                </blockquote>
                <p className="article-text">
                  Every interview, every review, every piece of content is crafted with the same
                  energy I bring to discovering music: curiosity, authenticity, and a deep respect
                  for the art form.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === 'why' && (
            <motion.div
              className="content-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="article-column">
                <h2 className="section-heading">WHY I DO WHAT I DO</h2>
                <div className="article-divider"></div>
                <p className="article-text">
                  <span className="drop-cap">M</span>usic has the power to change lives. I've seen
                  it firsthand—how the right song at the right moment can shift your entire perspective.
                  But too often, incredible artists go unheard because they don't fit the mainstream mold.
                </p>

                <div className="stats-grid">
                  <div className="stat-box">
                    <div className="stat-number">100+</div>
                    <div className="stat-label">HOURS OF CONTENT</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">PASSION</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">MUSIC MINDSET</div>
                  </div>
                </div>

                <p className="article-text">
                  Mental Game exists to bridge that gap. To give artists a platform where their
                  stories are told authentically. To create a community where music lovers can
                  discover their next obsession. To prove that independent media can compete with
                  the big players when it's driven by genuine passion.
                </p>
                <p className="article-text">
                  This is more than just interviews and reviews—it's about building a movement,
                  creating a cultural archive, and championing the voices that deserve to be heard.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === 'future' && (
            <motion.div
              className="content-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="article-column">
                <h2 className="section-heading">THE VISION</h2>
                <div className="article-divider"></div>
                <p className="article-text">
                  <span className="drop-cap">T</span>he future of Mental Game is bigger than just
                  content. I'm building towards becoming a recognized voice in music media—someone
                  artists want to work with, brands want to partner with, and fans trust for
                  authentic recommendations.
                </p>

                <div className="vision-list">
                  <div className="vision-item">
                    <div className="vision-icon">🎤</div>
                    <div className="vision-content">
                      <h3 className="vision-title">MAJOR INDUSTRY PARTNERSHIPS</h3>
                      <p className="vision-desc">Collaborating with record labels, festivals, and brands</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-icon">🎬</div>
                    <div className="vision-content">
                      <h3 className="vision-title">DOCUMENTARY-STYLE CONTENT</h3>
                      <p className="vision-desc">Deep-dive stories that go beyond the surface</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-icon">🌍</div>
                    <div className="vision-content">
                      <h3 className="vision-title">GLOBAL REACH</h3>
                      <p className="vision-desc">Covering emerging scenes from around the world</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-icon">💼</div>
                    <div className="vision-content">
                      <h3 className="vision-title">INDUSTRY OPPORTUNITIES</h3>
                      <p className="vision-desc">Landing internships and positions at major media companies</p>
                    </div>
                  </div>
                </div>

                <blockquote className="pull-quote">
                  "The goal isn't just to cover culture—it's to shape it."
                </blockquote>

                <p className="article-text">
                  This is just the beginning. Every interview, every connection, every piece of
                  content is a building block towards something much larger. Mental Game will be
                  a household name in music media—mark my words.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
