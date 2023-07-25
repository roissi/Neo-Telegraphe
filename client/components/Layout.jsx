import Image from 'next/image';

function Layout({ children }) {
  return (
    <div className="container">
      <header className="d-flex justify-content-center align-items-center">
        <Image src="/img/logoNT_TEST.png" alt="Logo" width={400} height={400} />
      </header>

      <main className="text-center mt-5 mb-5">
        {children}
      </main>

      <footer className="text-center mb-3">
      <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="https://portfolio-roissi.vercel.app/">À propos</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Contacts</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Mentions Légales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Politique de confidentialité</a>
  </li>
  <li class="nav-item">
    <p class="copyright">© roissi / 2023</p>
  </li>
</ul>
      </footer>
    </div>
  );
}

export default Layout;