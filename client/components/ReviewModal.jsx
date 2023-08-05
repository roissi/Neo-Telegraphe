import { useState, useContext } from 'react';
import Modal from 'react-modal';
import supabase from '../lib/supabase';
import { AuthContext } from '../lib/AuthContext';
import styles from '../styles/modals.module.css';

export default function ReviewModal({ isOpen, onRequestClose, shopId }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Veuillez vous connecter pour écrire un avis.");
      return;
    }

    const { error } = await supabase
      .from('Reviews')
      .insert([{ user_id: user.id, shop_id: shopId, content: review, rating: rating }]);

    if (error) {
      alert(error.message);
    } else {
      setReview('');
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Rédiger un avis"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Rédiger un avis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Note</label>
          <input 
            type="number" 
            id="rating" 
            min="0" 
            max="5" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            className="form-control"
            style={{ width: '50%' }}
            placeholder="Entre 0 et 5"
          />
        </div>
        <label htmlFor="rating" className="form-label">Avis</label>
        <textarea
          className="form-control mb-3"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{ height: "100%" }}
        />
        <button className="btn btn-x" type="submit">Soumettre</button>
      </form>
    </Modal>
  );
}