import { useEffect, useState, useContext } from "react";
import supabase from '../../lib/supabase';
import { useRouter } from 'next/router'
import { CategoryIcon } from '../../components/LucideIcons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AuthContext } from '../../lib/AuthContext';
import ReviewModal from '../../components/ReviewModal';

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function Boutique() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [boutique, setBoutique] = useState({});
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoutique = async () => {
      const { data, error } = await supabase
        .from('Shop')
        .select('*')
        .eq('id', id)
        .single();
    
      if (error) {
        console.log("Error: ", error);
        setError(error.message);
      }
      else setBoutique(data);
    };

    fetchBoutique();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (id) { // Check if id is defined
        const shopId = parseInt(id); // Convert id to integer        
        const { data, error } = await supabase
          .from('Reviews')
          .select(`*, user_profiles (*)`)  // Here we select all from User
          .eq('shop_id', shopId);
    
        if (error) {
          console.log("Error: ", error);
          setError(error.message); // Set the error state
        }
        else {
          // Calculate the average rating
          const totalRating = data.reduce((acc, curr) => acc + curr.rating, 0);
          const avgRating = totalRating / data.length;
          setBoutique(prevBoutique => ({...prevBoutique, reputation: avgRating.toFixed(1)}));
  
          setReviews(data);
          setError(null); // Clear the error state if successful
        }
      }
    };
  
    fetchReviews();
  }, [id]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center mb-1 gap-4">
        <h1 className="mr-3">{boutique.name}</h1>
        {boutique.category && (
          <span className={`badge badge-${boutique.category.toLowerCase()}`}>
            <CategoryIcon category={boutique.category} />
          </span>
        )}
      </div>
      <p className="text-center">
        <a className="nav-link" href="#map">{boutique.address}</a>
      </p>

      <div style={{maxWidth: "700px", margin: "auto"}}>
        <img 
          src={boutique.imageUrl} 
          alt={boutique.name} 
          className="img-fluid"
          style={{marginTop: "20px", marginBottom: "20px"}}
        />
      </div>

      <div className="d-flex justify-content-center flex-column align-items-center mb-4">
        <p className="mr-5">
          {boutique.reputation ? (
          <>
          <span className="text-warning">
            {"\u2605".repeat(Math.round(boutique.reputation))}
          </span>
            {` (${boutique.reputation})`}
          </>
          ) : (
          "Pas encore d'avis"
          )}
        </p>

      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-custom me-3 ${showReviews ? 'active' : ''}`} 
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? 'Voir la description' : 'Voir tous les avis'}
        </button>

        <button className="btn btn-custom" onClick={() => {
          if (user) {
          setReviewOpen(true)
          } else {
          alert("Vous devez vous connecter pour rédiger un avis");
          }
          }}>Rédiger un avis</button>
      </div>
    </div>

      <div className="px-3 mb-5">
        {showReviews ? (
          reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id}>
              <h5 className="review-user">{review.user_profiles ? review.user_profiles.name : "Utilisateur inconnu"}</h5>
                <p className="card-text">
                <span className="text-warning">
                  {"\u2605".repeat(Math.round(review.rating))}
                </span>
                  {` (${review.rating})`}
                </p>
                <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>Cette boutique ou sa prestation n'a pas encore été commentée par les utilisateurs...</p>
        )
      ) : (
        <p>{boutique.description}</p>
      )}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Une erreur est survenue : {error}
        </div>
      )}

      <div id="map">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: boutique.latitude, lng: boutique.longitude }}
            zoom={14}
          >
            <Marker position={{ lat: boutique.latitude, lng: boutique.longitude }} />
          </GoogleMap>
        </LoadScript>
      </div>

      <ReviewModal
        isOpen={reviewOpen}
        onRequestClose={() => setReviewOpen(false)}
        shopId={id}
      />
    </div>
  );
}