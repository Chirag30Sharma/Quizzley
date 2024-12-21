import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const StartQuiz = () => {
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const user = useSelector(state => state.user); // Assuming user is from Redux state
    const navigate = useNavigate();

    const handleFileUpload = event => {
        setFile(event.target.files[0]);
    };

    const handleTopicChange = event => {
        setTopic(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();


        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setIsLoading(true);
        setUploadSuccess(false);
        setUploadError(false);

        // Create form-data object
        const formData = new FormData();
        formData.append('files', file);
        formData.append('email', user); // Assuming the user object contains an email field

        try {
            // Send a POST request to the API
            const response = await axios.post('http://127.0.0.1:5000/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(`Upload progress: ${progress}%`);
                }
            });

            // Check response status
            if (response.status === 200) {
                console.log(response.data);
                setUploadSuccess(true);
                // Redirect to /mainquiz upon successful upload
                navigate('/mainquiz', { state: response.data });
            }
        } catch (error) {
            console.error('File upload failed:', error);
            setUploadError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // CSS styles
    const styles = {
        mainContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        },
        h1: {
            color: '#673AB7',
            fontSize: '48px',
            fontFamily: 'Roboto Medium',
            textAlign: 'center',
        },
        h2: {
            color: 'black',
            fontSize: '24px',
            fontFamily: 'Roboto Medium',
            textAlign: 'center',
        },
        inputGroup: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
        },
        input: {
            display: 'none',
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(95deg, #845ec2 0%, #b88efd 100%)',
            color: '#fff',
            textAlign: 'center',
            padding: '8px 2px',
            font: '500 14px Poppins, sans-serif',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            marginTop: '2rem',
            width: '245px',
        },
        textInputButton: {
            backgroundColor: '#fff',
            color: '#673AB7',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '2rem',
            width: '245px',
            textAlign: 'center',
        },
    };

    return (
        <div>
            <Navbar />
            <main style={styles.mainContent}>
                <h1 style={styles.h1}>Upload your own notes</h1>
                <h2 style={styles.h2}>and learn from AI generated MCQs</h2>

                {isLoading && (
                    <div>
                        <p>Uploading file... <FontAwesomeIcon icon={faSpinner} spin /></p>
                    </div>
                )}

                {uploadSuccess && (
                    <div>
                        <p>File uploaded successfully! <FontAwesomeIcon icon={faCheckCircle} /></p>
                    </div>
                )}

                {uploadError && (
                    <div>
                        <p>Error uploading file. Please try again. <FontAwesomeIcon icon={faTimesCircle} /></p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <input
                            type="file"
                            id="file-input"
                            onChange={handleFileUpload}
                            style={styles.input}
                        />
                        <label htmlFor="file-input" style={styles.button}>
                            Upload File
                        </label>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Type in topic..."
                            value={topic}
                            onChange={handleTopicChange}
                            style={{ ...styles.input, ...{ backgroundColor: '#fff', color: '#673AB7' } }}
                        />
                        <button type="button" style={styles.textInputButton}>
                            Enter Topic
                        </button>
                    </div>

                    <button type="submit" style={styles.button}>
                        Start Quiz
                    </button>
                </form>
            </main>
        </div>
    );
};

export default StartQuiz;