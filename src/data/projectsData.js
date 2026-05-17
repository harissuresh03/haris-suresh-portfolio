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
import lumora1 from '../assets/images/projects/lumora/lumora.png';
import retinal1 from '../assets/images/projects/retinal/retinal-1.png';
import retinal2 from '../assets/images/projects/retinal/retinal-2.png';
import retinal3 from '../assets/images/projects/retinal/retinal-3.png';
import exam1 from '../assets/images/projects/exam/exam-1.png';
import ipetrocover from '../assets/images/ipetro.png';
import farm2screencover from '../assets/images/farm2screen.png';
import lumoracover from '../assets/images/lumora.png';
import retinalcover from '../assets/images/retinal.png';
import examcover from '../assets/images/exam_management_system.png';

export const projects = [
  {
    id: 1,
    title: 'iPetro : Inspection Report Generator',
    description: 'iPetro : Inspection Report Generator is a web-based system designed to streamline the management and monitoring of industry-related operations and workshop activities. The platform allows users to efficiently handle data related to inventory, services, and operational records through a structured digital interface. It focuses on improving data organization, accessibility, and workflow efficiency within industrial environments. The system aims to modernize traditional manual processes by providing a centralized and user-friendly management solution.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
    platform: 'Web Application',
    githubUrl: 'https://github.com/amircoderf/Workshop2-iPetro',
    languages: 'Java, JavaScript, SQL',
    coverImage: ipetrocover,
    images: [
      ipetro1,
      ipetro2,
      ipetro3,
      ipetro4,
      ipetro5,
      ipetro6,
      ipetro7
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
    description: 'Farm2Screen is a mobile/web application designed to empower pineapple farmers and entrepreneurs by connecting them directly with customers and improving farm-to-market access. The system features intuitive interfaces for both business owners and buyers, including daily sales summaries, product management dashboards, order tracking, interactive maps for farm locations, and customer browsing with cart and checkout functions. Through its user-centric design and real-time analytics, Farm2Screen aims to support agricultural businesses by increasing visibility, enhancing operational efficiency, and facilitating seamless transactions between producers and consumers.',
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB'],
    platform: 'Mobile Application',
    githubUrl: 'https://github.com/Shom3s/farm2screen',
    languages: 'JavaScript, React Native, Node.js',
    coverImage: farm2screencover,
    images: [
      farm2screen1,
      farm2screen2,
      farm2screen3
    ],
    features: [
      'Real-time pricing and order management',
      'Direct farmer-to-customer transactions',
      'Market expansion through online visibility'
    ]
  },
  {
    id: 3,
    title: 'Lumora App',
    description: 'Lumora is a smart mental health monitoring web application designed to help students track their emotional well-being, identify early signs of stress or mental health risks, and receive personalized support. The platform provides continuous mental health monitoring through mood tracking, self-assessment journals, behavioral insights, and data-driven recommendations. By leveraging modern web technologies and analytics, Lumora aims to encourage self-awareness and proactive mental health care among students.',
    technologies: ['Flutter', 'Firebase', 'IoT', 'Dart'],
    platform: 'Mobile Application',
    githubUrl: 'https://github.com/harissuresh03/lumora-app',
    languages: 'Dart, JavaScript',
    coverImage: lumoracover,
    images: [
      lumora1
    ],
    features: [
      'Real-time monitoring and analytics',
      'Automatic mood detection from conversations with AI Companion',
      'Personalized Student Support',
      'Personalized recommendations'
    ]
  },
  {
    id: 4,
    title: 'Exam Result Management System',
    description: 'The Exam Result Management System is a software application designed to streamline the process of recording, managing, and publishing students’ examination results. It serves as a centralized platform where teachers can input scores, generate reports, and provide students with secure access to their academic performance. The system aims to reduce manual errors, eliminate paperwork, and improve the efficiency and transparency of result handling. Students can view their results online, while administrators can generate reports and perform data analysis with ease.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    platform: 'Web Application',
    githubUrl: 'https://github.com/ThomsonTea/Exam-Result-Management-System',
    languages: 'PHP, JavaScript, SQL',
    coverImage: examcover,
    images: [
      exam1
    ],
    features: [
      'Student result entry',
      'Automated calculations',
      'Result publishing',
      'Analytics dashboard'
    ]
  },
  {
    id: 5,
    title: 'Retinal Disease Detection',
    description: 'The Retinal Disease Detection System is an AI-powered application designed to assist in the early identification of retinal diseases from eye scan images. Using deep learning and convolutional neural networks (CNN), the system analyzes retinal images and predicts potential eye conditions with high accuracy. It includes image preprocessing, model inference, and a simple user interface for uploading and viewing predictions. The goal of this project is to support healthcare professionals by providing a fast, automated, and reliable screening tool for retinal disease detection.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    platform: 'Web Application',
    githubUrl: 'https://github.com/ThomsonTea/Retinal-Disease-Detection',
    languages: 'Python, JavaScript',
    coverImage: retinalcover,
    images: [
      retinal1,
      retinal2,
      retinal3
    ],
    features: [
      'Image upload and analysis',
      'AI-based disease detection',
      'Report generation',
      'Doctor consultation interface',
      'Historical tracking'
    ]
  }
];