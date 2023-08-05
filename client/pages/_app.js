import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/Layout';
import Modal from 'react-modal';
import { AuthProvider } from '../lib/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;