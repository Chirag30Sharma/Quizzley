import React from 'react';
import QuizImage from './assets/logo.png';

const QuizResults = () => {
  return (
    <div style={{
      fontFamily: 'Roboto',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
  <div className="logo">
    <img src={QuizImage} alt="Quizzley" style={{
      width: '200px',
      marginBottom: '1rem',
    }} />
  </div>
  <nav>
    <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
      <li style={{ marginRight: '1rem', fontSize: '1.5rem' }}><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Test Yourself</a></li>
      <li style={{ marginRight: '1rem', fontSize: '1.5rem' }}><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Analyze Performance</a></li>
      <li><a href="#" className="login-btn" style={{ color: '#673AB7', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem' }}>Login</a></li>
    </ul>
  </nav>
</header>

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 24px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: '#ffdd00',
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '32px',
          }}>
            4
          </div>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: '12px',
          }}>
            How Likely are you to recommend us to a fellow learner?
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
          }}>
            <div style={{
              backgroundColor: '#4caf50',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '12px',
            }}>
              Recommend
            </div>
            <div style={{
              backgroundColor: '#ff5722',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Not Recommend
            </div>
          </div>
        </div>
        <div style={{
          marginTop: '48px',
        }}>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: '12px',
          }}>
            Rate the difficulty level of the Quiz
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <div style={{
              backgroundColor: '#4caf50',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Easy
            </div>
            <div style={{
              backgroundColor: '#ffeb3b',
              color: '#333333',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Medium
            </div>
            <div style={{
              backgroundColor: '#f44336',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Hard
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;