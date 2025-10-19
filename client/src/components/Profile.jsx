// import React, { useState } from 'react';

// // Sample data
// const mockData = {
//   user: {
//     username: "johndoe",
//     fullName: "John Doe",
//     gender: "Male",
//     profilePic: "https://avatar.iran.liara.run/public/boy?username=johndoe",
//   },
//   recommendations: [
//     {
//       courseName: "Machine Learning",
//       platform: "Coursera",
//       difficulty: "Intermediate",
//       duration: "11 weeks",
//       description: "An introduction to machine learning with a focus on algorithms and their applications.",
//       relevance: "Highly relevant for data science and AI roles.",
//       skillsGained: ["Python", "Data Analysis", "Machine Learning"],
//     },
//     {
//       courseName: "Full Stack Web Development",
//       platform: "Udemy",
//       difficulty: "Beginner",
//       duration: "8 weeks",
//       description: "Learn to build complete web applications using the MERN stack.",
//       relevance: "Essential for web development positions.",
//       skillsGained: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
//     },
//     {
//       courseName: "Data Structures and Algorithms",
//       platform: "edX",
//       difficulty: "Advanced",
//       duration: "12 weeks",
//       description: "Deep dive into data structures and algorithms, crucial for coding interviews.",
//       relevance: "Critical for software engineering roles.",
//       skillsGained: ["Algorithm Design", "Problem Solving", "Data Structures"],
//     },
//   ],
// };

// const UserProfile = () => {
//   const [user] = useState(mockData.user);
//   const [recommendations] = useState(mockData.recommendations);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         {/* User Profile Section */}
//         <div className="flex items-center mb-12">
//           <img
//             src={user.profilePic || '/default-profile.png'}
//             alt="Profile Picture"
//             className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
//           />
//           <div className="ml-6">
//             <h1 className="text-4xl font-extrabold text-gray-800">{user.fullName}</h1>
//             <p className="text-xl text-gray-600 mt-1">{user.gender}</p>
//             <p className="text-md text-gray-500 mt-2">{user.username}</p>
//           </div>
//         </div>

//         {/* Recommendations Section */}
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {recommendations.map((rec, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
//             >
//               <h3 className="text-2xl font-bold text-indigo-600 mb-2">{rec.courseName}</h3>
//               <p className="text-sm text-gray-600">Platform: <span className="font-medium">{rec.platform}</span></p>
//               <p className="text-sm text-gray-600">Difficulty: <span className="font-medium">{rec.difficulty}</span></p>
//               <p className="text-sm text-gray-600">Duration: <span className="font-medium">{rec.duration}</span></p>
//               <p className="text-gray-700 mt-2">{rec.description}</p>
//               <p className="text-gray-700 mt-2 font-semibold">Relevance: <span className="font-normal">{rec.relevance}</span></p>
//               <div className="mt-4">
//                 <h4 className="font-semibold text-gray-800">Skills Gained:</h4>
//                 <div className="flex flex-wrap mt-2">
//                   {rec.skillsGained.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/userData/profile';
        const response = await axios.get(endpoint);
        console.log("We are here")
        setUser(response.data.user);
        setRecommendations(response.data.recommendations);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* User Profile Section */}
        <div className="flex items-center mb-12">
          <img
            src={user.profilePic || '/default-profile.png'}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-extrabold text-gray-800">{user.fullName}</h1>
            <p className="text-xl text-gray-600 mt-1">{user.gender}</p>
            <p className="text-md text-gray-500 mt-2">{user.username}</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">{rec.courseName}</h3>
              <p className="text-sm text-gray-600">Platform: <span className="font-medium">{rec.platform}</span></p>
              <p className="text-sm text-gray-600">Difficulty: <span className="font-medium">{rec.difficulty}</span></p>
              <p className="text-sm text-gray-600">Duration: <span className="font-medium">{rec.duration}</span></p>
              <p className="text-gray-700 mt-2">{rec.description}</p>
              <p className="text-gray-700 mt-2 font-semibold">Relevance: <span className="font-normal">{rec.relevance}</span></p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Skills Gained:</h4>
                <div className="flex flex-wrap mt-2">
                  {rec.skillsGained.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
