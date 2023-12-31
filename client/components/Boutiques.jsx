import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import supabase from '../lib/supabase';
import { CategoryIcon } from './LucideIcons';

function Boutique({ boutique }) {
  return (
    <div className="card mb-4 shadow-sm m-2 overflow-hidden">
      <Link href={`/boutique/${boutique.id}`} passHref>
        <img 
            src={boutique.imageUrl} 
            className="card-img-top" 
            alt={boutique.name} 
          />
      </Link>
      <div className="card-body">
      <h5 className="card-title" style={{fontWeight: 'bold'}}>{boutique.name}</h5>
        <p className="card-text">{boutique.address}</p>
        <p>
        {boutique.category && (
        <span className={`badge badge-${boutique.category.toLowerCase()}`}>
          <CategoryIcon category={boutique.category} />
        </span>
        )}
        </p>
        <p className="card-text">
          {boutique.reputation ? (
            <>
              <span className="rating-star">
                {"\u2605".repeat(Math.round(boutique.reputation))}
              </span>
              {` (${boutique.reputation})`}
            </>
          ) : (
            "Pas encore d'avis"
          )}
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
  
      if (error) {
        console.error('Error fetching boutiques:', error);
      } else if (data) {
        // Calculate reputation for each boutique
        const boutiquesWithReputation = await Promise.all(data.map(async boutique => {
          const { data: reviews, error: reviewsError } = await supabase
            .from('Reviews')
            .select('rating')
            .eq('shop_id', boutique.id);
          
          if (reviewsError) {
            console.error('Error fetching reviews:', reviewsError);
          } else if (reviews) {
            // Check if reviews length is more than 0 before calculating average rating
            if (reviews.length > 0) {
              const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
              const avgRating = totalRating / reviews.length;
              // Add reputation to boutique
              boutique.reputation = avgRating.toFixed(1);
            } else {
              // If no reviews, set reputation to null
              boutique.reputation = null;
            }
          }
        
          return boutique;
        }));
  
        setBoutiques(boutiquesWithReputation);
      }
    };
  
    fetchBoutiques();
  }, []);

  return (
    <div className="row mx-0">
      {boutiques.map((boutique) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 px-1 mb-4" key={boutique.id}>
          <Boutique boutique={boutique} />
        </div>
      ))}
    </div>
  );
}