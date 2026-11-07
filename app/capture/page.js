"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { useSession } from "next-auth/react";
import confetti from "canvas-confetti"; 
import Link from "next/link";
import TutorialModal from "../components/TutorialModal";

export default function CapturePage() {
  const webcamRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [letter, setLetter] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const { data: session, status } = useSession();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && uploading && currentStep === 2) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, uploading, currentStep]);

  const handleUserMedia = useCallback(() => {
    setCameraReady(true);
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleCaptureClick = async () => {
    if (!letter) {
      setErrorMessage("Sélectionnez une lettre avant de commencer.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setCurrentStep(2);
    
    if (!webcamRef.current) return;
    setUploading(true);
    setCountdown(10);
    const capturedImages = [];

    for (let i = 0; i < 10; i++) {
      if (webcamRef.current) capturedImages.push(webcamRef.current.getScreenshot());
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setCurrentStep(3);
    try {
      const response = await fetch("/api/photo/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: capturedImages, letter, userId: session?.user?.id }),
      });
      
      if (response.ok) {
        triggerConfetti();
        setShowSuccess(true);
      } else {
        throw new Error("Erreur");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'enregistrement.");
      setShowError(true);
      setCurrentStep(1);
    } finally {
      setUploading(false);
      setCountdown(10);
    }
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="capture-page">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="success-card"
        >
          <div className="success-letter">{letter.toUpperCase()}</div>
          <h1 className="success-title">Séquence validée</h1>
          <p className="success-text">
            Tes 10 photos pour la lettre <strong>{letter.toUpperCase()}</strong> ont été ajoutées au dataset.
          </p>
          <div className="success-actions">
            <button 
              onClick={() => { setShowSuccess(false); setCurrentStep(1); setLetter(""); }}
              className="btn btn-primary"
            >
              Capturer une autre lettre
            </button>
            <Link href="/" className="btn btn-outline">
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>

        <style jsx>{`
          .capture-page {
            min-height: 100vh;
            background: #f8f4ef;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          }
          .success-card {
            background: #f8f4ef;
            border: 1.5px solid #1a1a1a;
            padding: 2.5rem;
            max-width: 420px;
            width: 100%;
            text-align: center;
          }
          .success-letter {
            width: 80px;
            height: 80px;
            background: #7c3aed;
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }
          .success-title {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #1a1a1a;
          }
          .success-text {
            color: #8a8578;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          .success-text strong {
            color: #7c3aed;
          }
          .success-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .success-actions .btn {
            width: 100%;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="capture-page">
      {/* Header */}
      <header className="capture-header">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            </svg>
          </div>
          <span>LSF Dataset</span>
        </Link>
        
        <button onClick={() => setIsTutorialOpen(true)} className="btn btn-outline btn-sm">
          Voir le tutoriel
        </button>
      </header>

      {/* Main Content */}
      <main className="capture-main">
        {/* Title */}
        <div className="capture-title">
          <h1>Enregistrement <span className="accent">LSF</span></h1>
          <p className="caption">Collecte de données pour l'IA</p>
        </div>

        {/* Progress */}
        <div className="progress-steps">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`progress-step ${currentStep >= s ? 'active' : ''}`} />
          ))}
        </div>

        {/* Error */}
        {showError && (
          <div className="error-message">{errorMessage}</div>
        )}

        {/* Grid */}
        <div className="capture-grid">
          {/* Webcam */}
          <div className="webcam-container">
            {!cameraReady && (
              <div className="webcam-loading">
                <div className="loading-spinner"></div>
                <span>Chargement de la caméra...</span>
              </div>
            )}
            <Webcam 
              ref={webcamRef} 
              audio={false} 
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              mirrored={true}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: cameraReady ? 1 : 0
              }} 
            />
            {uploading && (
              <div className="countdown-badge">{countdown}s</div>
            )}
          </div>

          {/* Controls */}
          <div className="controls">
            {/* Letter Selection */}
            <div className="letter-panel">
              <div className="letter-buttons">
                {[..."abcdefghijklmnopqrstuvwxyz"].map((char) => (
                  <button 
                    key={char} 
                    onClick={() => setLetter(char)} 
                    disabled={uploading} 
                    className={`letter-btn ${letter === char ? 'active' : ''}`}
                  >
                    {char.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="preview-box">
                {letter ? (
                  <motion.img 
                    key={letter} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    src={`/letters/${letter}.jpg`} 
                    alt={letter} 
                  />
                ) : (
                  <span className="preview-placeholder">Aperçu du signe</span>
                )}
              </div>
            </div>

            {/* Capture Button */}
            <button
              onClick={handleCaptureClick}
              disabled={uploading || !letter}
              className="btn btn-primary btn-lg capture-btn"
            >
              {uploading ? `Capture en cours... ${countdown}s` : 'Démarrer la capture'}
            </button>
          </div>
        </div>
      </main>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

      <style jsx>{`
        .capture-page {
          min-height: 100vh;
          background: #f8f4ef;
          padding: 1.5rem;
        }

        .capture-header {
          max-width: 1200px;
          margin: 0 auto 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1a1a1a;
          font-weight: 600;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: #7c3aed;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-sm {
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
        }

        .capture-main {
          max-width: 1200px;
          margin: 0 auto;
        }

        .capture-title {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .capture-title h1 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .capture-title .accent {
          color: #7c3aed;
        }

        .capture-title .caption {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #8a8578;
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .progress-step {
          height: 4px;
          width: 40px;
          background: #e0dbd4;
          transition: all 0.5s ease;
        }

        .progress-step.active {
          width: 80px;
          background: #7c3aed;
        }

        .error-message {
          max-width: 600px;
          margin: 0 auto 1.5rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1.5px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
          text-align: center;
        }

        .capture-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .webcam-container {
          border: 1.5px solid #1a1a1a;
          background: #1a1a1a;
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .webcam-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #f8f4ef;
          font-size: 0.875rem;
          z-index: 1;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: #7c3aed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .countdown-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #7c3aed;
          padding: 0.5rem 1rem;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          z-index: 10;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .letter-panel {
          background: #1a1a1a;
          padding: 1.5rem;
          border: 1.5px solid #1a1a1a;
        }

        .letter-buttons {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 0.375rem;
          margin-bottom: 1.5rem;
        }

        .letter-btn {
          aspect-ratio: 1;
          border: none;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
        }

        .letter-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.15);
          color: white;
        }

        .letter-btn.active {
          background: #7c3aed;
          color: white;
        }

        .letter-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .preview-box {
          aspect-ratio: 16/10;
          background: #2d2d2d;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #3a3a3a;
          overflow: hidden;
        }

        .preview-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1rem;
        }

        .preview-placeholder {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #8a8578;
        }

        .capture-btn {
          width: 100%;
          justify-content: center;
        }

        .capture-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .capture-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .letter-buttons {
            grid-template-columns: repeat(9, 1fr);
            gap: 0.25rem;
          }

          .letter-btn {
            font-size: 0.75rem;
          }

          .webcam-container {
            aspect-ratio: 4/3;
            max-height: 50vh;
          }

          .letter-panel {
            padding: 1rem;
          }

          .preview-box {
            aspect-ratio: 16/9;
          }
        }

        @media (max-width: 500px) {
          .capture-page {
            padding: 1rem;
          }

          .capture-header {
            margin-bottom: 1rem;
          }

          .capture-title {
            margin-bottom: 1rem;
          }

          .capture-title h1 {
            font-size: 1.25rem;
          }

          .progress-steps {
            margin-bottom: 1rem;
          }

          .letter-buttons {
            grid-template-columns: repeat(6, 1fr);
          }

          .webcam-container {
            aspect-ratio: 1/1;
            max-height: 40vh;
          }

          .controls {
            gap: 1rem;
          }

          .btn-lg {
            padding: 1rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
