"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const TutorialModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Position de la main",
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 10-3 0m3 5a1.5 1.5 0 10-3 0m0-5a1.5 1.5 0 10-3 0m0 5a1.5 1.5 0 10-3 0m0-5v-2a1.5 1.5 0 10-3 0" />
        </svg>
      ),
      content: "Placez votre main face à la caméra. Le système détecte automatiquement 21 points de repère pour analyser votre geste.",
    },
    {
      number: "02",
      title: "Environnement idéal",
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
      content: "Assurez-vous d'avoir un éclairage direct et un arrière-plan neutre. Cela maximise la précision de l'extraction des données.",
    },
    {
      number: "03",
      title: "Capture en rafale",
      icon: (
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: "10 photos seront prises automatiquement. Variez légèrement l'angle de votre main entre chaque cliché pour enrichir le dataset.",
    },
  ];

  useEffect(() => {
    if (!isOpen) setCurrentStep(0);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextStep();
      if (e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, onClose]);

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleStartContribution = () => {
    onClose();
    router.push('/capture');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(26, 26, 26, 0.7)',
          backdropFilter: 'blur(4px)'
        }}
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        style={{
          position: 'relative',
          background: '#f8f4ef',
          border: '2px solid #1a1a1a',
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem 2rem',
          boxShadow: '8px 8px 0 #1a1a1a'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            background: '#1a1a1a',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#f8f4ef'
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#7c3aed'
          }}>
            Guide de capture
          </span>
        </div>

        {/* Step indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              aria-label={`Étape ${index + 1}`}
              style={{
                width: index === currentStep ? '48px' : '32px',
                height: '4px',
                background: index === currentStep ? '#7c3aed' : '#d4cfc6',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                background: '#7c3aed',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                {steps[currentStep].icon}
              </div>

              {/* Step number */}
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#7c3aed',
                marginBottom: '0.5rem'
              }}>
                Étape {steps[currentStep].number}
              </span>
              
              {/* Title */}
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                {steps[currentStep].title}
              </h2>
              
              {/* Description */}
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#4a4a4a',
                maxWidth: '380px'
              }}>
                {steps[currentStep].content}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1.5px solid #d4cfc6'
          }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                minWidth: '120px',
                padding: '0.875rem 1.5rem',
                background: 'transparent',
                border: '1.5px solid #1a1a1a',
                color: '#1a1a1a',
                fontWeight: 600,
                cursor: currentStep === 0 ? 'default' : 'pointer',
                opacity: currentStep === 0 ? 0 : 1,
                pointerEvents: currentStep === 0 ? 'none' : 'auto',
                transition: 'all 0.2s ease'
              }}
            >
              Précédent
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button 
                onClick={handleStartContribution} 
                style={{
                  minWidth: '140px',
                  padding: '0.875rem 1.5rem',
                  background: '#7c3aed',
                  border: '1.5px solid #7c3aed',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {session ? "Commencer" : "C'est parti !"}
              </button>
            ) : (
              <button 
                onClick={nextStep} 
                style={{
                  minWidth: '120px',
                  padding: '0.875rem 1.5rem',
                  background: '#1a1a1a',
                  border: '1.5px solid #1a1a1a',
                  color: '#f8f4ef',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorialModal;
