import React from 'react';

const UserDashboard = ({ user }) => {
  const achievements = [
    { icon: "🔥", name: "Learning Streak", progress: user.learningStreak, total: 30, description: "30 day learning streak" },
    { icon: "📚", name: "Course Completions", progress: user.completedCourses, total: 10, description: "Complete 10 courses" },
    { icon: "🏆", name: "Skill Mastery", progress: user.masteredSkills, total: 5, description: "Master 5 skills" },
    { icon: "🌟", name: "Top Performer", progress: user.topPerformerCount, total: 3, description: "Finish top 3 in your league" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg font-sans shadow-xl">
      {/* ... (previous code for user info and statistics remains the same) ... */}

      <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center mb-6">
            <div className="text-4xl mr-6">{achievement.icon}</div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-2">{achievement.name}</h3>
              <div className="bg-white bg-opacity-20 h-3 rounded-full">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-200 mt-1">{achievement.description}</p>
            </div>
            <span className="ml-4 text-lg font-semibold">{achievement.progress}/{achievement.total}</span>
          </div>
        ))}
        <button className="bg-white bg-opacity-20 text-white font-semibold py-2 px-6 rounded-full hover:bg-opacity-30 transition duration-300 transform hover:-translate-y-1">
          VIEW ALL ACHIEVEMENTS
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
