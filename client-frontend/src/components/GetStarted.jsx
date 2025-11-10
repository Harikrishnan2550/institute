// // src/components/GetStarted.jsx
// import React, { useState } from "react";

// export default function GetStarted() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});

//   const totalSteps = 10;

//   const questions = [
//     {
//       id: 1,
//       question: "What course are you interested in pursuing?",
//       options: [
//         "MBA", "M.COM", "MA", "MCA", "MLIS", "MSC", "MSW",
//         "B.COM", "BCOM+MBA", "BA", "BBA", "BBA+MBA",
//         "BCA", "BCA+MCA", "BSC", "PGDM"
//       ],
//     },
//     {
//       id: 2,
//       question: "What is your current education level?",
//       options: [
//         "High School", "Diploma", "Bachelor's Degree",
//         "Master's Degree", "Doctorate", "Other"
//       ],
//     },
//     {
//       id: 3,
//       question: "What is your preferred learning pace?",
//       options: [
//         "Self-Paced", "Structured Schedule", "Weekend Only",
//         "Evening Classes", "Full-Time", "Part-Time"
//       ],
//     },
//     {
//       id: 4,
//       question: "What is your budget range?",
//       options: [
//         "Under $5,000", "$5,000 - $10,000", "$10,000 - $20,000",
//         "$20,000 - $30,000", "$30,000+", "Flexible"
//       ],
//     },
//   ];

//   const selectOption = (stepId, option) => {
//     setSelectedOptions({ ...selectedOptions, [stepId]: option });
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
//   };

//   const previousStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const bookSession = () => {
//     alert("Redirecting to mentor booking page...");
//   };

//   return (
//     <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Let's Get Started
//         </h2>
//         <p className="text-lg text-gray-600">
//           Answer a few questions to receive personalized recommendations
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="flex justify-center items-center gap-2 mb-12">
//         {[1, 2, 3, 4].map((step, index) => (
//           <React.Fragment key={step}>
//             <div
//               className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
//                 step <= currentStep
//                   ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white scale-110 shadow-lg"
//                   : "bg-gray-200 text-gray-500 scale-90"
//               }`}
//             >
//               {step}
//             </div>
//             {index < totalSteps - 1 && (
//               <div
//                 className={`h-0.5 transition-all duration-500 ${
//                   step < currentStep
//                     ? "w-12 bg-gradient-to-r from-indigo-600 to-purple-600"
//                     : "w-6 bg-gray-200"
//                 }`}
//               ></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Question */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           {questions[currentStep - 1].question}
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {questions[currentStep - 1].options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => selectOption(currentStep, option)}
//               className={`p-5 rounded-xl border-2 transition-all duration-300 font-medium text-center relative overflow-hidden group ${
//                 selectedOptions[currentStep] === option
//                   ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white shadow-lg scale-105"
//                   : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-gray-50 hover:-translate-y-2 hover:shadow-md"
//               }`}
//             >
//               {option}
//               {selectedOptions[currentStep] === option && (
//                 <span className="absolute top-2 right-2 text-xl">✓</span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex gap-4 mt-12">
//         <button
//           onClick={previousStep}
//           disabled={currentStep === 1}
//           className="flex-1 py-4 px-8 rounded-xl bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 disabled:opacity-50"
//         >
//           ← Back
//         </button>
//         <button
//           onClick={nextStep}
//           disabled={currentStep === totalSteps}
//           className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 disabled:opacity-50"
//         >
//           Next →
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="text-center my-8 relative">
//         <span className="text-gray-400 font-semibold text-xl bg-white px-4 relative z-10">
//           OR
//         </span>
//         <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//       </div>

//       {/* Mentor CTA */}
//       <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl text-center relative overflow-hidden group">
//         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//         <div className="relative z-10">
//           <span className="text-5xl mb-4 block">📞</span>
//           <h3 className="text-3xl font-bold mb-4">
//             Prefer to Talk with a Mentor?
//           </h3>
//           <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
//             Schedule a one-on-one video session for personalized guidance
//             and instant answers to all your questions.
//           </p>
//           <button
//             onClick={bookSession}
//             className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-110 transition-all duration-300"
//           >
//             Book Video Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/GetStarted.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { qustions } from "../assets/Qustions";
// import { IndianStates } from "../assets/IndianStates";

