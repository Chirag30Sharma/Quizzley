require('dotenv').config();
const express = require('express');
const { SimpleLinearRegression } = require('ml-regression');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



app.post('/generate', async (req, res) => {
    try {
        const prompt = req.body.text;

        if (!prompt) {
            return res.status(400).json({ error: 'You havent sent a text to parse' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI);
        const model = genAI.getGenerativeModel({ model: process.env.TEXT_MODEL });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 4096,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const example =
        {
            question: "QUESTION_1",
            answers: [
                "ANSWER_1",
                "ANSWER_2",
                "ANSWER_3",
                "ANSWER_4"
            ],
            correctAnswer: "CORRECT_ANSWER"
        }

        const questionpreprocess = "Please generate a set of multiple-choice questions and answers based on the provided text. Each question should have four options, and the correct answer should be clearly identified. Please provide the output in the following format: " + example + ".The response must be in the format as shown above which is an array of object format the question will always be in the question field, the answer options will always be in the option field and the answer will be in the correctAnswer field"
        const titlepreprocess = "Suggest me a topic name for the text given below"
        const questionParts = [
            { text: questionpreprocess + prompt },
        ];
        const result = await model.generateContent({
            contents: [{ role: "user", parts: questionParts }],
            generationConfig,
            safetySettings,
        });
        const text = result.response.text()
        console.log(text)
        const titleParts = [
            { text: titlepreprocess + prompt },
        ];
        const title = await model.generateContent({
            contents: [{ role: "user", parts: titleParts }],
            generationConfig,
            safetySettings,
        });
        contextTitle = title.response.text()
        res.status(200).json({ "mcq": text, "title": contextTitle })

    } catch (error) {
        console.log(error)
        res.status(500).json(error).send();
    }
});

app.post('/predict', async (req, res) => {
    try {
        const { date, score, predictDate } = req.body;

        const dateDiffs = date.map((d, i) => {
            const firstDate = new Date(date[0]);
            const currDate = new Date(d);
            return Math.round((currDate - firstDate) / (1000 * 60 * 60 * 24));
        });

        const model = new SimpleLinearRegression(dateDiffs, score);

        const futureDateDiff = Math.round((new Date(predictDate) - new Date(date[0])) / (1000 * 60 * 60 * 24));
        const predictedScore = model.predict(futureDateDiff);
        const final = Math.ceil(predictedScore)
        res.status(200).json({ "score": final });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while making the prediction.' });
    }
});



app.post('/recommendations', async (req, res) => {
    try {
        const { topicName, standard, board } = req.body;

        const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE });

        const searchParams = {
            q: topicName + " " + standard + " " + board,
            type: 'video',
            part: 'id,snippet',
            maxResults: 5,
        };

        const searchResponse = await youtube.search.list(searchParams);

        const recommendations = searchResponse.data.items.map((item) => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
        console.log(recommendations)
        res.status(200).json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching recommendations.');
    }
});