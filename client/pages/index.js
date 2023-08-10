import Image from 'next/image';
import styles from '../styles/landing.module.css';
import { motion } from 'framer-motion';

function Landing() {
  const text = "« Le point culminant de Paris, d’une altitude de 128,50 mètres, se situe 40 rue de Télégraphe, juste à côté du cimetière de Belleville. Aujourd’hui les hauts immeubles qui l’entourent empêchent toute échappée vers de lointains horizons. »";
  const chars = text.split('');

  return (
    <div className={styles.landingPage}>
      <div className={styles.container}>

        <div className={styles.leftColumn}>
          <div className={styles.landingText2}>
            {chars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02, duration: 0.05 }} // adjust as needed
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          {/* Image pour l'affichage mobile */}
          <div className={styles.landingImageContainerMobile}>
            <Image src="/img/chato2.jpg" alt="Télégraphe" width={320} height={260} layout="responsive" />
          </div>

          <h2 className={styles.landingTitle}>Bienvenue dans l'application Télégraphe</h2>
          
          <p className={styles.landingText}>
            Cette application est une plateforme dédiée à la découverte des boutiques du quartier Télégraphe, situé dans le 20<sup>ème</sup> arrondissement de Paris. Elle a été conçue pour aider les résidents et les visiteurs à trouver facilement des boutiques locales et savoir précisément ce qu'elles offrent. Le visiteur a notamment la possibilité de donner son avis sur chacune des boutiques, et leurs prestations, en rejoignant la communauté des membres inscrits (parisiens, habitants du quartier, touristes, robots, extra-terrestres, etc.).
          </p>
            <div className={styles.landingButtonContainer}>
              <a href="/home" className="btn btn-x">Go, explorez l'application !</a>
            </div>
          </div>
          
          {/* Image pour l'affichage desktop */}
          <div className={styles.landingImageContainerDesktop}>
            <Image src="/img/chato2.jpg" alt="Télégraphe" width={320} height={260} layout="responsive" />
          </div>
        </div>
      </div>
    );
}

Landing.useLayout = false;

export default Landing;