// export default function GetStarted() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [agentId, setAgentId] = useState(null); // ✅ store agentId from URL
//   const [personalDetails, setPersonalDetails] = useState({
//     name: "",
//     email: "",
//     whatsapp: "",
//     alternate: "",
//     state: "",
//     city: "",
//     language: "",
//   });

//   const totalSteps = qustions.length + 1;
//   const questions = qustions;

//   // ✅ Detect agentId from URL (e.g. ?agentId=IEHPBSOF-00839)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const agentParam = urlParams.get("agentId") || urlParams.get("studentid");
//     if (agentParam) setAgentId(agentParam);
//   }, []);

//   // ✅ Submit form or go to next step
//   const handleNext = async () => {
//     if (currentStep === totalSteps) {
//       const payload = {
//         q1_experienceLevel: selectedOptions[1],
//         q2_previousITExperience: selectedOptions[2],
//         q2_previousRole: selectedOptions.role || "",
//         q3_education: selectedOptions[3],
//         q4_yearOfPassing: selectedOptions[4],
//         q5_interestArea: selectedOptions[5],
//         q6_jobAwareness: selectedOptions[6],
//         q7_preferredDomain: selectedOptions[7],
//         q8_careerGoal: selectedOptions[8],
//         q9_trainingTime: selectedOptions[9],
//         q10_guidanceCall: selectedOptions[10],
//         name: personalDetails.name,
//         email: personalDetails.email,
//         whatsappNumber: personalDetails.whatsapp,
//         alternativeNumber: personalDetails.alternate,
//         state: personalDetails.state,
//         city: personalDetails.city,
//         language: personalDetails.language,
//         agentId,
//       };

//       console.log("Submitting Payload:", payload);

//       try {
//         setLoading(true);
//         const url = agentId
//           ? `http://localhost:4000/api/carrer-form/submit?agentId=${agentId}`
//           : "http://localhost:4000/api/carrer-form/submit";

//         const res = await axios.post(url, payload, {
//           headers: { Authorization: "" }, // 🚫 Remove token for public submission
//         });

//         console.log("✅ Server Response:", res.data);

//         setShowPopup(true);
//         setTimeout(() => setShowPopup(false), 4000);
//       } catch (error) {
//         console.error("❌ Error submitting form:", error);
//         alert("Something went wrong while submitting. Please try again.");
//       } finally {
//         setLoading(false);
//       }

//       return;
//     }

//     const currentQ = questions[currentStep - 1];
//     if (currentStep <= qustions.length) {
//       if (
//         (currentQ.type === "input" &&
//           (!selectedOptions[currentStep] ||
//             selectedOptions[currentStep].trim() === "")) ||
//         (currentQ.type === "button" &&
//           !selectedOptions[currentStep] &&
//           currentQ.id !== 2)
//       ) {
//         alert("Please fill out this question before proceeding.");
//         return;
//       }
//     }

//     setCurrentStep((prev) => prev + 1);
//   };

//   const previousStep = () => {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   };

//   const bookSession = () => {
//     alert("Redirecting to mentor booking page...");
//   };

//   const currentQuestion = questions[currentStep - 1];
//   const canGoNext =
//     currentStep <= qustions.length
//       ? selectedOptions[currentStep] !== undefined &&
//         selectedOptions[currentStep] !== null &&
//         selectedOptions[currentStep] !== ""
//       : true;

//   return (
//     <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
//       {/* ✅ Success Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: -20 }}
//               transition={{ duration: 0.4, type: "spring" }}
//               className="relative bg-white shadow-2xl rounded-2xl px-10 py-8 text-center max-w-md mx-auto border-t-4 border-green-500"
//             >
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
//               >
//                 ✕
//               </button>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                 Your Details Have Been Submitted!
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Thank you for your time. Our team will contact you soon.
//               </p>
//               <motion.button
//                 onClick={() => setShowPopup(false)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition"
//               >
//                 Close
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Career Guidance – IT Course Recommendation Form
//         </h2>
//         <p className="text-lg text-gray-600">
//           Answer a few questions to receive personalized recommendations
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="flex justify-center items-center gap-2 mb-12">
//         {[...Array(totalSteps)].map((_, index) => (
//           <React.Fragment key={index}>
//             <div
//               className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
//                 index + 1 <= currentStep
//                   ? "bg-gradient-to-br from-green-300 to-green-800 text-white scale-110 shadow-lg"
//                   : "bg-gray-200 text-gray-500 scale-90"
//               }`}
//             >
//               {index + 1}
//             </div>
//             {index < totalSteps - 1 && (
//               <div
//                 className={`h-0.5 transition-all duration-500 ${
//                   index + 1 < currentStep ? "w-12 bg-black" : "w-6 bg-gray-200"
//                 }`}
//               ></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Question or Personal Details */}
//       <div className="mb-8">
//         {currentStep <= qustions.length ? (
//           <>
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
//               {currentQuestion.question}
//             </h3>

