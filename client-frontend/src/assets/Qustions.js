// export const qustions = [
//   {
//     id: 1,
//     question: "Are you a Fresher or Experienced Professional?",
//     type: "button",
//     options: [" Fresher ", " Experienced "],
//   },
//   {
//     id: 2,
//     question: "Do you have any previous experience in the IT field?",
//     type: "button",
//     options: [" Yes ", " No "],
//     inputPlaceholder: "If Yes, please mention your previous role/area",
//   },
//   {
//     id: 3,
//     question: "What is your highest educational qualification?",
//     type: "input",
//     inputPlaceholder: "Example: B.Sc Computer Science, B.Tech ECE, B.Com, etc.",
//   },
//   {
//     id: 4,
//     question: "Year of passing:",
//     type: "input",
//     inputPlaceholder: "Enter year of passing",
//   },
//   {
//     id: 5,
//     question: "Are you more interested in:",
//     type: "button",
//     options: [
//       " Programming / Coding-related courses ",
//       " Non-coding courses ",
//       " Not sure yet ",
//     ],
//   },
//   {
//     id: 6,
//     question: "Do you have an idea about current job opportunities in the IT industry?",
//     type: "button",
//     options: [" Yes, I have some idea ", " No, I would like to know more "],
//   },
//   {
//     id: 7,
//     question: "Which area of IT do you find more appealing?",
//     type: "button",
//     options: [
//       "Fullstack",
//       "Cloud & DevOps",
//       "Networking / Infrastructure",
//       "Cybersecurity",
//       "Data Analytics / Data Science",
//       "Testing",
//       "Not sure, need guidance",
//     ],
//   },
//   {
//     id: 8,
//     question: "What is your main career goal?",
//     type: "button",
//     options: [
//       "To get a job in IT",
//       "To switch to a better domain",
//       "To upskill for growth in current job",
//       "To explore career options",
//     ],
//   },
//   {
//     id: 9,
//     question: "How much time can you dedicate for training?",
//     type: "button",
//     options: [
//       "1–2 hours per day",
//       "2–4 hours per day",
//       "Weekends only",
//     ],
//   },
//   {
//     id: 10,
//     question: "Would you like to receive a personalized course & career guidance call?",
//     type: "button",
//     options: ["Yes", "No"],
//   },
// ];



// // ✅ Temporary placeholder subcourses (edit anytime later)
// export const SubCourses = {
//   "Fullstack": ["MBA - 1", "MBA - 2", "MBA - 3"],
//   "Cloud & DevOps": ["MBA - 4", "MBA - 5", "MBA - 6"],
//   "Networking / Infrastructure": ["MBA - 7", "MBA - 8", "MBA - 9"],
//   "Cybersecurity": ["MBA - 10", "MBA - 11", "MBA - 12"],
//   "Data Analytics / Data Science": ["MBA - 13", "MBA - 14", "MBA - 15"],
//   "Testing": ["MBA - 16", "MBA - 17", "MBA - 18"],
//   "Not sure, need guidance": ["MBA - 19", "MBA - 20", "MBA - 21"],
// };


export const qustions = [
  {
    id: 1,
    question: "Are you a Fresher or Experienced Professional?",
    type: "button",
    options: ["Fresher", "Experienced"],
  },
  {
    id: 2,
    question: "Do you have any previous experience in the IT field?",
    type: "button",
    options: ["Yes", "No"],
    inputPlaceholder: "If Yes, please mention your previous role/area",
  },
  {
    id: 3,
    question: "What is your highest educational qualification?",
    type: "input",
    inputPlaceholder: "Example: B.Sc Computer Science, B.Tech ECE, B.Com, etc.",
  },
  {
    id: 4,
    question: "Year of passing:",
    type: "input",
    inputPlaceholder: "Enter year of passing",
  },
  {
    id: 5,
    question: "Are you more interested in:",
    type: "button",
    options: [
      "Programming / Coding-related courses",
      "Non-coding courses",
      "Not sure yet",
    ],
  },
  {
    id: 6,
    question:
      "Do you have an idea about current job opportunities in the IT industry?",
    type: "button",
    options: ["Yes, I have some idea", "No, I would like to know more"],
  },
  {
    id: 7,
    question: "Which area of IT do you find more appealing?",
    type: "button",
    options: [
      "Networking",
      "Cloud & DevOps",
      "Cyber Security",
      "Data Science",
      "Fullstack",
      "Designing and Web Development",
      "Software Testing",
      "Server and Development",
      "Not sure, need guidance",
    ],
  },
  {
    id: 8,
    question: "What is your main career goal?",
    type: "button",
    options: [
      "To get a job in IT",
      "To switch to a better domain",
      "To upskill for growth in current job",
      "To explore career options",
    ],
  },
  {
    id: 9,
    question: "How much time can you dedicate for training?",
    type: "button",
    options: ["1–2 hours per day", "2–4 hours per day", "Weekends only"],
  },
  {
    id: 10,
    question:
      "Would you like to receive a personalized course & career guidance call?",
    type: "button",
    options: ["Yes", "No"],
  },
];

// ✅ Updated subcourse structure — perfectly mapped to Step 7
export const SubCourses = {
  Networking: [
    "CCNA",
    "CCNP Enterprise",
    "CCNP Security",
    "CCNP Collaboration",
    "Palo Alto Firewall",
    "Fortinet Firewall",
    "Aruba Network",
  ],

  "Cloud & DevOps": [
    "AWS Cloud",
    "Azure Cloud",
    "Google Cloud",
    "DevOps",
    "DevSecOps",
  ],

  "Cyber Security": ["SOC", "CEH", "Cyber Forensic", "CompTIA+"],

  "Data Science": ["Data Analytics", "Data Science", "Machine Learning / AI"],

  Fullstack: ["MERN Stack", "Python Fullstack", "Java Fullstack"],

  "Designing and Web Development": ["UI/UX", "Flutter"],

  "Software Testing": ["Automation Testing"],

  "Server and Development": ["MCSA", "MCSE", "Linux", "Python", "Salesforce"],

  "Not sure, need guidance": ["General IT Career Counseling"],
};















