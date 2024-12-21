import React, { useState } from 'react';
import Navbar from './Navbar';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import YouTube from 'react-youtube';

function Recommend() {
    const [topicName, setTopicName] = useState('');
    const [standard, setStandard] = useState('');
    const [board, setBoard] = useState('');
    const [youtubeLinks, setYoutubeLinks] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/recommendations', {
                topicName,
                standard,
                board,
            });

            setYoutubeLinks(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const opts = {
        height: '200',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div>
            <Navbar />
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Box maxWidth={800} width="100%">
                    {!showResults ? (
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Recommend
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Topic Name"
                                            value={topicName}
                                            onChange={(e) => setTopicName(e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Standard</InputLabel>
                                            <Select value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                                                    <MenuItem key={num} value={num}>
                                                        {num}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Board</InputLabel>
                                            <Select value={board} onChange={(e) => setBoard(e.target.value)}>
                                                <MenuItem value="ICSE">ICSE</MenuItem>
                                                <MenuItem value="CBSE">CBSE</MenuItem>
                                                <MenuItem value="IGCSE">IGCSE</MenuItem>
                                                <MenuItem value="IB">IB</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="center" mt={2}>
                                            <Button type="submit" variant="contained" color="primary">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    ) : (
                        <Box mt={4}>
                            <Typography variant="h4" gutterBottom>
                                Recommendations
                            </Typography>
                            <Slider {...settings}>
                                {youtubeLinks.map((link, index) => (
                                    <div key={index}>
                                        <Paper elevation={3} sx={{ p: 2 }}>
                                            <YouTube
                                                videoId={link.url.videoId}
                                                opts={opts}
                                                onReady={(event) => event.target.pauseVideo()}
                                            />
                                            <Typography variant="h6" gutterBottom>
                                                {link.title}
                                            </Typography>
                                            <Box display="flex" justifyContent="flex-end">
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="contained" color="primary">
                                                        Watch
                                                    </Button>
                                                </a>
                                            </Box>
                                        </Paper>
                                    </div>
                                ))}
                            </Slider>
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default Recommend;