"use client";

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
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
          Politique de Confidentialité
        </h1>
        <p style={{ 
          fontFamily: 'monospace',
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#8a8578',
          marginBottom: '3rem'
        }}>
          Protection de vos données personnelles
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Section title="1. Éditeur et Hébergement">
            <p><strong>Éditeur :</strong> Webamax (Entreprise Individuelle), Martin Maxime</p>
            <p><strong>SIRET :</strong> 99073315600014</p>
            <p><strong>Siège :</strong> 9 rue chante coq, 74200 Thonon-les-Bains</p>
            <p><strong>E-mail :</strong> maximemartin510@gmail.com</p>
            <p><strong>Site web :</strong> <a href="https://www.webamax.fr" target="_blank" rel="noopener noreferrer">www.webamax.fr</a></p>
            <p style={{ marginTop: '1rem' }}><strong>Hébergement Frontend :</strong> Vercel Inc. (USA)</p>
            <p><strong>Hébergement Données & Auth :</strong> Supabase Inc.</p>
          </Section>

          <Section title="2. Données collectées">
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Pour le projet LSF</h4>
            <ul>
              <li><strong>Captures de landmarks gestuels :</strong> Coordonnées x,y,z des mains représentant des gestes en LSF, utilisées pour entraîner des modèles d'IA.</li>
            </ul>
            <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>Aucune donnée biométrique sensible n'est collectée.</p>

            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Pour l'utilisation du site</h4>
            <ul>
              <li><strong>Adresse e-mail :</strong> Collectée via Supabase Auth lors de l'enregistrement.</li>
              <li><strong>Mots de passe :</strong> Gérés de manière chiffrée par Supabase.</li>
              <li><strong>Cookies :</strong> Utilisés pour la gestion des sessions.</li>
            </ul>
          </Section>

          <Section title="3. Finalité de la collecte">
            <ul>
              <li><strong>Projet LSF :</strong> Développer des modèles d'IA pour la reconnaissance des gestes en LSF.</li>
              <li><strong>Site web :</strong> Fournir un accès sécurisé et gérer les comptes utilisateurs.</li>
            </ul>
          </Section>

          <Section title="4. Base légale du traitement">
            <ul>
              <li><strong>Votre consentement explicite</strong> (Article 6(1)(a) du RGPD)</li>
              <li><strong>L'exécution d'un contrat</strong> (Article 6(1)(b))</li>
            </ul>
          </Section>

          <Section title="5. Conservation des données">
            <ul>
              <li><strong>Données LSF :</strong> Conservées pour la durée nécessaire au projet.</li>
              <li><strong>Données du site :</strong> Conservées tant que votre compte reste actif.</li>
              <li><strong>Cookies de session :</strong> Expirent à la fin de votre session.</li>
            </ul>
          </Section>

          <Section title="6. Partage et protection">
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>Partage</h4>
            <ul>
              <li>Avec des chercheurs ou partenaires impliqués dans des projets éducatifs.</li>
              <li>Avec des prestataires techniques pour le fonctionnement du site.</li>
            </ul>
            
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', marginTop: '1rem', color: '#1a1a1a' }}>Sécurité</h4>
            <ul>
              <li>Chiffrement des mots de passe via Supabase.</li>
              <li>Infrastructure AWS sécurisée.</li>
              <li>Restriction d'accès aux personnes habilitées.</li>
            </ul>
          </Section>

          <Section title="7. Vos droits (RGPD)">
            <ul>
              <li><strong>Accès :</strong> Connaître les données que nous détenons.</li>
              <li><strong>Rectification :</strong> Corriger des données inexactes.</li>
              <li><strong>Suppression :</strong> Supprimer vos données ou votre compte.</li>
              <li><strong>Opposition :</strong> Refuser certains traitements.</li>
              <li><strong>Portabilité :</strong> Recevoir vos données dans un format structuré.</li>
              <li><strong>Limitation :</strong> Limiter le traitement de vos données.</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              Pour exercer ces droits, contactez-nous à <strong>maximemartin510@gmail.com</strong>
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>Nous utilisons uniquement des cookies essentiels pour :</p>
            <ul>
              <li>La gestion de votre session d'authentification</li>
              <li>Le stockage de vos préférences de consentement</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>Aucun cookie publicitaire ou de tracking n'est utilisé.</p>
          </Section>

          <Section title="9. Contact">
            <p>Pour toute question concernant vos données personnelles :</p>
            <p><strong>Email :</strong> maximemartin510@gmail.com</p>
            <p style={{ marginTop: '1rem' }}>
              Vous pouvez également déposer une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
            </p>
          </Section>

          <Section title="10. À propos de Webamax">
            <p style={{ marginBottom: '1rem' }}>Cette plateforme a été développée par Webamax, spécialiste en solutions d'intelligence artificielle et en sécurité informatique.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              <a href="https://www.webamax.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed' }}>
                Accueil Webamax
              </a>
              <a href="https://www.webamax.fr/applications-metiers" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed' }}>
                Expertise IA
              </a>
              <a href="https://www.webamax.fr/audit-securite" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed' }}>
                Audit & Sécurité
              </a>
            </div>
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
          <Link href="/mentions-legales" style={{
            padding: '0.75rem 1.5rem',
            border: '1.5px solid #1a1a1a',
            background: 'transparent',
            color: '#1a1a1a',
            fontWeight: 500,
            textDecoration: 'none'
          }}>
            Mentions Légales
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
        
        // Style les éléments enfants
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

export default PrivacyPolicy;