//             {currentQuestion.type === "button" ? (
//               <div className="flex justify-center">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {currentQuestion.options.map((option, index) => (
//                     <button
//                       key={index}
//                       className={`px-1 py-2 rounded-xl border-2 text-lg font-medium transition-all duration-300 ${
//                         selectedOptions[currentStep] === option
//                           ? "bg-green-700 text-white border-green-300 shadow-lg scale-105"
//                           : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-gray-50"
//                       }`}
//                       onClick={() =>
//                         setSelectedOptions({
//                           ...selectedOptions,
//                           [currentStep]: option,
//                         })
//                       }
//                     >
//                       {option}
//                     </button>
//                   ))}
//                   {currentQuestion.id === 2 && selectedOptions[2] === "Yes" && (
//                     <input
//                       type="text"
//                       placeholder={currentQuestion.inputPlaceholder}
//                       className="mt-4 w-full p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                       onChange={(e) =>
//                         setSelectedOptions({
//                           ...selectedOptions,
//                           role: e.target.value,
//                         })
//                       }
//                     />
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex justify-center">
//                 <input
//                   type="text"
//                   placeholder={currentQuestion.inputPlaceholder}
//                   value={selectedOptions[currentStep] || ""}
//                   onChange={(e) =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [currentStep]: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 />
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
//               Please Enter Your Personal Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={personalDetails.name}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     name: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={personalDetails.email}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     email: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="number"
//                 placeholder="WhatsApp Number"
//                 value={personalDetails.whatsapp}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     whatsapp: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="number"
//                 placeholder="Alternate Number"
//                 value={personalDetails.alternate}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     alternate: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <div className="flex flex-col md:flex-row gap-4">
//                 <select
//                   value={personalDetails.state}
//                   onChange={(e) =>
//                     setPersonalDetails({
//                       ...personalDetails,
//                       state: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 >
//                   <option value="">Select State</option>
//                   {IndianStates.map((state, i) => (
//                     <option key={i} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={personalDetails.city}
//                   onChange={(e) =>
//                     setPersonalDetails({
//                       ...personalDetails,
//                       city: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 />
//               </div>

//               <select
//                 value={personalDetails.language}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     language: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               >
//                 <option value="">Preferred Language</option>
//                 <option>Hindi</option>
//                 <option>Malayalam</option>
//                 <option>Kannada</option>
//                 <option>English</option>
//                 <option>Telugu</option>
//                 <option>Tamil</option>
//               </select>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex gap-4 mt-12 justify-center">
//         <button
//           onClick={previousStep}
//           disabled={currentStep === 1}
//           className="px-6 py-2 rounded-lg transition-all duration-300 text-gray-900 font-semibold text-lg bg-green-600 hover:bg-green-400 disabled:opacity-50"
//         >
//           Back
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={!canGoNext || loading}
//           className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : !canGoNext
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-400"
//           }`}
//         >
//           {loading
//             ? "Submitting..."
//             : currentStep === totalSteps
//             ? "Submit"
//             : "Next"}
//         </button>
//       </div>

//       {/* OR Divider */}
//       <div className="text-center my-8 relative">
//         <span className="text-gray-400 font-semibold text-xl bg-white px-4 relative z-10">
//           OR
//         </span>
//         <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//       </div>

