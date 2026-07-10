import ipetro1 from '../assets/images/projects/ipetro/ipetro-1.png';
import ipetro2 from '../assets/images/projects/ipetro/ipetro-2.png';
import ipetro3 from '../assets/images/projects/ipetro/ipetro-3.png';
import ipetro4 from '../assets/images/projects/ipetro/ipetro-4.png';
import ipetro5 from '../assets/images/projects/ipetro/ipetro-5.png';
import ipetro6 from '../assets/images/projects/ipetro/ipetro-6.png';
import ipetro7 from '../assets/images/projects/ipetro/ipetro-7.png';
import farm2screen1 from '../assets/images/projects/farm2screen/farm2screen-1.png';
import farm2screen2 from '../assets/images/projects/farm2screen/farm2screen-2.png';
import farm2screen3 from '../assets/images/projects/farm2screen/farm2screen-3.png';
import farm2screen4 from '../assets/images/projects/farm2screen/farm2screen-4.png';
import farm2screen5 from '../assets/images/projects/farm2screen/farm2screen-5.png';
import lumora1 from '../assets/images/projects/lumora/login.png';
import lumora2 from '../assets/images/projects/lumora/studentdashboard1.png';
import lumora3 from '../assets/images/projects/lumora/studentdashboard2.png';
import lumora4 from '../assets/images/projects/lumora/studentdashboard3.png';
import lumora5 from '../assets/images/projects/lumora/calendarstudentdashboard.png';
import lumora6 from '../assets/images/projects/lumora/academicstressprediction.png';
import lumora7 from '../assets/images/projects/lumora/aicompanion.png';
import lumora8 from '../assets/images/projects/lumora/aimoderation1.png';
import lumora9 from '../assets/images/projects/lumora/aimoderation2.png';
import lumora10 from '../assets/images/projects/lumora/counsellingsession.png';
import lumora11 from '../assets/images/projects/lumora/counsellingdashboard.png';
import lumora12 from '../assets/images/projects/lumora/crisis_email.png';
import retinal1 from '../assets/images/projects/retinal/retinal-1.png';
import retinal2 from '../assets/images/projects/retinal/retinal-2.png';
import retinal3 from '../assets/images/projects/retinal/retinal-3.png';
import retinal4 from '../assets/images/projects/retinal/retinal-4.png';
import exam1 from '../assets/images/projects/exam/exam-1.jpg';
import ipetrocover from '../assets/images/ipetro.png';
import farm2screencover from '../assets/images/farm2screen.png';
import lumoracover from '../assets/images/lumora.png';
import retinalcover from '../assets/images/retinal.png';
import examcover from '../assets/images/exam_management_system.png';

