// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // Routes
// app.get('/', (req, res) => {
//   res.send('MERN Stack API');
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/recommendation.routes.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectToMongoDB from "./db/connectToMongoDB.js";
import userRouter from "./routes/user.routes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const app = express();
app.use(cors());
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userData", userRouter);


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
app.post('/aifeature', async (req, res) => {
  const {
    skillLevel,
    age,
    desiredSubject,
    learningGoal,
    availableTime,
    courseDuration,
    learningStyle,
    careerGoal
  } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Based on the following student information, provide course recommendations:
	  Current Skill Level: ${skillLevel} (e.g., Beginner, Intermediate, Advanced)
	  Age: ${age}
	  Desired Subject: ${desiredSubject}
	  Learning Goal: ${learningGoal}
	  Available Time: ${availableTime} hours per week
	  Preferred Course Duration: ${courseDuration} (e.g., Short-term, Long-term)
	  Learning Style Preference: ${learningStyle} (e.g., Visual, Auditory, Reading/Writing, Kinesthetic)
	  Career Goal: ${careerGoal}
	
	Please provide a JSON response(Give only Json response don't use any starting JSON or ''' ''') with the following structure:
	{
	  "recommendations": [
		{
		  "courseName": "Course title",
		  "platform": "Platform name",
		  "difficulty": "Difficulty level",
		  "duration": "Estimated duration",
		  "description": "Brief course description",
		  "relevance": "Why this course is recommended",
		  "skillsGained": ["Skill 1", "Skill 2", "Skill 3"]
		}
	  ],
	  "learningPathSuggestion": "A brief suggestion for a learning path",
	  "additionalResources": ["Resource 1", "Resource 2"],
	  "careerInsight": "A brief insight relating the recommendations to the career goal"
	}
	
	Provide 4 course recommendations in the JSON structure. focusing on the most recent and relevant courses in the field. If you're unsure about the exact release date of a course, provide your best estimate and indicate that it's an estimate.`




  try {
    const result = await model.generateContent(prompt)
    let textContent = result.response.candidates[0].content.parts[0].text
    console.log(result.response.candidates[0].content.parts[0].text)
    textContent = textContent.replace(/```json|```/g, ''); // Remove markdown code block syntax
    textContent = textContent.replace(/^\'\'\'|\'\'\'$/g, ''); // Remove ''' if present
    const recommendations = JSON.parse(textContent);

    console.log(recommendations)
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
