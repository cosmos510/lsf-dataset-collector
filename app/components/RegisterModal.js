"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterModal({ isOpen, onClose }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < minLength) return "Minimum 8 caractères requis.";
    if (!specialCharRegex.test(password)) return "Un caractère spécial est requis.";
    return null;
  };

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
    setLoading(false);
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.includes("unique constraint") ? "Cet utilisateur existe déjà." : data.error || 'Erreur lors de l\'inscription.');
        setLoading(false);
        return;
      }

      const loginRes = await signIn('credentials', { redirect: false, email, password });

      if (loginRes.error) {
        setIsLogin(true);
        setError("Compte créé ! Veuillez vous connecter.");
        setLoading(false);
        return;
      }

      setLoading(false);
      clearForm();
      onClose();
      router.refresh();
    } catch (err) {
      setError('Une erreur technique est survenue.');
      setLoading(false);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', { redirect: false, email, password });
      if (res.error) {
        setError(res.error === 'CredentialsSignin' ? 'Email ou mot de passe incorrect.' : res.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      clearForm(); 
      onClose();
      router.refresh();
    } catch (err) {
      setError('Une erreur s\'est produite.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => { 
    if (!isOpen) clearForm(); 
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4" role="dialog" aria-modal="true">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.6)', backdropFilter: 'blur(4px)' }}
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        style={{
          background: '#f8f4ef',
          border: '1.5px solid #1a1a1a',
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '32px',
            height: '32px',
            background: '#f0ebe4',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#8a8578'
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Tab switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', border: '1.5px solid #1a1a1a' }}>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: !isLogin ? '#1a1a1a' : 'transparent',
                color: !isLogin ? '#f8f4ef' : '#1a1a1a'
              }}
            >
              Inscription
            </button>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                borderLeft: '1.5px solid #1a1a1a',
                cursor: 'pointer',
                background: isLogin ? '#1a1a1a' : 'transparent',
                color: isLogin ? '#f8f4ef' : '#1a1a1a'
              }}
            >
              Connexion
            </button>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>
            {isLogin ? 'Bon retour !' : 'Rejoindre le projet'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#8a8578' }}>
            {isLogin ? 'Connectez-vous pour contribuer' : 'Créez un compte pour participer'}
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#dc2626',
                padding: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={isLogin ? onLogin : onRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#8a8578', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f0ebe4',
                  border: '1.5px solid #1a1a1a',
                  padding: '0.75rem',
                  color: '#1a1a1a',
                  fontSize: '1rem'
                }}
                placeholder="Votre pseudo"
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#8a8578', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                background: '#f0ebe4',
                border: '1.5px solid #1a1a1a',
                padding: '0.75rem',
                color: '#1a1a1a',
                fontSize: '1rem'
              }}
              placeholder="nom@exemple.com"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#8a8578', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: '#f0ebe4',
                border: '1.5px solid #1a1a1a',
                padding: '0.75rem',
                color: '#1a1a1a',
                fontSize: '1rem'
              }}
              placeholder="••••••••"
              required
            />
            {!isLogin && (
              <p style={{ fontSize: '0.75rem', color: '#8a8578', marginTop: '0.5rem' }}>
                8 caractères minimum, 1 caractère spécial
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Traitement...' : (isLogin ? 'Se connecter' : 'Créer mon compte')}
          </button>
        </form>

        {/* Divider */}
        <div style={{ position: 'relative', margin: '1.5rem 0' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', borderTop: '1px solid #e0dbd4' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ padding: '0 1rem', fontSize: '0.75rem', color: '#8a8578', background: '#f8f4ef' }}>ou</span>
          </div>
        </div>

        {/* Google */}
        <button
          onClick={() => signIn("google")}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', gap: '0.75rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>
      </motion.div>
    </div>
  );
}