//       {/* Mentor CTA */}
//       <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl text-center relative overflow-hidden group">
//         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//         <div className="relative z-10">
//           <span className="text-5xl mb-4 block">📞</span>
//           <h3 className="text-3xl font-bold mb-4">
//             Prefer to Talk with a Mentor?
//           </h3>
//           <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
//             Schedule a one-on-one video session for personalized guidance and
//             instant answers to all your questions.
//           </p>
//           <button
//             onClick={bookSession}
//             className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-110 transition-all duration-300"
//           >
//             Book Video Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/GetStarted.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "../api/axios"; // ✅ centralized axios
// import { qustions } from "../assets/Qustions";
// import { IndianStates } from "../assets/IndianStates";

// export default function GetStarted() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [agentId, setAgentId] = useState(null);
//   const [personalDetails, setPersonalDetails] = useState({
//     name: "",
//     email: "",
//     whatsapp: "",
//     alternate: "",
//     state: "",
//     city: "",
//     language: "",
//   });

//   const totalSteps = qustions.length + 1;
//   const questions = qustions;

//   // ✅ Detect agentId from URL (e.g. ?agentId=IEHPBSOF-00839)
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const agentParam = urlParams.get("agentId") || urlParams.get("studentid");
//     if (agentParam) setAgentId(agentParam);
//   }, []);

//   // ✅ Submit form or go to next step
//   const handleNext = async () => {
//     if (currentStep === totalSteps) {
//       const payload = {
//         q1_experienceLevel: selectedOptions[1],
//         q2_previousITExperience: selectedOptions[2],
//         q2_previousRole: selectedOptions.role || "",
//         q3_education: selectedOptions[3],
//         q4_yearOfPassing: selectedOptions[4],
//         q5_interestArea: selectedOptions[5],
//         q6_jobAwareness: selectedOptions[6],
//         q7_preferredDomain: selectedOptions[7],
//         q8_careerGoal: selectedOptions[8],
//         q9_trainingTime: selectedOptions[9],
//         q10_guidanceCall: selectedOptions[10],
//         name: personalDetails.name,
//         email: personalDetails.email,
//         whatsappNumber: personalDetails.whatsapp,
//         alternativeNumber: personalDetails.alternate,
//         state: personalDetails.state,
//         city: personalDetails.city,
//         language: personalDetails.language,
//         agentId,
//       };

//       console.log("Submitting Payload:", payload);

//       try {
//         setLoading(true);

//         // ✅ use dynamic URL
//         const endpoint = agentId
//           ? `/api/carrer-form/submit?agentId=${agentId}`
//           : "/api/carrer-form/submit";

//         const res = await axiosInstance.post(endpoint, payload);

//         console.log("✅ Server Response:", res.data);

//         setShowPopup(true);
//         setTimeout(() => setShowPopup(false), 4000);
//       } catch (error) {
//         console.error("❌ Error submitting form:", error);
//         alert("Something went wrong while submitting. Please try again.");
//       } finally {
//         setLoading(false);
//       }

//       return;
//     }

//     const currentQ = questions[currentStep - 1];
//     if (currentStep <= qustions.length) {
//       if (
//         (currentQ.type === "input" &&
//           (!selectedOptions[currentStep] ||
//             selectedOptions[currentStep].trim() === "")) ||
//         (currentQ.type === "button" &&
//           !selectedOptions[currentStep] &&
//           currentQ.id !== 2)
//       ) {
//         alert("Please fill out this question before proceeding.");
//         return;
//       }
//     }

//     setCurrentStep((prev) => prev + 1);
//   };

//   const previousStep = () => {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   };

//   const bookSession = () => {
//     alert("Redirecting to mentor booking page...");
//   };

//   const currentQuestion = questions[currentStep - 1];
//   const canGoNext =
//     currentStep <= qustions.length
//       ? selectedOptions[currentStep] !== undefined &&
//         selectedOptions[currentStep] !== null &&
//         selectedOptions[currentStep] !== ""
//       : true;

