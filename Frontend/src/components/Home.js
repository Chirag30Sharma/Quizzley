import React from 'react';
import QuizImage from './assets/logo.png';
import Illustration from './assets/illustration.png';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function Home() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <main>
        <section className="hero" style={{ display: 'flex', alignItems: 'center', padding: '2rem', margin: '0 auto', maxWidth: '1200px' }}>
          <div className="hero-content" style={{ flexBasis: '50%', marginRight: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              Learn<br />
              new concepts<br />
              with each question
            </h1>

            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Revolutionize K-12 Learning: Generate Customized Practice Questions in Seconds</p>
            <a href="/start-solving" className="start-solving-btn" style={{ display: 'inline-block', backgroundColor: '#673AB7', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '4px', fontSize: '1.5rem', textDecoration: 'none', cursor: 'pointer' }}>Start solving</a>
          </div>
          <div className="illustration" style={{ flexBasis: '50%', marginLeft: 'auto', }}>
            <img src={Illustration} alt="Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: '#673AB7', color: '#fff', paddingTop: '10rem', textAlign: 'center' }}>

      </footer>
    </div>
  );
}

export default Home;