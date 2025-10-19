import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;

    if (parsedUser && parsedUser._id) {
      // If user exists, go to the questionnaire page
      navigate('/question');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };

  return (
    <main className="flex-grow">
      {/* Quote Section */}
      <section className="bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 text-blue-900 py-10 shadow-inner">
        <blockquote className="text-center text-2xl italic font-serif max-w-4xl mx-auto leading-relaxed">
          “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
          <footer className="mt-3 text-base text-blue-700 font-medium">— Malcolm X</footer>
        </blockquote>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-32 px-6">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Unlock Your Potential with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
              Personalized Learning Paths
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto"
          >
            Discover your strengths, assess your skills, and receive tailored
            recommendations to advance your career journey — step by step.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-white text-blue-700 font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 text-lg transform hover:-translate-y-1"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 bg-gray-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50 to-transparent opacity-70"></div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-center mb-20 text-gray-800"
          >
            How It Works
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Register',
                text: 'Create your account and start your learning adventure.',
                icon: '📝',
                color: 'from-blue-500 to-indigo-600',
              },
              {
                title: 'Skill Assessment',
                text: 'Take an interactive test to identify your current level.',
                icon: '🧠',
                color: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Personalized Path',
                text: 'Receive AI-powered course suggestions and resources.',
                icon: '🚀',
                color: 'from-green-500 to-teal-500',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white/60 backdrop-blur-md rounded-2xl p-10 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-lg`}
                >
                  {step.icon}
                </div>
                <h4 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 text-center">
                  {index + 1}. {step.title}
                </h4>
                <p className="text-gray-600 text-center">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white py-10 text-center">
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} SkillPathFinder. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default HomePage;

