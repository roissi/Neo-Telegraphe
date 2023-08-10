import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { HomeIcon } from './LucideIcons';

function Layout({ children }) {
  const [session, setSession] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const router = useRouter();
  const isOnHomePage = router.pathname === '/';

  useEffect(() => {
    setSession(supabase.auth.session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="container">

  <header className="header-container">
    <div className="logo-container">
      {router.pathname === '/' ? (
        <Image src="/img/logoNT_TEST.png" alt="Logo" width={400} height={400} />
      ) : (
        <Link href="/" passHref>
          <Image src="/img/logoNT_TEST.png" alt="Logo" width={400} height={400} />
        </Link>
      )}
    </div>
  </header>

  <div className="btn-container">
  {!isOnHomePage && (
    <Link href="/" passHref>
      <div className="icon-container">
        <HomeIcon 
          size={28} 
          strokeWidth={2.25} 
          color="white" 
        />
      </div>
    </Link>
  )}

    {session ? (
      <button className="btn btn-x" onClick={handleSignOut}>Déconnexion</button>
    ) : (
      <>
        <button className="btn btn-x me-3" onClick={() => setSignupOpen(true)}>Inscription</button>
        <button className="btn btn-x" onClick={() => setLoginOpen(true)}>Connexion</button>
        <SignupModal isOpen={signupOpen} onRequestClose={() => setSignupOpen(false)} />
        <LoginModal isOpen={loginOpen} onRequestClose={() => setLoginOpen(false)} />
      </>
    )}
  </div>

      <main className="text-center mt-5 mb-5">{children}</main>

      <footer className="text-center mb-3">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link" href="https://portfolio-roissi.vercel.app/">À propos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/cyril-de-graeve/">Contacts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mentions-legales">Mentions Légales</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/politique-de-confidentialite">Politique de confidentialité</a>
          </li>
          <li className="nav-item">
            <p className="copyright">© roissi / 2023</p>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Layout;