//   return (
//     <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
//       {/* ✅ Success Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: -20 }}
//               transition={{ duration: 0.4, type: "spring" }}
//               className="relative bg-white shadow-2xl rounded-2xl px-10 py-8 text-center max-w-md mx-auto border-t-4 border-green-500"
//             >
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
//               >
//                 ✕
//               </button>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                 Your Details Have Been Submitted!
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Thank you for your time. Our team will contact you soon.
//               </p>
//               <motion.button
//                 onClick={() => setShowPopup(false)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition"
//               >
//                 Close
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Career Guidance – IT Course Recommendation Form
//         </h2>
//         <p className="text-lg text-gray-600">
//           Answer a few questions to receive personalized recommendations
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="flex justify-center items-center gap-2 mb-12">
//         {[...Array(totalSteps)].map((_, index) => (
//           <React.Fragment key={index}>
//             <div
//               className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
//                 index + 1 <= currentStep
//                   ? "bg-gradient-to-br from-green-300 to-green-800 text-white scale-110 shadow-lg"
//                   : "bg-gray-200 text-gray-500 scale-90"
//               }`}
//             >
//               {index + 1}
//             </div>
//             {index < totalSteps - 1 && (
//               <div
//                 className={`h-0.5 transition-all duration-500 ${
//                   index + 1 < currentStep ? "w-12 bg-black" : "w-6 bg-gray-200"
//                 }`}
//               ></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Question or Personal Details */}
//       <div className="mb-8">
//         {currentStep <= qustions.length ? (
//           <>
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
//               {currentQuestion.question}
//             </h3>

//             {currentQuestion.type === "button" ? (
//               <div className="flex justify-center">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {currentQuestion.options.map((option, index) => (
//                     <button
//                       key={index}
//                       className={`px-1 py-2 rounded-xl border-2 text-lg font-medium transition-all duration-300 ${
//                         selectedOptions[currentStep] === option
//                           ? "bg-green-700 text-white border-green-300 shadow-lg scale-105"
//                           : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-gray-50"
//                       }`}
//                       onClick={() =>
//                         setSelectedOptions({
//                           ...selectedOptions,
//                           [currentStep]: option,
//                         })
//                       }
//                     >
//                       {option}
//                     </button>
//                   ))}
//                   {currentQuestion.id === 2 && selectedOptions[2] === "Yes" && (
//                     <input
//                       type="text"
//                       placeholder={currentQuestion.inputPlaceholder}
//                       className="mt-4 w-full p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                       onChange={(e) =>
//                         setSelectedOptions({
//                           ...selectedOptions,
//                           role: e.target.value,
//                         })
//                       }
//                     />
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex justify-center">
//                 <input
//                   type="text"
//                   placeholder={currentQuestion.inputPlaceholder}
//                   value={selectedOptions[currentStep] || ""}
//                   onChange={(e) =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [currentStep]: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 />
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
//               Please Enter Your Personal Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={personalDetails.name}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     name: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={personalDetails.email}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     email: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="number"
//                 placeholder="WhatsApp Number"
//                 value={personalDetails.whatsapp}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     whatsapp: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <input
//                 type="number"
//                 placeholder="Alternate Number"
//                 value={personalDetails.alternate}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     alternate: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               />
//               <div className="flex flex-col md:flex-row gap-4">
//                 <select
//                   value={personalDetails.state}
//                   onChange={(e) =>
//                     setPersonalDetails({
//                       ...personalDetails,
//                       state: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 >
//                   <option value="">Select State</option>
//                   {IndianStates.map((state, i) => (
//                     <option key={i} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={personalDetails.city}
//                   onChange={(e) =>
//                     setPersonalDetails({
//                       ...personalDetails,
//                       city: e.target.value,
//                     })
//                   }
//                   className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//                 />
//               </div>

//               <select
//                 value={personalDetails.language}
//                 onChange={(e) =>
//                   setPersonalDetails({
//                     ...personalDetails,
//                     language: e.target.value,
//                   })
//                 }
//                 className="p-3 border-2 rounded-lg focus:outline-none focus:border-indigo-600"
//               >
//                 <option value="">Preferred Language</option>
//                 <option>Hindi</option>
//                 <option>Malayalam</option>
//                 <option>Kannada</option>
//                 <option>English</option>
//                 <option>Telugu</option>
//                 <option>Tamil</option>
//               </select>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex gap-4 mt-12 justify-center">
//         <button
//           onClick={previousStep}
//           disabled={currentStep === 1}
//           className="px-6 py-2 rounded-lg transition-all duration-300 text-gray-900 font-semibold text-lg bg-green-600 hover:bg-green-400 disabled:opacity-50"
//         >
//           Back
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={!canGoNext || loading}
//           className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : !canGoNext
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-600 hover:bg-green-400"
//           }`}
//         >
//           {loading
//             ? "Submitting..."
//             : currentStep === totalSteps
//             ? "Submit"
//             : "Next"}
//         </button>
//       </div>

