"use client";

import React from "react";
import Link from "next/link";

const MentionsLegales = () => {
  return (
    <div style={{ background: '#f8f4ef', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1.5px solid #1a1a1a',
        padding: '1rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#1a1a1a' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: '#7c3aed',
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
            <span style={{ fontWeight: 600 }}>LSF Dataset</span>
          </Link>
          
          <Link href="/" style={{
            padding: '0.625rem 1.25rem',
            border: '1.5px solid #1a1a1a',
            background: 'transparent',
            color: '#1a1a1a',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}>
            Retour
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          fontWeight: 600, 
          marginBottom: '0.5rem',
          color: '#1a1a1a',
          letterSpacing: '-0.02em'
        }}>
          Mentions Légales
        </h1>
        <p style={{ 
          fontFamily: 'monospace',
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#8a8578',
          marginBottom: '3rem'
        }}>
          Informations légales obligatoires
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Section title="1. Identification de l'éditeur">
            <p><strong>Raison sociale :</strong> Webamax (Entreprise Individuelle)</p>
            <p><strong>Responsable de la publication :</strong> Martin Maxime</p>
            <p><strong>SIRET :</strong> 99073315600014</p>
            <p><strong>Adresse :</strong> 9 rue chante coq, 74200 Thonon-les-Bains, France</p>
            <p><strong>Téléphone :</strong> Sur demande</p>
            <p><strong>E-mail :</strong> maximemartin510@gmail.com</p>
            <p><strong>Site web :</strong> <a href="https://www.webamax.fr" target="_blank" rel="noopener noreferrer">www.webamax.fr</a></p>
          </Section>

          <Section title="2. Hébergement">
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Frontend</h4>
            <p><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
            <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
            
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', marginTop: '1.5rem', color: '#1a1a1a' }}>Base de données et Authentification</h4>
            <p><strong>Hébergeur :</strong> Supabase Inc.</p>
            <p><strong>Site :</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>L'ensemble du contenu de ce site (textes, images, code source, design) est la propriété exclusive de Webamax ou de ses partenaires.</p>
            <p style={{ marginTop: '1rem' }}>Toute reproduction, représentation, modification ou exploitation non autorisée est interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
            <p style={{ marginTop: '1rem' }}><strong>Exception :</strong> Les données de landmarks gestuels collectées via ce site sont destinées à être partagées dans un cadre éducatif et de recherche.</p>
          </Section>

          <Section title="4. Limitation de responsabilité">
            <p>Webamax s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, elle ne peut garantir l'absence d'erreurs ou d'omissions.</p>
            <p style={{ marginTop: '1rem' }}>L'utilisateur est seul responsable de l'utilisation qu'il fait des informations et données disponibles sur ce site.</p>
            <p style={{ marginTop: '1rem' }}>Webamax ne pourra être tenue responsable :</p>
            <ul>
              <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
              <li>Des interruptions de service ou dysfonctionnements techniques</li>
              <li>De l'utilisation frauduleuse des données par des tiers</li>
            </ul>
          </Section>

          <Section title="5. Liens hypertextes">
            <p>Ce site peut contenir des liens vers d'autres sites web. Webamax n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
          </Section>

          <Section title="6. Droit applicable">
            <p>Les présentes mentions légales sont régies par le droit français.</p>
            <p style={{ marginTop: '1rem' }}>En cas de litige, les tribunaux français seront seuls compétents.</p>
          </Section>

          <Section title="7. Accessibilité">
            <p>Ce site s'efforce de respecter les standards d'accessibilité web (WCAG 2.1).</p>
            <p style={{ marginTop: '1rem' }}>Si vous rencontrez des difficultés d'accès, n'hésitez pas à nous contacter à <strong>maximemartin510@gmail.com</strong></p>
          </Section>

          <Section title="8. Mise à jour">
            <p>Les présentes mentions légales peuvent être modifiées à tout moment.</p>
            <p style={{ marginTop: '1rem' }}><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </Section>
        </div>

        {/* Navigation vers autres pages légales */}
        <div style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '1.5px solid #1a1a1a',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link href="/privacy" style={{
            padding: '0.75rem 1.5rem',
            border: '1.5px solid #1a1a1a',
            background: 'transparent',
            color: '#1a1a1a',
            fontWeight: 500,
            textDecoration: 'none'
          }}>
            Politique de Confidentialité
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1.5px solid #1a1a1a', 
        padding: '2rem 0',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#8a8578' }}>
            © {new Date().getFullYear()} LSF Dataset Creator — Webamax
          </p>
        </div>
      </footer>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section style={{ 
    background: '#f8f4ef',
    border: '1.5px solid #1a1a1a',
    padding: '1.5rem'
  }}>
    <h2 style={{ 
      fontSize: '1.25rem', 
      fontWeight: 600, 
      marginBottom: '1rem',
      color: '#1a1a1a'
    }}>
      {title}
    </h2>
    <div style={{ 
      color: '#2d2d2d',
      lineHeight: 1.7,
      fontSize: '0.9375rem'
    }}>
      {React.Children.map(children, child => {
        if (!child) return null;
        
        if (child.type === 'p') {
          return React.cloneElement(child, {
            style: { ...child.props.style, marginBottom: '0.5rem' }
          });
        }
        if (child.type === 'ul') {
          return (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {React.Children.map(child.props.children, li => {
                if (!li || li.type !== 'li') return li;
                return (
                  <li style={{ 
                    position: 'relative', 
                    paddingLeft: '1.25rem', 
                    marginBottom: '0.5rem' 
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.5em',
                      width: '6px',
                      height: '6px',
                      background: '#7c3aed'
                    }} />
                    {li.props.children}
                  </li>
                );
              })}
            </ul>
          );
        }
        if (child.type === 'a') {
          return React.cloneElement(child, {
            style: { ...child.props.style, color: '#7c3aed', textDecoration: 'none' }
          });
        }
        
        return child;
      })}
    </div>
  </section>
);

export default MentionsLegales;
