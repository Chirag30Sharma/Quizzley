import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizImage from './assets/logo.png';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleTestYourself = () => {
        navigate('/startquiz');
    };

    const handleAnalyzePerformance = () => {
        navigate('/performance');
    };
    const handleRecomendation = () => {
        navigate('/recomend');
    };
    const handleHome = () => {
        navigate('/');
    };
    const handleLogin = () => {
        navigate('/signin');
    };
    console.log(user)
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }} onClick={handleHome}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={QuizImage} alt="Quizzley" style={{ width: '200px', marginRight: '1rem' }} />
                </div>
            </a>
            <nav>
                <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
                    {user ? (
                        <>
                            <li style={{ marginRight: '2rem', fontSize: '1.5rem' }}>
                                <a href="#" style={{ color: '#333', textDecoration: 'none' }} onClick={handleTestYourself}>
                                    Test Yourself
                                </a>
                            </li>
                            <li style={{ marginRight: '2rem', fontSize: '1.5rem' }}>
                                <a href="#" style={{ color: '#333', textDecoration: 'none' }} onClick={handleAnalyzePerformance}>
                                    Analyze Performance
                                </a>
                            </li>
                            <li style={{ marginRight: '2rem', fontSize: '1.5rem' }}>
                                <a href="#" style={{ color: '#333', textDecoration: 'none' }} onClick={handleRecomendation}>
                                    Recommend Material
                                </a>
                            </li>
                            <li style={{ fontSize: '1.5rem' }}>
                                <a
                                    href="#"
                                    className="logout-btn"
                                    style={{
                                        color: '#673AB7',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '20px',
                                        padding: '0.5rem 1rem',
                                        transition: 'color 0.3s ease',
                                        ':hover': {
                                            color: '#FF0000',
                                        },
                                    }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <li style={{ fontSize: '1.5rem' }}>
                            <a
                                href="#"
                                className="login-btn"
                                style={{
                                    color: '#673AB7',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '0.5rem 1rem',
                                }}
                                onClick={handleLogin}
                            >
                                Login
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;