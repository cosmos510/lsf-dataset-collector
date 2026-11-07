'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeaderWithButtons({ onShowRegister }) {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    if (onShowRegister) onShowRegister();
    else signIn('google');
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'var(--color-dark)' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'var(--color-accent)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>LSF Dataset</span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <a href="#comment-ca-marche" className="link">Comment ça marche</a>
            <a href="#progression" className="link">Progression</a>
            <Link href="/privacy" className="link">Confidentialité</Link>
          </div>

          {/* Auth */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {status === 'loading' ? (
              <div style={{ width: '100px', height: '40px', background: 'var(--color-alt)', borderRadius: '4px' }} />
            ) : session ? (
              <>
                <Link href="/capture" className="btn btn-primary">Capturer</Link>
                <button onClick={() => signOut()} className="btn btn-outline">Déconnexion</button>
              </>
            ) : (
              <button onClick={handleLoginClick} className="btn btn-primary">Se connecter</button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--color-dark)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--color-cream)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 99
        }}>
          <a href="#comment-ca-marche" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-dark)', textDecoration: 'none', padding: '1rem 0', borderBottom: '1px solid var(--color-alt)' }}>
            Comment ça marche
          </a>
          <a href="#progression" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-dark)', textDecoration: 'none', padding: '1rem 0', borderBottom: '1px solid var(--color-alt)' }}>
            Progression
          </a>
          <Link href="/privacy" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-dark)', textDecoration: 'none', padding: '1rem 0', borderBottom: '1px solid var(--color-alt)' }}>
            Confidentialité
          </Link>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {session ? (
              <>
                <Link href="/capture" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Capturer</Link>
                <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="btn btn-outline" style={{ justifyContent: 'center' }}>Déconnexion</button>
              </>
            ) : (
              <button onClick={() => { handleLoginClick(); setIsMobileMenuOpen(false); }} className="btn btn-primary" style={{ justifyContent: 'center' }}>Se connecter</button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
