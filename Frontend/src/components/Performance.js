import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import Navbar from './Navbar';
import { Grid, TextField, Button, Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

function Performance() {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);
    const [predictDate, setPredictDate] = useState('');
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/alluser', { email: user });
                setXData(response.data.date.map((d) => moment(d).format('YYYY-MM-DD')));
                setYData(response.data.score);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user, dispatch]);

    const handlePredictDateChange = (event) => {
        setPredictDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(xData, yData, predictDate)
            const response = await axios.post('http://localhost:3001/predict', {
                date: xData,
                score: yData,
                predictDate: predictDate.toString(),
            });
            console.log(response)
            alert(`Predicted score: ${response.data.score}`);
        } catch (error) {
            console.error(error);
        }
    };

    const data = xData.map((x, index) => ({
        x,
        y: yData[index],
    }));

    return (
        <>
            <Navbar />
            <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh', marginBottom: '20px' }}>
                <Grid item xs={5}>
                    <LineChart width={800} height={600} data={data}>
                        <XAxis dataKey="x" type="category" />
                        <YAxis type="number" domain={[0, 'dataMax']} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="y" stroke="#8884d8" />
                    </LineChart>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h5" gutterBottom>
                            Predict Performance
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box mb={2}>
                                <TextField
                                    label="Prediction Date"
                                    type="date"
                                    value={predictDate}
                                    onChange={handlePredictDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '300px' }}
                                />
                            </Box>
                            <Button variant="contained" color="primary" type="submit" style={{ width: '300px' }}>
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Performance;