import { Croissant, Utensils, Pill, Mail, ShoppingCart, Castle, SprayCan } from 'lucide-react';

export function CategoryIcon({ category }) {
  switch(category.toLowerCase()) {
    case 'boulangerie':
      return <Croissant size={28} strokeWidth={2.25} />;
    case 'restaurant':
      return <Utensils size={28} strokeWidth={2.25} />;
    case 'pharmacie':
      return <Pill size={28} strokeWidth={2.25} />;
    case 'poste':
      return <Mail size={28} strokeWidth={2.25} />;
    case 'alimentation':
      return <ShoppingCart size={28} strokeWidth={2.25} />;
    case 'monument':
      return <Castle size={28} strokeWidth={2.25} />;
    case 'décoration':
      return <SprayCan size={28} strokeWidth={2.25} />;
    default:
      return null;
  }
}