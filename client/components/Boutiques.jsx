import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import supabase from '../lib/supabase';

// Composant représentant une seule boutique
function Boutique({ boutique }) {
  return (
    <div className="card mb-4 shadow-sm" style={{width: "18rem"}}>
      <img src={boutique.imageUrl} className="card-img-top" alt={boutique.name} />
      <div className="card-body">
      <h5 className="card-title" style={{fontWeight: 'bold'}}>{boutique.name}</h5>
        <p className="card-text">{boutique.address}</p>
        <p className="card-text">{boutique.category}</p>
        <p className="card-text">
          <span className="text-warning">
            {"\u2605".repeat(Math.round(boutique.reputation))}
          </span>
          {` (${boutique.reputation})`}
        </p>
        <Link href={`/boutique/${boutique.id}`} passHref>
        <Button variant="primary" className="btn-custom">En savoir plus</Button>
      </Link>
      </div>
    </div>
  );
}

export default function Boutiques() {
  const [boutiques, setBoutiques] = useState([]);

  useEffect(() => {
    const fetchBoutiques = async () => {
      const { data, error } = await supabase.from('Shop').select('*');

      console.log("Data: ", data); // Affiche les données récupérées
      console.log("Error: ", error); // Affiche l'erreur si elle existe

      if (error) {
        console.error('Error fetching boutiques:', error);
      } else if (data) {
        setBoutiques(data);
      }
    };

    fetchBoutiques();
  }, []);

  return (
    <div className="row">
      {boutiques.map((boutique) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={boutique.id}>
          <Boutique boutique={boutique} />
        </div>
      ))}
    </div>
  );
}