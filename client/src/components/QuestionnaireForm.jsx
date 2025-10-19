import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionnaireForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    skillLevel: '',
    age: '',
    desiredSubject: '',
    learningGoal: '',
    availableTime: '',
    courseDuration: '',
    learningStyle: '',
    careerGoal: '',
  });
  const navigate = useNavigate();

  const questions = [
    { id: 'desiredSubject', question: 'What subject do you want to learn?' },
    {
      id: 'skillLevel',
      question: 'What is your current skill level?',
      options: ['Beginner', 'Intermediate', 'Advanced']
    },
    { id: 'age', question: 'What is your age?', type: 'number' },
    { id: 'learningGoal', question: 'What is your learning goal?' },
    { id: 'availableTime', question: 'How many hours per week can you dedicate to learning?', type: 'number' },
    { id: 'courseDuration', question: 'What is your preferred course duration?', placeholder: 'e.g., Short-term, Long-term' },
    { id: 'learningStyle', question: 'What is your preferred learning style?', placeholder: 'e.g., Visual, Auditory, Reading/Writing, Kinesthetic' },
    { id: 'careerGoal', question: 'What is your career goal?' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Navigate immediately to /recommendation
    navigate('/recommendation', { state: { answers: answers } });

    // Send the request after a 5-second delay
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:8000/aifeature', answers);
        console.log('Form submitted:', response.data);
        // You can update the recommendation page with this data if needed
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }, 15000);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Learning Profile Questionnaire</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor={currentQ.id} className="block text-sm font-medium text-gray-700 mb-2">
              {currentQ.question}
            </label>
            {currentQ.options ? (
              <div>
                {currentQ.options.map((option) => (
                  <div key={option} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={currentQ.id}
                        value={option}
                        checked={answers[currentQ.id] === option}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <input
                type={currentQ.type || 'text'}
                id={currentQ.id}
                name={currentQ.id}
                value={answers[currentQ.id]}
                onChange={handleInputChange}
                placeholder={currentQ.placeholder}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
