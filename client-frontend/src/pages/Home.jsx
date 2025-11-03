// // import React from 'react'

// // function Home() {
// //   return (
// //     <div>
// //       <h1></h1>
// //     </div>
// //   )
// // }

// // export default Home

// import React, { useState } from 'react';

// export default function UniversitySelection() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});

//   const totalSteps = 4;

//   const questions = [
//     {
//       id: 1,
//       question: "Why are you pursuing this course?",
//       options: ["For Promotion", "New Job", "For Privilege", "Career Upgradation", "Learning New Skills", "Salary Hike"]
//     },
//     {
//       id: 2,
//       question: "What is your current education level?",
//       options: ["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"]
//     },
//     {
//       id: 3,
//       question: "What is your preferred learning pace?",
//       options: ["Self-Paced", "Structured Schedule", "Weekend Only", "Evening Classes", "Full-Time", "Part-Time"]
//     },
//     {
//       id: 4,
//       question: "What is your budget range?",
//       options: ["Under $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "$20,000 - $30,000", "$30,000+", "Flexible"]
//     }
//   ];

//   const processSteps = [
//     {
//       number: 1,
//       title: "Share Your Goals",
//       description: "Fill out a questionnaire about your interests, background, and career aspirations. Alternatively, schedule a video session with our mentors for personalized guidance."
//     },
//     {
//       number: 2,
//       title: "We Research",
//       description: "Our experienced mentors and research team analyze hundreds of programs to find the best matches based on your unique profile and preferences."
//     },
//     {
//       number: 3,
//       title: "Get Suggestions",
//       description: "Receive curated university recommendations with detailed insights on pros, cons, and how each program aligns with your goals."
//     },
//     {
//       number: 4,
//       title: "Enroll & Succeed",
//       description: "Complete your registration with our support and begin your journey toward academic excellence and career advancement."
//     }
//   ];