//       {/* OR Divider */}
//       <div className="text-center my-8 relative">
//         <span className="text-gray-400 font-semibold text-xl bg-white px-4 relative z-10">
//           OR
//         </span>
//         <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//       </div>

//       {/* Mentor CTA */}
//       <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl text-center relative overflow-hidden group">
//         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//         <div className="relative z-10">
//           <span className="text-5xl mb-4 block">📞</span>
//           <h3 className="text-3xl font-bold mb-4">
//             Prefer to Talk with a Mentor?
//           </h3>
//           <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
//             Schedule a one-on-one video session for personalized guidance and
//             instant answers to all your questions.
//           </p>
//           <button
//             onClick={bookSession}
//             className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-110 transition-all duration-300"
//           >
//             Book Video Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/GetStarted.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axios";
import { qustions } from "../assets/Qustions";
import { IndianStates } from "../assets/IndianStates";
import { SubCourses } from "../assets/Qustions"; // ✅ Using same file

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    whatsapp: "",
    alternate: "",
    state: "",
    city: "",
    language: "",
  });

  const totalSteps = qustions.length + 1;

  // ✅ Capture agentId or studentid from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const agentParam = urlParams.get("agentId") || urlParams.get("studentid");

    if (agentParam) {
      console.log("🧠 Agent ID found in URL:", agentParam);
      setAgentId(agentParam);
    } else {
      console.warn("⚠️ No agentId found in URL — using default for local test");
      setAgentId("AGT-0009"); // ✅ Fallback for local testing
    }
  }, []);

  // ✅ Handle Next / Submit
  const handleNext = async () => {
    if (currentStep === totalSteps) {
      const payload = {
        q1_experienceLevel: selectedOptions[1],
        q2_previousITExperience: selectedOptions[2],
        q2_previousRole: selectedOptions.role || "",
        q3_education: selectedOptions[3],
        q4_yearOfPassing: selectedOptions[4],
        q5_interestArea: selectedOptions[5],
        q6_jobAwareness: selectedOptions[6],
        q7_preferredDomain: selectedOptions[7],
        q7_subCourse: selectedOptions.subCourse || "",
        q8_careerGoal: selectedOptions[8],
        q9_trainingTime: selectedOptions[9],
        q10_guidanceCall: selectedOptions[10],
        name: personalDetails.name,
        email: personalDetails.email,
        whatsappNumber: personalDetails.whatsapp,
        alternativeNumber: personalDetails.alternate,
        state: personalDetails.state,
        city: personalDetails.city,
        language: personalDetails.language,
        agentId,
      };

      console.log("📦 Submitting form data:", payload);

      try {
        setLoading(true);
        const testAgent = agentId || "AGT-0009";
        const endpoint = `/api/carrer-form/submit?agentId=${testAgent}`;

        const res = await axiosInstance.post(endpoint, payload);
        console.log("✅ Form submitted successfully:", res.data);

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 4000);
      } catch (error) {
        console.error("❌ Submission failed:", error);
        if (error.response) {
          console.error("🧾 Backend Response:", error.response.data);
          alert(error.response.data.message || "Submission failed. Try again.");
        } else {
          alert("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // ✅ Validation before next
    const currentQ = qustions[currentStep - 1];
    if (currentStep <= qustions.length) {
      if (
        currentStep === 7 &&
        SubCourses[selectedOptions[7]] &&
        !selectedOptions.subCourse
      ) {
        alert("Please select a subcourse before proceeding.");
        return;
      }

      if (
        (currentQ.type === "input" &&
          (!selectedOptions[currentStep] ||
            selectedOptions[currentStep].trim() === "")) ||
        (currentQ.type === "button" &&
          !selectedOptions[currentStep] &&
          currentQ.id !== 2)
      ) {
        alert("Please fill out this question before proceeding.");
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const skipAllQuestions = () => {
    setCurrentStep(totalSteps);
  };

  const currentQuestion = qustions[currentStep - 1];

  const canGoNext =
    currentStep <= qustions.length
      ? selectedOptions[currentStep] !== undefined &&
        selectedOptions[currentStep] !== null &&
        selectedOptions[currentStep] !== ""
      : true;

  return (
    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
      {/* ✅ Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative bg-white shadow-2xl rounded-2xl px-10 py-8 text-center max-w-md mx-auto border-t-4 border-green-500"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Your Details Have Been Submitted!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for your time. Our team will contact you soon.
              </p>
              <motion.button
                onClick={() => setShowPopup(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-600 transition"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Career Guidance – IT Course Recommendation Form
        </h2>
        <p className="text-lg text-gray-600">
          Answer a few questions to receive personalized recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center items-center gap-2 mb-12">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                index + 1 <= currentStep
                  ? "bg-gradient-to-br from-green-300 to-green-800 text-white scale-110 shadow-lg"
                  : "bg-gray-200 text-gray-500 scale-90"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-0.5 transition-all duration-500 ${
                  index + 1 < currentStep ? "w-12 bg-black" : "w-6 bg-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Question or Form */}
      <div className="mb-8">
        {currentStep <= qustions.length ? (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {currentQuestion.question}
            </h3>

            {/* Skip Button */}
            {currentStep === 1 && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={skipAllQuestions}
                  className="px-6 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg font-semibold shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-200"
                >
                  ⏩ Skip All Questions
                </button>
              </div>
            )}

            {currentQuestion.type === "button" ? (
              <div className="flex justify-center w-full">
                <div
                  className={`grid gap-4 ${
                    currentStep === 1
                      ? "grid-cols-2 justify-items-center"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      className={`px-4 py-3 rounded-xl border-2 text-lg font-medium transition-all duration-300 ${
                        selectedOptions[currentStep] === option
                          ? "bg-green-700 text-white border-green-300 shadow-lg scale-105"
                          : "bg-white border-gray-200 text-gray-700 hover:border-green-500 hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [currentStep]: option,
                          subCourse: "",
                        })
                      }
                    >
                      {option}
                    </button>
                  ))}

                  {currentQuestion.id === 2 && selectedOptions[2] === "Yes" && (
                    <input
                      type="text"
                      placeholder={currentQuestion.inputPlaceholder}
                      className="mt-4 w-full p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          role: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder={currentQuestion.inputPlaceholder}
                  value={selectedOptions[currentStep] || ""}
                  onChange={(e) =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [currentStep]: e.target.value,
                    })
                  }
                  className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>
            )}

            {/* ✅ Subcourse Dropdown */}
            {currentStep === 7 &&
              selectedOptions[7] &&
              SubCourses[selectedOptions[7]] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-6"
                >
                  <select
                    value={selectedOptions.subCourse || ""}
                    onChange={(e) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        subCourse: e.target.value,
                      })
                    }
                    className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                  >
                    <option value="">Select Subcourse</option>
                    {SubCourses[selectedOptions[7]].map((sub, i) => (
                      <option key={i} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
          </>
        ) : (
          <>
            {/* ✅ Final Step — Personal Details */}
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Please Enter Your Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "WhatsApp Number", key: "whatsapp" },
                { label: "Alternate Number", key: "alternate" },
              ].map((f, i) => (
                <input
                  key={i}
                  type={f.key.includes("email") ? "email" : "text"}
                  placeholder={f.label}
                  value={personalDetails[f.key]}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      [f.key]: e.target.value,
                    })
                  }
                  className="p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                />
              ))}

              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={personalDetails.state}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      state: e.target.value,
                    })
                  }
                  className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                >
                  <option value="">Select State</option>
                  {IndianStates.map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="City"
                  value={personalDetails.city}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      city: e.target.value,
                    })
                  }
                  className="w-full md:w-1/2 p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <select
                value={personalDetails.language}
                onChange={(e) =>
                  setPersonalDetails({
                    ...personalDetails,
                    language: e.target.value,
                  })
                }
                className="p-3 border-2 rounded-lg focus:outline-none focus:border-green-600"
              >
                <option value="">Preferred Language</option>
                <option>Hindi</option>
                <option>Malayalam</option>
                <option>Kannada</option>
                <option>English</option>
                <option>Telugu</option>
                <option>Tamil</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12 justify-center">
        <button
          onClick={previousStep}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold text-lg hover:bg-green-500 disabled:opacity-50"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoNext || loading}
          className={`px-6 py-2 rounded-lg font-semibold text-white text-lg transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : !canGoNext && currentStep <= qustions.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading
            ? "Submitting..."
            : currentStep === totalSteps
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