export const projects = [
  {
    id: 1,
    title: 'iPetro : Inspection Report Generator',
    description: 'iPetro : Inspection Report Generator is a web-based system designed to streamline the management and monitoring of industry-related operations. The platform allows users to efficiently handle data related to inventory, services, and operational records through a structured digital interface. It focuses on improving data organization, accessibility, and workflow efficiency within industrial environments. The system aims to modernize traditional manual processes by providing a centralized and user-friendly management solution.',
    technologies: ['PHP', 'Laravel', 'Blade', 'Node.js'],
    platform: 'Web Application',
    githubUrl: 'https://github.com/amircoderf/Workshop2-iPetro',
    coverImage: ipetrocover,
    images: [
      { src: ipetro1, caption: 'Main inspection dashboard' },
      { src: ipetro2, caption: 'Generated inspection report' },
      { src: ipetro3, caption: 'Inspection summary' },
      { src: ipetro4, caption: 'Photo Organization' },
      { src: ipetro5, caption: 'Bulk edit interface for photos' },
      { src: ipetro6, caption: 'Photo batch upload and sorting' },
      { src: ipetro7, caption: 'Main dashboard' }
    ],
    features: [
      'Inspection record tracking and management',
      'Automated API 510 Report generation',
      'Photo Organization and Storage',
      'Analytics Dashboard',
    ]
  },
  {
    id: 2,
    title: 'Farm2Screen',
    description: 'The Farm2screen is an innovative online marketplace designed to transform how farmers market and sell their pineapples directly to consumers, wholesalers, and businesses. Aligning with the project’s vision to transform the way people connect, shop and grow businesses online, the platform provides a convenient, trustworthy, and personalized e-commerce experience for both farmers and buyers. At its core, the platform empowers pineapple farmers by giving them the tools to list, promote, and manage their products online without relying on middlemen. The platform aims to support real-time pricing, streamline order management, and provide broader market exposure through increased online visibility and enable farmers to expand their customer base and boost sales.',
    technologies: ['Dart', 'Flutter', 'Firebase'],
    platform: 'Mobile Application (Cross-platform)',
    githubUrl: 'https://github.com/Shom3s/farm2screen',
    coverImage: farm2screencover,
    images: [
      { src: farm2screen1, caption: 'Sales Analytics screen' },
      { src: farm2screen2, caption: 'My products screen' },
      { src: farm2screen3, caption: 'Sales Analytics screen 2' },
      { src: farm2screen4, caption: '"Pineapple" product screen' },
      { src: farm2screen5, caption: 'Product details screen' }
    ],
    features: [
      'Real-time pricing and order management',
      'Direct farmer-to-customer transactions',
      'Market expansion through online visibility'
    ]
  },
  {
    id: 3,
    title: 'Lumora App (In Development)',
    description: 'Lumora is a smart mental health monitoring web application designed for university students to track their emotional well-being, identify early signs of stress or mental health risks, and receive personalized support. The platform provides continuous mental health monitoring through mood tracking, self-assessment journals, behavioral insights, and data-driven recommendations. Unlike generic wellness apps, Lumora integrates AI-driven emotional support and counsellor oversight, aiming to encourage self-awareness and proactive mental health care among students.',
    technologies: ['JavaScript', 'React.js', 'HTML & CSS', 'Express.js (Node.js framework)', 'MySQL'],
    platform: 'Web Application',
    githubUrl: 'https://github.com/harissuresh03/lumora-app',
    coverImage: lumoracover,
    images: [
      { src: lumora1, caption: 'Login Page' },
      { src: lumora2, caption: 'Student Dashboard' },
      { src: lumora3, caption: 'Student Dashboard' },
      { src: lumora4, caption: 'Student Dashboard' },
      { src: lumora5, caption: 'Mood Calendar in Student Dashboard' },
      { src: lumora6, caption: 'Academic Stress Predictor' },
      { src: lumora7, caption: 'AI Companion Chatbot' },
      { src: lumora8, caption: 'AI Moderation in Peer Community Page' },
      { src: lumora9, caption: 'AI Moderation Result' },
      { src: lumora10, caption: 'Counselling Session Scheduling' },
      { src: lumora11, caption: 'Counsellor Dashboard' },
      { src: lumora12, caption: 'Crisis Email Notification' }
    ],
    features: [
      'Real-time monitoring and analytics',
      'Automatic mood detection from conversations with AI Companion',
      'AI-Moderated Peer Support',
      'Academic Stress Prediction',
      'Personalized recommendations'
    ]
  },
  {
    id: 4,
    title: 'Exam Result Management System',
    description: 'The Exam Result Management System is a software application designed to streamline the process of recording, managing, and publishing students’ examination results. It serves as a centralized platform where teachers can input scores, generate reports, and provide students with secure access to their academic performance. The system aims to reduce manual errors, eliminate paperwork, and improve the efficiency and transparency of result handling. Students can view their results online, while administrators can generate reports and perform data analysis with ease.',
    technologies: ['PHP', 'Java', 'MySQL', 'Java Swing'],
    platform: 'Desktop Application',
    githubUrl: 'https://github.com/ThomsonTea/Exam-Result-Management-System',
    coverImage: examcover,
    images: [
      { src: exam1, caption: 'View and export marks to Google Sheets' }
    ],
    features: [
      'Student result entry',
      'Automated calculations',
      'Export results to Google Sheets'
    ]
  },
  {
    id: 5,
    title: 'Retinal Disease Detection',
    description: 'The Retinal Disease Detection System is an AI-powered application designed to assist in the early identification of retinal diseases from eye scan images. Using deep learning and convolutional neural networks (CNN), the system analyzes retinal images and predicts potential eye conditions with high accuracy. It includes image preprocessing, model inference, and a simple user interface for uploading and viewing predictions. The goal of this project is to support healthcare professionals by providing a fast, automated, and reliable screening tool for retinal disease detection.',
    technologies: ['Python', 'TensorFlow', 'NumPy', 'Pillow'],
    platform: 'Desktop Application',
    githubUrl: 'https://github.com/ThomsonTea/Retinal-Disease-Detection',
    coverImage: retinalcover,
    images: [
      { src: retinal1, caption: 'Main page before analysis' },
      { src: retinal2, caption: 'Main page after analysis' },
      { src: retinal3, caption: 'Using Teachable Machine to train the model' },
      { src: retinal4, caption: 'Dataset of all 4 retinal disease retrieved from Kaggle' }
    ],
    features: [
      'Image upload and analysis',
      'Automated retinal disease detection',
      'Report generation'
    ]
  }
];