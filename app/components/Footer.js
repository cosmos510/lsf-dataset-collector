'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--space-lg)',
          paddingBottom: 'var(--space-xl)',
          borderBottom: '1px solid rgba(248, 244, 239, 0.1)'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--color-accent)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                </svg>
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-cream)' }}>LSF Dataset</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(248, 244, 239, 0.6)', maxWidth: '280px' }}>
              Projet collaboratif pour la création d'un dataset de la Langue des Signes Française.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-cream)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <li><Link href="/">Accueil</Link></li>
              <li><a href="#comment-ca-marche">Comment ça marche</a></li>
              <li><a href="#progression">Progression</a></li>
              <li><Link href="/capture">Contribuer</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-cream)' }}>Légal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <li><Link href="/privacy">Politique de Confidentialité</Link></li>
              <li><Link href="/mentions-legales">Mentions Légales</Link></li>
              <li><a href="mailto:maximemartin510@gmail.com">Contact</a></li>
            </ul>
          </div>

          {/* Webamax */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-cream)' }}>Webamax</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <li><a href="https://www.webamax.fr" target="_blank" rel="noopener noreferrer">Accueil</a></li>
              <li><a href="https://www.webamax.fr/applications-metiers" target="_blank" rel="noopener noreferrer">Applications Métiers</a></li>
              <li><a href="https://www.webamax.fr/audit-securite" target="_blank" rel="noopener noreferrer">Audit Sécurité</a></li>
              <li><a href="https://www.webamax.fr/creation-site-internet" target="_blank" rel="noopener noreferrer">Création Site Internet</a></li>
              <li><a href="https://www.webamax.fr/intelligence-artificielle" target="_blank" rel="noopener noreferrer">Intelligence Artificielle</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-sm)', paddingTop: 'var(--space-lg)' }}>
          <p style={{ fontSize: '0.875rem', color: 'rgba(248, 244, 239, 0.5)' }}>
            © {currentYear} LSF Dataset Creator
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(248, 244, 239, 0.5)' }}>
            Développé par <a href="https://www.webamax.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>Webamax</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
