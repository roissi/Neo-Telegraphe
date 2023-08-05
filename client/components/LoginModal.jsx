import { useState, useContext } from 'react';
import Modal from 'react-modal';
import supabase from '../lib/supabase';
import { AuthContext } from '../lib/AuthContext';
import styles from '../styles/modals.module.css';

export default function LoginModal({ isOpen, onRequestClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
  
    if (error) {
      alert(error.message);
      return;
    }
  
    onRequestClose();
  };

  if (user) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Connexion"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-x" type="submit">Se connecter</button>
      </form>
    </Modal>
  );
}