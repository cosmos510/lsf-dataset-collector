"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const isCookieAccepted = localStorage.getItem("cookieConsent");
      if (!isCookieAccepted) {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            zIndex: 100,
            maxWidth: '380px'
          }}
        >
          <div style={{
            background: '#f8f4ef',
            border: '1.5px solid #1a1a1a',
            padding: '1.5rem',
            boxShadow: '8px 8px 0 #1a1a1a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 style={{ 
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#1a1a1a'
              }}>
                Confidentialité
              </h4>
            </div>

            <p style={{ 
              fontSize: '0.875rem', 
              color: '#8a8578', 
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}>
              Nous utilisons des cookies pour optimiser votre expérience et garantir la sécurité de vos données.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleAccept}
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '0.75rem' }}
              >
                Accepter
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="btn btn-outline"
                style={{ flex: 1, justifyContent: 'center', padding: '0.75rem' }}
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
