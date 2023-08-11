import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/landing.module.css';
import { motion } from 'framer-motion';

function Landing() {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [backgroundState, setBackgroundState] = useState('initial');

  const text1 = "Le point culminant de Paris, d’une altitude de 128,50 mètres, se situe au 40 rue du Télégraphe, juste à côté du cimetière de Belleville. Aujourd’hui, les hauts immeubles qui l’entourent empêchent toute échappée vers de lointains horizons.";
  const text2 = "Du moins, c'est ce qu'on dit...";
  const animationDelay = 0.05;
  const EXTRA_DELAY = 2;

  const landingPageVariants = {
    initial: {
      background: "linear-gradient(to top right, #088e99, #ffffff)"
    },
    afterTyping: {
      background: "linear-gradient(to top right, #088e99, #ffffff)"
    },
    animate: {
      background: "linear-gradient(to top right, #cdf3f7, #ffffff)",
      transition: {
        delay: 3,  // 3 second delay before starting the background transition
        duration: 1  // Transition duration of 1 second, but you can adjust as needed
      }
    }
  };
  
  // UseEffect for handling window resize
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // UseEffect for animation timing
  useEffect(() => {
    const totalTime = (text1.length + text2.length) * animationDelay * 1000 + (EXTRA_DELAY + 3) * 1000;

    const typingTimer = setTimeout(() => {
        setIsTypingDone(true);
        setBackgroundState('afterTyping');

        // Setting another timeout to handle the background transition after 3 seconds
        const backgroundTimer = setTimeout(() => {
            setBackgroundState('animate');
        }, 1500);

        return () => clearTimeout(backgroundTimer);
    }, totalTime);

    return () => clearTimeout(typingTimer);
}, []);

  const fontSize = isTypingDone 
    ? 'initial' 
    : windowWidth <= 768 ? '1.5rem' : '3rem';

  return (
    <motion.div
      initial="initial"
      animate={backgroundState}
      variants={landingPageVariants}
      className={styles.landingPage}
    >
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.landingText2} style={{ fontSize }}>
            {!isTypingDone && text1.split('').map((char, index) => (
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
            {!isTypingDone && text2.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: (index + text1.length) * animationDelay + EXTRA_DELAY,
                  duration: animationDelay 
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          {isTypingDone && (
            <div>
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

              <motion.div
                className={styles.landingButtonContainer}
                initial={{ opacity: 0, y: -1000, scale: 1.2 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  y: { type: "spring", stiffness: 300, damping: 10 },
                  scale: { delay: 0.3, duration: 0.6 } 
                }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 1.1 }}
              >
                <a href="/home" className="btn btn-x">Go, explorez l'application !</a>
              </motion.div>

              <motion.p
                className={styles.landingText}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
            Cette application est une plateforme dédiée à la découverte des boutiques du quartier Télégraphe, situé dans le 20<sup>ème</sup> arrondissement de Paris. Elle a été conçue pour aider les résidents et les visiteurs à trouver facilement des boutiques locales et savoir précisément ce qu'elles offrent. Le visiteur a notamment la possibilité de donner son avis sur chacune des boutiques, et leurs prestations, en rejoignant la communauté des membres inscrits (parisiens, habitants du quartier, touristes, robots, extra-terrestres, etc.).
            </motion.p>
            </div>
          )}
        </div>

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
      </div>
    </motion.div>
  );
}

Landing.useLayout = false;

export default Landing;