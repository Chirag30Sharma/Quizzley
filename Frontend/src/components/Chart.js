import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';

function Chart() {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data');
                setXData(response.data.xData);
                setYData(response.data.yData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const data = xData.map((x, index) => ({
        x: moment(yData[index]).format('YYYY-MM-DD'),
        y: x,
    }));

    return (
        <LineChart width={600} height={400} data={data}>
            <XAxis dataKey="x" type="category" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
    );
}

export default Chart;