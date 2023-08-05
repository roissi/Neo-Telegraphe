import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

function Layout({ children }) {
  const [session, setSession] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="container">
      <header className="d-flex justify-content-center align-items-center">
        <div style={{ position: 'absolute', top: 20, right: 30 }}>
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

        {router.pathname === '/' ? (
          <Image src="/img/logoNT_TEST.png" alt="Logo" width={400} height={400} />
        ) : (
          <Link href="/" passHref>
            <Image src="/img/logoNT_TEST.png" alt="Logo" width={400} height={400} />
          </Link>
        )}
      </header>

      <main className="text-center mt-5 mb-5">{children}</main>

      <footer className="text-center mb-3">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link active" href="https://portfolio-roissi.vercel.app/">À propos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contacts</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Mentions Légales</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Politique de confidentialité</a>
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