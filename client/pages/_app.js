import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/Layout';
import Modal from 'react-modal';
import { AuthProvider } from '../lib/AuthContext'; // Assurez-vous que ce chemin d'importation est correct

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;