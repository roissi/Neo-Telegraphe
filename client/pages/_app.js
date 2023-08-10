import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/Layout';
import Modal from 'react-modal';
import { AuthProvider } from '../lib/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  const useLayout = Component.useLayout ?? true;

  return (
    <AuthProvider>
      {useLayout ? (
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </AuthProvider>
  );
}

export default MyApp;