import { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import supabase from '../lib/supabase';
import { AuthContext } from '../lib/AuthContext';
import { toast } from 'react-toastify';
import styles from '../styles/modals.module.css';

export default function SignupModal({ isOpen, onRequestClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { user, setUser } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { user: newUser, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    // Store the name in local storage
    localStorage.setItem('signupName', name);

    toast("Un e-mail de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien dans l'e-mail pour vérifier votre compte.", {
      autoClose: 10000,  // 10000 ms = 10 sec
    });
    setEmail('');
    setPassword('');
    setName('');
  };

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      if (event === 'SIGNED_IN' && session.user) {
        const user = session.user;
  
        const { data: existingProfiles } = await supabase
          .from('user_profiles')
          .select()
          .eq('user_id', user.id)
          .single();
  
        if (!existingProfiles) {
          // Retrieve the name from local storage
          const signupName = localStorage.getItem('signupName');
  
          if (user) {
            const { data: userProfile, error: insertError } = await supabase
              .from('user_profiles')
              .insert({ user_id: user.id, name: signupName });
  
            if (insertError) {
              console.error(insertError);
            }
  
            // Remove the name from local storage
            localStorage.removeItem('signupName');
          } else {
            // handle error case
            console.error('User is not defined');
          }
        }
      }
    }
  
    supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => {
      supabase.auth.onAuthStateChange((event, session) => {});
    };
  }, []);

  if (user) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Inscription"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-x" type="submit">S'inscrire</button>
        {message && <div className="mt-3">{message}</div>}
      </form>
    </Modal>
  );
}