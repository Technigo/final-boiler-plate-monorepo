import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

// Define the 'NotFound' functional component.
export const NotFound = () => {
  // Render a div element with a CSS class 'not-found' containing the text 'NotFound'.
  return (
    <>
      <Header />
      <div className="not-found">NotFound from NotFound.jsx</div>
      <Footer />
    </>
  )
};
