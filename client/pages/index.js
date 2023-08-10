import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/landing.module.css';
import { motion } from 'framer-motion';

function Landing() {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const text1 = "Le point culminant de Paris, d’une altitude de 128,50 mètres, se situe au 40 rue de Télégraphe, juste à côté du cimetière de Belleville. Aujourd’hui, les hauts immeubles qui l’entourent empêchent toute échappée vers de lointains horizons."
  const text2 = "Du moins, c'est ce qu'on dit..."
  const chars1 = text1.split('');
  const chars2 = text2.split('');
  const animationDelay = 0.05; // Durée pour chaque lettre
  const [windowWidth, setWindowWidth] = useState(undefined);
  const EXTRA_DELAY = 2; // Durée de la pause en secondes

  useEffect(() => {
    // Fonction pour mettre à jour la largeur de la fenêtre
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    // Écoutez l'événement de redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Définissez la largeur initiale
    handleResize();

    // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    return () => window.removeEventListener('resize', handleResize);
}, []);


useEffect(() => {
  const delayAfterChars1 = 2;  // délai après chars1
  const delayAfterChars2 = 1;  // délai après chars2
  const totalTime = chars1.length * animationDelay * 1000 + delayAfterChars1 * 1000 + chars2.length * animationDelay * 1000 + delayAfterChars2 * 1000;

  const timer = setTimeout(() => {
    setIsTypingDone(true);
  }, totalTime);

    return () => clearTimeout(timer); // Nettoyez le timer pour éviter des bugs potentiels
  }, [chars1, chars2]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.landingText2}
          style={{ 
            fontSize: isTypingDone 
                ? 'initial' 
                : windowWidth <= 768 ? '1.5rem' : '3rem' // Si la largeur est inférieure ou égale à 768px, alors c'est une taille pour mobile
              }}
            >
            {chars1.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: index * animationDelay,
                  duration: animationDelay 
              }}
            >
              {char}
            </motion.span>
          ))}
          <br />
          {!isTypingDone && chars2.map((char, index) => (
            <motion.span
                key={index + chars1.length}  // Assurez-vous d'avoir une clé unique
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                delay: (index + chars1.length) * animationDelay + EXTRA_DELAY,
                duration: animationDelay 
              }}
            >
              {char}
            </motion.span>
            ))}
          </div>
          
          {isTypingDone && (
            <>
              {/* Image pour l'affichage mobile */}
              <motion.div
                className={styles.landingImageContainerMobile}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Image src="/img/chato2.jpg" alt="Télégraphe" width={320} height={260} layout="responsive" />
              </motion.div>

              <motion.h2
                className={styles.landingTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Bienvenue dans l'application Télégraphe
              </motion.h2>

              <motion.p
                className={styles.landingText}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
            Cette application est une plateforme dédiée à la découverte des boutiques du quartier Télégraphe, situé dans le 20<sup>ème</sup> arrondissement de Paris. Elle a été conçue pour aider les résidents et les visiteurs à trouver facilement des boutiques locales et savoir précisément ce qu'elles offrent. Le visiteur a notamment la possibilité de donner son avis sur chacune des boutiques, et leurs prestations, en rejoignant la communauté des membres inscrits (parisiens, habitants du quartier, touristes, robots, extra-terrestres, etc.).
              </motion.p>

              <motion.div
                className={styles.landingButtonContainer}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: EXTRA_DELAY + 0.2, duration: 0.6 }}
              >
                <a href="/home" className="btn btn-x">Go, explorez l'application !</a>
              </motion.div>
            </>
          )}
        </div> {/* fin du .leftColumn */}

        {isTypingDone && (
              <motion.div
                className={styles.landingImageContainerDesktop}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
            <Image src="/img/chato2.jpg" alt="Télégraphe" width={320} height={260} layout="responsive" />
          </motion.div>
        )}

      </div> {/* fin du .container */}
    </div> // fin du .landingPage
  );
}

Landing.useLayout = false;

export default Landing;