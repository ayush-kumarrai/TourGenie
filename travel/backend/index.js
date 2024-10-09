import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.post('/api/index', async (req, res) => {
  const { start, destination } = req.body;

  try {
    const recommendations = await getTravelRecommendations(start, destination);
    res.status(200).json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Error generating travel recommendations.' });
  }
});

const getTravelRecommendations = async (start, destination) => {
  const geminiApiKey = 'USE YOUR OWN API KEY';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;
  const prompt = `I want to travel from ${start} to ${destination}. Give the small description of the ${destination} Please suggest the best mode of transport, distance, Top 5 hotels to stay and top 10 places to visit like temple, historical places, tourist place etc and other important things. Also, include any travel tips.`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const recommendation = response.data.candidates[0].content.parts[0].text;
    return recommendation;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Could not generate travel recommendations.');
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
