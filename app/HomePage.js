'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderWithButtons from './components/HeaderWithButtons';
import Footer from './components/Footer';
import TutorialModal from './components/TutorialModal';
import RegisterModal from './components/RegisterModal';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [showTutorial, setShowTutorial] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [letterStats, setLetterStats] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const TARGET_PER_LETTER = 1000;

  useEffect(() => {
    const fetchPhotoCount = async () => {
      try {
        const response = await fetch('/api/photo-count');
        const data = await response.json();
        if (data.success && data.data) {
          setLetterStats(data.data);
          const total = data.data.reduce((sum, item) => sum + (item.count || 0), 0);
          setTotalPhotos(total);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    fetchPhotoCount();
  }, []);

  const getLetterCount = (letter) => {
    const stat = letterStats.find(s => s.letter?.toUpperCase() === letter);
    return stat?.count || 0;
  };

  const getLetterProgress = (letter) => {
    const count = getLetterCount(letter);
    return Math.min((count / TARGET_PER_LETTER) * 100, 100);
  };

  const handleStartCapture = () => {
    if (status === 'authenticated') {
      setShowTutorial(true);
    } else {
      setShowRegister(true);
    }
  };

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <HeaderWithButtons onShowRegister={() => setShowRegister(true)} />
      
      {/* Hero Section */}
      <section className="pt-nav">
        <div className="container">
          <div style={{ padding: '4rem 0 6rem' }}>
            {/* Badge */}
            <div className="hero-animate hero-animate-1 mb-md">
              <span className="badge">
                <span className="dot"></span>
                Projet collaboratif
              </span>
            </div>
            
            {/* Titre XXL - Soft Brutalism */}
            <h1 className="hero-animate hero-animate-2 mb-lg" style={{ maxWidth: '1000px' }}>
              <span className="display">Contribuez à</span>
              <br />
              <span className="display">la <span className="display-accent">langue</span></span>
              <br />
              <span className="display display-outline">des signes</span>
            </h1>
            
            {/* Description */}
            <p className="body-lg hero-animate hero-animate-3 mb-lg" style={{ maxWidth: '550px' }}>
              Participez à la création d'un dataset open source pour l'apprentissage 
              automatique de la Langue des Signes Française.
            </p>
            
            {/* CTA */}
            <div className="hero-animate hero-animate-4 flex flex-wrap gap-sm">
              <button onClick={handleStartCapture} className="btn btn-primary btn-lg">
                Commencer à contribuer
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a href="#progression" className="btn btn-outline btn-lg">
                Voir la progression
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{totalPhotos.toLocaleString()}</div>
              <div className="stat-label">Photos collectées</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">26</div>
              <div className="stat-label">Lettres</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Open source</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--color-accent)' }}>Gratuit</div>
              <div className="stat-label">Pour tous</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progression par lettre */}
      <section id="progression" style={{ padding: '4rem 0', background: 'var(--color-alt)' }}>
        <div className="container">
          <div className="text-center mb-xl">
            <span className="caption mb-sm" style={{ display: 'block' }}>Avancement en temps réel</span>
            <h2 className="headline">Progression par lettre</h2>
          </div>
          
          <div className="letter-grid">
            {alphabet.map((letter) => {
              const count = getLetterCount(letter);
              const progress = getLetterProgress(letter);
              const isComplete = progress >= 100;
              
              return (
                <div key={letter} className={`letter-card ${isComplete ? 'complete' : ''}`}>
                  <div className="letter-char">{letter}</div>
                  <div className="letter-count">{count}</div>
                  <div className="letter-progress">
                    <div className="letter-progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Légende */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--color-accent)', borderRadius: '2px' }} />
              <span className="caption">Objectif atteint (1000+)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--color-cream)', border: 'var(--border)', borderRadius: '2px' }} />
              <span className="caption">En cours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-xl">
            <span className="caption mb-sm" style={{ display: 'block' }}>Comment ça marche</span>
            <h2 className="headline">Trois étapes simples</h2>
          </div>
          
          <div className="bento-grid">
            <div className="bento-card">
              <span className="caption mb-sm" style={{ display: 'block', color: 'var(--color-accent)' }}>01</span>
              <h3 className="title mb-sm">Connectez-vous</h3>
              <p className="body">Utilisez Google ou créez un compte email.</p>
            </div>
            
            <div className="bento-card">
              <span className="caption mb-sm" style={{ display: 'block', color: 'var(--color-accent)' }}>02</span>
              <h3 className="title mb-sm">Signez les lettres</h3>
              <p className="body">Reproduisez chaque lettre devant votre caméra.</p>
            </div>
            
            <div className="bento-card">
              <span className="caption mb-sm" style={{ display: 'block', color: 'var(--color-accent)' }}>03</span>
              <h3 className="title mb-sm">Contribuez</h3>
              <p className="body">Vos photos entraînent les modèles d'IA.</p>
            </div>
            
            <div className="bento-card bento-accent">
              <h3 className="title mb-sm">Votre impact</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>Chaque contribution améliore la reconnaissance de la LSF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi contribuer */}
      <section style={{ padding: '6rem 0', background: 'var(--color-alt)' }}>
        <div className="container">
          <div className="text-center mb-xl">
            <span className="caption mb-sm" style={{ display: 'block' }}>Pourquoi participer</span>
            <h2 className="headline">Un projet pour l'accessibilité</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-sm)' }}>
            <div className="card">
              <div className="icon-box mb-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="title mb-sm">Open Source</h3>
              <p className="body">Le dataset sera disponible gratuitement pour la recherche.</p>
            </div>
            
            <div className="card">
              <div className="icon-box mb-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="title mb-sm">Communauté</h3>
              <p className="body">Rejoignez une communauté engagée pour l'accessibilité.</p>
            </div>
            
            <div className="card">
              <div className="icon-box mb-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="title mb-sm">Impact réel</h3>
              <p className="body">Vos contributions créent des outils de traduction pour la LSF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div className="cta-box" style={{ borderRadius: 'var(--radius-lg)' }}>
            <h2 className="headline mb-md">Prêt à contribuer ?</h2>
            <p className="body-lg mb-lg" style={{ color: 'rgba(248, 244, 239, 0.8)', maxWidth: '500px', margin: '0 auto var(--space-lg)' }}>
              Chaque photo compte. Rejoignez le mouvement pour une technologie plus inclusive.
            </p>
            <button onClick={handleStartCapture} className="btn btn-lg" style={{ background: 'var(--color-cream)', color: 'var(--color-dark)', borderColor: 'var(--color-cream)' }}>
              Commencer maintenant
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}
