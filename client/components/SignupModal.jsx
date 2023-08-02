import { useState, useContext, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import supabase from '../lib/supabase';
import { AuthContext } from '../lib/AuthContext';

export default function SignupModal({ isOpen, onRequestClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const nameRef = useRef(name);  // Créer une référence pour le nom

  const { user, setUser } = useContext(AuthContext);

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
  
    if (!newUser) {
      return;
    }

    onRequestClose();
  };

  useEffect(() => {
    nameRef.current = name;  // Mettre à jour la référence à chaque fois que le nom change
  }, [name]);

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      if (event === 'SIGNED_IN') {
        const user = session.user;
  
        // Check if the user profile already exists before inserting
        const { data: existingProfiles } = await supabase
          .from('user_profiles')
          .select()
          .eq('user_id', user.id)
          .single();
  
        // Only insert if no existing profile is found
        if (!existingProfiles) {
          const { data: userProfile, error: insertError } = await supabase
            .from('user_profiles')
            .insert({ user_id: user.id, name: nameRef.current });
  
          if (insertError) {
            console.log('Error inserting user profile:', insertError);
          }
        }
      }
    }
  
    supabase.auth.onAuthStateChange(handleAuthStateChange);
  }, []); 

  if (user) {
    return null;  // Si l'utilisateur est connecté, ne pas afficher le modal
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Inscription"
    >
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
      </form>
    </Modal>
  );
}