// Mock Data for NurseAI Academy

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link' | 'text';
  image: string;
  dateAdded: string;
  lastAccessed: string;
  spaceId: string;
  progress: number;
  category: string;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  contentCount: number;
  createdAt: string;
  color: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'folder' | 'content';
  children?: LibraryItem[];
  content?: Content;
}

export interface HistoryItem {
  id: string;
  contentId: string;
  title: string;
  type: string;
  image: string;
  accessedAt: string;
  action: 'viewed' | 'created' | 'edited';
}

// Spaces Data
export const spaces: Space[] = [
  {
    id: 'crit-care',
    name: 'Critical Care AI',
    description: 'AI applications in ICU and emergency nursing',
    contentCount: 5,
    createdAt: '2024-03-01',
    color: 'bg-red-500'
  },
  {
    id: 'nursing-informatics',
    name: 'Nursing Informatics',
    description: 'Data-driven healthcare and electronic records',
    contentCount: 8,
    createdAt: '2024-02-20',
    color: 'bg-blue-500'
  },
  {
    id: 'vr-sim',
    name: 'VR & Simulation',
    description: 'Virtual reality training for clinical skills',
    contentCount: 12,
    createdAt: '2024-03-10',
    color: 'bg-purple-500'
  },
  {
    id: 'patient-monitoring',
    name: 'Remote Monitoring',
    description: 'AI-powered patient tracking',
    contentCount: 4,
    createdAt: '2024-03-15',
    color: 'bg-green-500'
  },
  {
    id: 'core-nursing',
    name: 'Core Nursing Courses',
    description: 'Fundamental and advanced nursing practice courses',
    contentCount: 4,
    createdAt: '2024-03-20',
    color: 'bg-teal-500'
  }
];

// Content Data
export const contents: Content[] = [
  {
    id: '1',
    title: 'AI-Driven Predictive Analytics in ICU',
    description: 'How machine learning models predict patient deterioration 6 hours before it happens.',
    type: 'pdf',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-10',
    lastAccessed: '2024-03-15',
    spaceId: 'crit-care',
    progress: 75,
    category: 'Critical Care'
  },
  {
    id: '2',
    title: 'Nursing Informatics: The Future of EHR',
    description: 'Exploring the role of AI in streamlining electronic health records and reducing nurse burnout.',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-12',
    lastAccessed: '2024-03-14',
    spaceId: 'nursing-informatics',
    progress: 45,
    category: 'Informatics'
  },
  {
    id: '3',
    title: 'Virtual Reality in Clinical Training',
    description: 'Using VR to simulate complex surgical procedures and bedside care for nursing students.',
    type: 'pdf',
    image: '/images/confident-female-doctor-hospital-room.jpg',
    dateAdded: '2024-03-08',
    lastAccessed: '2024-03-16',
    spaceId: 'vr-sim',
    progress: 30,
    category: 'Simulation'
  },
  {
    id: '4',
    title: 'Wearable AI for Chronic Disease Management',
    description: 'Implementing remote patient monitoring with smart devices and AI-backed alerts.',
    type: 'video',
    image: '/images/confident-female-doctor-with-reports-clipboard-standing-against-male-patient-hospital.jpg',
    dateAdded: '2024-03-05',
    lastAccessed: '2024-03-17',
    spaceId: 'patient-monitoring',
    progress: 60,
    category: 'Monitoring'
  },
  {
    id: '5',
    title: 'Ethics of AI in Nursing Care',
    description: 'Balancing automated decision-making with the human touch in clinical practice.',
    type: 'pdf',
    image: '/images/surgeon-writing-clipboard-operation-room-anaesthesiologist-writing-updates.jpg',
    dateAdded: '2024-03-01',
    lastAccessed: '2024-03-11',
    spaceId: 'nursing-informatics',
    progress: 90,
    category: 'Ethics'
  },
  {
    id: '6',
    title: 'Robotic-Assisted Mobility Training',
    description: 'The use of exoskeletons and assistive robots in geriatric nursing care.',
    type: 'pdf',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-02-28',
    lastAccessed: '2024-03-13',
    spaceId: 'vr-sim',
    progress: 50,
    category: 'Geriatrics'
  },
  {
    id: '8',
    title: 'Clinical Study Pack: Emergency Care',
    description: 'A comprehensive collection of downloadable cheat sheets, protocols, and dosages for ICU nurses.',
    type: 'pdf',
    image: '/images/nurse-talking-with-senior-woman-with-walking-disabilities-sitting-wheelchair-into-private-modern-recovery-clinic-hospital-handicapped-old-retired-patient-medical-consultation-advice.jpg',
    dateAdded: '2024-03-19',
    lastAccessed: '2024-03-19',
    spaceId: 'crit-care',
    progress: 10,
    category: 'Resources'
  },
  {
    id: '9',
    title: 'Fundamentals of Nursing Practice',
    description: 'Comprehensive course covering basic nursing skills, patient assessment, and care planning.',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-21',
    lastAccessed: '2024-03-21',
    spaceId: 'core-nursing',
    progress: 0,
    category: 'Core Skills'
  },
  {
    id: '10',
    title: 'Advanced Pharmacology for Nurses',
    description: 'In-depth study of medication administration, pharmacokinetics, and drug interactions.',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-21',
    lastAccessed: '2024-03-21',
    spaceId: 'core-nursing',
    progress: 25,
    category: 'Pharmacology'
  },
  {
    id: '11',
    title: 'Pediatric Nursing Care',
    description: 'Specialized course focusing on the health and medical care of infants, children, and adolescents.',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-22',
    lastAccessed: '2024-03-22',
    spaceId: 'core-nursing',
    progress: 10,
    category: 'Pediatrics'
  },
  {
    id: '12',
    title: 'Surgical Nursing Protocols',
    description: 'Pre and post-operative care, infection control, and assisting in surgical procedures.',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-22',
    lastAccessed: '2024-03-22',
    spaceId: 'core-nursing',
    progress: 0,
    category: 'Surgical Care'
  }
];