//   const selectOption = (stepId, option) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [stepId]: option
//     });
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const previousStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const bookSession = () => {
//     alert('Redirecting to mentor booking page...');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center text-white mb-12 animate-fade-in-down">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
//             🎓 Find Your Perfect University
//           </h1>
//           <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
//             Discover the best online and distance learning programs tailored to your goals and aspirations
//           </p>
//         </div>

//         {/* Process Overview */}
//         <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-fade-in-up">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-800 mb-2">How It Works</h2>
//             <p className="text-xl text-gray-600">Simple, guided process to find your ideal educational path</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {processSteps.map((step) => (
//               <div
//                 key={step.number}
//                 className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-indigo-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
//               >
//                 <div className="absolute -top-4 left-5 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                   {step.number}
//                 </div>
//                 <h3 className="text-gray-800 text-xl font-bold mb-4 mt-4">{step.title}</h3>
//                 <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Interactive Form */}
//         <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up-delay">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">Let's Get Started</h2>
//             <p className="text-lg text-gray-600">Answer a few questions to receive personalized recommendations</p>
//           </div>

//           {/* Progress Bar */}
//           <div className="flex justify-center items-center gap-2 mb-12">
//             {[1, 2, 3, 4].map((step, index) => (
//               <React.Fragment key={step}>
//                 <div
//                   className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
//                     step <= currentStep
//                       ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white scale-110 shadow-lg'
//                       : 'bg-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {index < 3 && (
//                   <div className="w-6 h-0.5 bg-gray-200"></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Question */}
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//               {questions[currentStep - 1].question}
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {questions[currentStep - 1].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => selectOption(currentStep, option)}
//                   className={`p-5 rounded-xl border-2 transition-all duration-300 font-medium text-center ${
//                     selectedOptions[currentStep] === option
//                       ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg scale-105'
//                       : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-gray-50 hover:-translate-y-1'
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex gap-4 mt-12">
//             <button
//               onClick={previousStep}
//               disabled={currentStep === 1}
//               className="flex-1 py-4 px-8 rounded-xl bg-gray-100 text-gray-700 font-semibold text-lg transition-all duration-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={nextStep}
//               disabled={currentStep === totalSteps}
//               className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next →
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="text-center my-8">
//             <span className="text-gray-400 font-semibold text-xl">OR</span>
//           </div>

//           {/* Mentor CTA */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl text-center">
//             <h3 className="text-3xl font-bold mb-4">Prefer to Talk with a Mentor?</h3>
//             <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
//               Schedule a one-on-one video session for personalized guidance and instant answers to all your questions
//             </p>
//             <button
//               onClick={bookSession}
//               className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               📞 Book Video Session
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-down {
//           animation: fadeInDown 0.8s ease;
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease;
//         }

//         .animate-fade-in-up-delay {
//           animation: fadeInUp 1s ease;
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function Home() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const totalSteps = 4;

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const questions = [
//     {
//       id: 1,
//       question: "What course are you interested in pursuing?",
//       options: [
//         "MBA",
//         "M.COM",
//         "MA",
//         "MCA",
//         "MLIS",
//         "MSC",
//         "MSW",
//         "B.COM",
//         "BCOM+MBA",
//         "BA",
//         "BBA",
//         "BBA+MBA",
//         "BCA",
//         "BCA+MCA",
//         "BSC",
//         "PGDM"
//       ],
//     },
//     {
//       id: 2,
//       question: "What is your current education level?",
//       options: [
//         "High School",
//         "Diploma",
//         "Bachelor's Degree",
//         "Master's Degree",
//         "Doctorate",
//         "Other",
//       ],
//     },
//     {
//       id: 3,
//       question: "What is your preferred learning pace?",
//       options: [
//         "Self-Paced",
//         "Structured Schedule",
//         "Weekend Only",
//         "Evening Classes",
//         "Full-Time",
//         "Part-Time",
//       ],
//     },
//     {
//       id: 4,
//       question: "What is your budget range?",
//       options: [
//         "Under $5,000",
//         "$5,000 - $10,000",
//         "$10,000 - $20,000",
//         "$20,000 - $30,000",
//         "$30,000+",
//         "Flexible",
//       ],
//     },
//   ];

//   const processSteps = [
//     {
//       number: 1,
//       title: "Questionnaire or Video Session",
//       description:
//         "Questionnaire: Fill accurate details based on your interest and background.",
//       description2:
//         " Video Session: Mentor will help you in clarification and deep understanding of your interest and background.",
//     },
//     {
//       number: 2,
//       title: "Finding Suitable Online/Distance University",
//       description:
//         "Based on your answer, our mentors and research team will find the best and suitable online/distance university for the candidate.",
//     },
//     {
//       number: 3,
//       title: "Online/Distance University Suggestions",
//       description:
//         "Mentors will get in touch with the candidate regarding the best and suitable online/distance university. Will discuss the pros and cons of the options which the candidate has, and will be submitting a report to the candidate.",
//     },
//     {
//       number: 4,
//       title: "University Registration",
//       description:
//         "Based on the report candidates will be able to select the best and suitable online/distance university for them. Then comes Online/Distance University Registration.",
//     },
//   ];

//   const selectOption = (stepId, option) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [stepId]: option,
//     });
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const previousStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const bookSession = () => {
//     alert("Redirecting to mentor booking page...");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="floating-blob blob-1"></div>
//         <div className="floating-blob blob-2"></div>
//         <div className="floating-blob blob-3"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Hero Section */}
//         <div
//           className={`text-center text-white mb-12 transition-all duration-1000 transform ${
//             isVisible
//               ? "translate-y-0 opacity-100"
//               : "-translate-y-10 opacity-0"
//           }`}
//         >
//           <div className="inline-block mb-4 animate-bounce-slow">
//             <span className="text-7xl">🎓</span>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg  bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent bg-[length:200%_auto]">
//             Online & Distance University Selection Made Easy
//           </h1>
//         </div>

//         {/* Process Overview */}
//         <div
//           className={`bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl transition-all duration-1000 delay-200 transform ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-800 mb-2 animate-slide-in-left">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 animate-slide-in-right">
//               Simple, guided process to find your ideal educational path
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {processSteps.map((step, index) => (
//               <div
//                 key={step.number}
//                 className={`relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-indigo-600 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group cursor-pointer animate-scale-in`}
//                 style={{ animationDelay: `${index * 150}ms` }}
//                 onMouseEnter={() => setHoveredCard(step.number)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div
//                   className={`absolute -top-4 left-5 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500 ${
//                     hoveredCard === step.number
//                       ? "scale-125 rotate-12"
//                       : "scale-100 rotate-0"
//                   }`}
//                 >
//                   {step.number}
//                 </div>

//                 <h3 className="text-gray-800 text-xl font-bold mb-4 mt-4 group-hover:text-indigo-600 transition-colors duration-300">
//                   {step.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600 leading-relaxed text-sm">
//                   {step.number === 1 ? (
//                     <>
//                       <strong>Questionnaire:</strong> Fill accurate details
//                       based on your interest and background.
//                     </>
//                   ) : (
//                     step.description
//                   )}
//                 </p>

//                 {/* Description2 only for step 1 */}
//                 {step.description2 && (
//                   <p className="text-gray-600 leading-relaxed text-sm mt-2">
//                     <strong>Video Session:</strong> Mentor will help you in
//                     clarification and deep understanding of your interest and
//                     background.
//                   </p>
//                 )}

//                 {/* Shimmer effect on hover */}
//                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
//                   <div className="shimmer-effect"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Interactive Form */}
//         <div
//           className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 delay-400 transform ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}
//         >
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-pulse-slow">
//               Let's Get Started
//             </h2>
//             <p className="text-lg text-gray-600">
//               Answer a few questions to receive personalized recommendations
//             </p>
//           </div>

//           {/* Progress Bar */}
//           <div className="flex justify-center items-center gap-2 mb-12">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((step, index) => (
//               <React.Fragment key={step}>
//                 <div
//                   className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
//                     step <= currentStep
//                       ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white scale-110 shadow-lg animate-bounce-in"
//                       : "bg-gray-200 text-gray-500 scale-90"
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {index < 3 && (
//                   <div
//                     className={`h-0.5 transition-all duration-500 ${
//                       step < currentStep
//                         ? "w-12 bg-gradient-to-r from-indigo-600 to-purple-600"
//                         : "w-6 bg-gray-200"
//                     }`}
//                   ></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Question */}
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center animate-slide-down">
//               {questions[currentStep - 1].question}
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {questions[currentStep - 1].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => selectOption(currentStep, option)}
//                   className={`p-5 rounded-xl border-2 transition-all duration-300 font-medium text-center relative overflow-hidden group animate-fade-in-up ${
//                     selectedOptions[currentStep] === option
//                       ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg scale-105 animate-pop-in"
//                       : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-gray-50 hover:-translate-y-2 hover:shadow-md"
//                   }`}
//                   style={{ animationDelay: `${index * 80}ms` }}
//                 >
//                   {option}
//                   {selectedOptions[currentStep] === option && (
//                     <span className="absolute top-2 right-2 text-xl animate-scale-in">
//                       ✓
//                     </span>
//                   )}

//                   {/* Ripple effect on click */}
//                   <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-30 transition-opacity duration-200 pointer-events-none"></span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex gap-4 mt-12">
//             <button
//               onClick={previousStep}
//               disabled={currentStep === 1}
//               className="flex-1 py-4 px-8 rounded-xl bg-gray-100 text-gray-700 font-semibold text-lg transition-all duration-300 hover:bg-gray-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={nextStep}
//               disabled={currentStep === totalSteps}
//               className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 animate-pulse-glow"
//             >
//               Next →
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="text-center my-8 relative">
//             <span className="text-gray-400 font-semibold text-xl bg-white px-4 relative z-10 animate-fade-in">
//               OR
//             </span>
//             <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//           </div>

//           {/* Mentor CTA */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl text-center relative overflow-hidden group animate-float">
//             <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="inline-block mb-4 animate-wiggle">
//                 <span className="text-5xl">📞</span>
//               </div>
//               <h3 className="text-3xl font-bold mb-4">
//                 Prefer to Talk with a Mentor?
//               </h3>
//               <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
//                 Schedule a one-on-one video session for personalized guidance
//                 and instant answers to all your questions
//               </p>
//               <button
//                 onClick={bookSession}
//                 className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-110 active:scale-95 animate-pulse-slow"
//               >
//                 Book Video Session
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Floating Blobs Background */
//         .floating-blob {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(60px);
//           opacity: 0.3;
//           animation: float 8s ease-in-out infinite;
//         }

//         .blob-1 {
//           width: 400px;
//           height: 400px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           top: -100px;
//           left: -100px;
//           animation-delay: 0s;
//         }

//         .blob-2 {
//           width: 350px;
//           height: 350px;
//           background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
//           bottom: -100px;
//           right: -100px;
//           animation-delay: 2s;
//         }

//         .blob-3 {
//           width: 300px;
//           height: 300px;
//           background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//           top: 50%;
//           left: 50%;
//           animation-delay: 4s;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 30px) scale(0.9);
//           }
//         }

//         /* Text Shimmer */
//         @keyframes text-shimmer {
//           0% {
//             background-position: 0% center;
//           }
//           100% {
//             background-position: 200% center;
//           }
//         }

//         .animate-text-shimmer {
//           animation: text-shimmer 3s linear infinite;
//         }

//         /* Bounce Slow */
//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .animate-bounce-slow {
//           animation: bounce-slow 2s ease-in-out infinite;
//         }

//         /* Scale In */
//         @keyframes scale-in {
//           0% {
//             opacity: 0;
//             transform: scale(0.8);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .animate-scale-in {
//           animation: scale-in 0.5s ease-out forwards;
//         }

//         /* Fade In Slow */
//         @keyframes fade-in-slow {
//           0% {
//             opacity: 0;
//           }
//           100% {
//             opacity: 1;
//           }
//         }

//         .animate-fade-in-slow {
//           animation: fade-in-slow 1.5s ease-out;
//         }

//         /* Slide In Left */
//         @keyframes slide-in-left {
//           0% {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-slide-in-left {
//           animation: slide-in-left 0.8s ease-out;
//         }

//         /* Slide In Right */
//         @keyframes slide-in-right {
//           0% {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-slide-in-right {
//           animation: slide-in-right 0.8s ease-out;
//         }

//         /* Slide Down */
//         @keyframes slide-down {
//           0% {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slide-down {
//           animation: slide-down 0.5s ease-out;
//         }

//         /* Fade In Up */
//         @keyframes fade-in-up {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.4s ease-out forwards;
//         }

//         /* Fade In */
//         @keyframes fade-in {
//           0% {
//             opacity: 0;
//           }
//           100% {
//             opacity: 1;
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }

//         /* Pop In */
//         @keyframes pop-in {
//           0% {
//             transform: scale(0.8);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         .animate-pop-in {
//           animation: pop-in 0.3s ease-out;
//         }

//         /* Bounce In */
//         @keyframes bounce-in {
//           0% {
//             transform: scale(0.5);
//           }
//           50% {
//             transform: scale(1.1);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         .animate-bounce-in {
//           animation: bounce-in 0.5s ease-out;
//         }

//         /* Pulse Slow */
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s ease-in-out infinite;
//         }

//         /* Pulse Glow */
//         @keyframes pulse-glow {
//           0%,
//           100% {
//             box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
//           }
//           50% {
//             box-shadow: 0 4px 20px rgba(102, 126, 234, 0.6);
//           }
//         }

//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }

//         /* Float */
//         @keyframes float-gentle {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-8px);
//           }
//         }

//         .animate-float {
//           animation: float-gentle 3s ease-in-out infinite;
//         }

//         /* Wiggle */
//         @keyframes wiggle {
//           0%,
//           100% {
//             transform: rotate(0deg);
//           }
//           25% {
//             transform: rotate(-5deg);
//           }
//           75% {
//             transform: rotate(5deg);
//           }
//         }

//         .animate-wiggle {
//           animation: wiggle 1s ease-in-out infinite;
//         }

//         /* Shimmer Effect */
//         .shimmer-effect {
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(
//             90deg,
//             transparent,
//             rgba(255, 255, 255, 0.3),
//             transparent
//           );
//           animation: shimmer 1.5s ease-in-out;
//         }

//         @keyframes shimmer {
//           0% {
//             left: -100%;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import GetStarted from "../components/GetStarted"; // 👈 new import

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const processSteps = [
    {
      number: 1,
      title: "Questionnaire or Video Session",
      description:
        "Questionnaire: Fill accurate details based on your interest and background.",
      description2:
        "Video Session: Mentor will help you in clarification and deep understanding of your interest and background.",
    },
    {
      number: 2,
      title: "Finding Suitable Online/Distance University",
      description:
        "Based on your answer, our mentors and research team will find the best and suitable online/distance university for the candidate.",
    },
    {
      number: 3,
      title: "Online/Distance University Suggestions",
      description:
        "Mentors will get in touch with the candidate regarding the best and suitable online/distance university. Will discuss the pros and cons of the options which the candidate has, and will be submitting a report to the candidate.",
    },
    {
      number: 4,
      title: "University Registration",
      description:
        "Based on the report candidates will be able to select the best and suitable online/distance university for them. Then comes Online/Distance University Registration.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300  to-green-800 p-8 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-blob blob-1"></div>
        <div className="floating-blob blob-2"></div>
        <div className="floating-blob blob-3"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div
          className={`text-center text-white mb-12 transition-all duration-1000 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block mb-4 animate-bounce-slow">
            <span className="text-7xl">🎓</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent bg-[length:200%_auto]">
            Online & Distance University Selection Made Easy
          </h1>
        </div>

        {/* Process Section */}
        <div
          className={`bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl transition-all duration-1000 delay-200 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2 animate-slide-in-left">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-right">
              Simple, guided process to find your ideal educational path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-green-700 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group cursor-pointer`}
                onMouseEnter={() => setHoveredCard(step.number)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`absolute -top-4 left-5 w-10 h-10 bg-gradient-to-br from-green-300  to-green-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500 ${
                    hoveredCard === step.number
                      ? "scale-125 rotate-12"
                      : "scale-100 rotate-0"
                  }`}
                >
                  {step.number}
                </div>

                <h3 className="text-gray-800 text-xl font-bold mb-4 mt-4 group-hover:text-green-700 transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>

                {step.description2 && (
                  <p className="text-gray-600 leading-relaxed text-sm mt-2">
                    {step.description2}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Get Started Section (Now a Separate Component) */}
        <GetStarted />
      </div>
    </div>
  );
}