// Library Structure
export const libraryData: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Core Courses',
    description: 'Foundational AI Nursing modules',
    type: 'folder',
    children: [
      {
        id: 'lib-1-1',
        title: 'Certifications',
        description: 'Completed certifications',
        type: 'folder',
        children: [
          { id: 'fav-2', title: 'EHR Specialist', description: '', type: 'content', content: contents[1] },
        ]
      }
    ]
  },
  {
    id: 'lib-2',
    title: 'Resources',
    description: 'Medical journals and AI research',
    type: 'folder',
    children: [
      { id: 'shared-1', title: 'Ethics Guide', description: '', type: 'content', content: contents[4] },
    ]
  }
];

// History Data
export const historyData: HistoryItem[] = [
  { id: 'h2', contentId: '4', title: 'Wearable AI Management', type: 'video', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000', accessedAt: '2024-03-17T09:15:00', action: 'viewed' },
];

// Explore Categories
export const exploreCategories = [
  { id: 'for-you', name: 'Clinical Pathways', active: true },
  { id: 'core-skills', name: 'Core Nursing Skills', active: false },
  { id: 'informatics', name: 'Health Informatics', active: false },
  { id: 'simulation', name: 'VR Simulation', active: false },
  { id: 'monitoring', name: 'Remote Monitoring', active: false },
  { id: 'ethics', name: 'Medical Ethics', active: false },
];

// Quick Guide Steps
export const quickGuideSteps = [
  {
    title: 'Welcome to NurseAI Academy',
    subtitle: 'Advancing Nursing through AI',
    content: 'Get Started',
    description: 'Explore our specialized AI courses for healthcare professionals'
  },
  {
    title: 'Upload Lab Results',
    subtitle: 'Analyze medical data with AI',
    content: 'Upload',
    description: 'Process PDFs, lab reports, and clinical notes'
  },
  {
    title: 'AI Consultation',
    subtitle: 'Chat with medical literature',
    content: 'AI Features',
    description: 'Summarize complex medical research and guidelines'
  }
];

// Help & Tools Data
export const helpTools = [
  {
    id: 'clinical-guide',
    title: 'Clinical Guide',
    description: 'How to use AI in daily practice',
    icon: 'BookOpen'
  },
  {
    id: 'medical-integrations',
    title: 'EHR Integrations',
    description: 'Connect with hospital systems',
    icon: 'Plug'
  }
];

// Testimonials
export const testimonials = [
  {
    quote: "ProntoTech AI has revolutionized how we handle documentation. I spend more time with patients and less on the computer.",
    author: 'James Miller',
    role: 'Clinical Informatics Specialist'
  },
  {
    quote: "As a nursing student, the VR simulation courses made me feel so much more confident before my first clinical rotation.",
    author: 'Emily Chen',
    role: 'BSN Student'
  }
];
