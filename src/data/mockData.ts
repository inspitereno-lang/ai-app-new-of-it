// Mock Data for NurseAI Academy

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link' | 'text' | 'exam' | 'course';
  image: string;
  dateAdded: string;
  lastAccessed: string;
  spaceId: string;
  progress: number;
  category: string;
  isFavorite?: boolean;
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
  },
  {
    id: '13',
    title: 'Midterm Assessment: Critical Care',
    description: 'Test your knowledge on ICU predictive analytics and emergency protocols.',
    type: 'exam',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-25',
    lastAccessed: '2024-03-25',
    spaceId: 'crit-care',
    progress: 0,
    category: 'Exams'
  },
  {
    id: '14',
    title: 'Advanced Diagnostic Imaging Course',
    description: 'Learn to interpret complex X-rays, MRIs, and CT scans using AI assistance.',
    type: 'course',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
    dateAdded: '2024-03-26',
    lastAccessed: '2024-03-26',
    spaceId: 'nursing-informatics',
    progress: 0,
    category: 'Core Skills',
    isFavorite: true
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
  },
  {
    quote: "Integrating NurseAI into our hospital's training program has significantly improved clinical outcomes and reduced staff burnout.",
    author: 'Dr. Sarah Thompson',
    role: 'Chief Nursing Officer, MetroHealth Systems'
  }
];

// ======== EXAM SYSTEM ========

export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'multi_answer_mcq';

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source?: string;
  sourcePage?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimitMinutes: number;
  questions: ExamQuestion[];
  spaceId: string;
  createdAt: string;
  examDate?: string;
  image: string;
  status: 'not_started' | 'in_progress' | 'completed';
  bestScore?: number;
  attemptCount: number;
}

export interface ExamAnswer {
  questionId: string;
  userAnswer: string | string[] | null;
  isCorrect: boolean;
  isSkipped: boolean;
  isMarked: boolean;
  timeTaken: number; // seconds
}

export interface ExamAttempt {
  id: string;
  examId: string;
  answers: ExamAnswer[];
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  timeTaken: number; // seconds
  completedAt: string;
  strengths: string[];
  weaknesses: string[];
}

// ---- Questions ----

const criticalCareQuestions: ExamQuestion[] = [
  {
    id: 'cc-q1',
    type: 'mcq',
    question: 'Which early warning score system is most commonly used to predict patient deterioration in ICU settings?',
    options: ['APACHE II', 'NEWS (National Early Warning Score)', 'SOFA Score', 'MEWS (Modified Early Warning Score)'],
    correctAnswer: 'NEWS (National Early Warning Score)',
    explanation: 'The NEWS (National Early Warning Score) is the most widely adopted early warning system in acute care settings. It uses six physiological parameters to generate a composite score that predicts patient deterioration.',
    topic: 'Patient Assessment',
    difficulty: 'medium',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 12'
  },
  {
    id: 'cc-q2',
    type: 'true_false',
    question: 'Sepsis-induced hypotension is defined as a systolic blood pressure less than 90 mmHg or a reduction of more than 40 mmHg from baseline.',
    correctAnswer: 'True',
    explanation: 'Sepsis-induced hypotension is indeed defined as SBP < 90 mmHg or a decrease > 40 mmHg from baseline, despite adequate fluid resuscitation, in the absence of other causes.',
    topic: 'Sepsis Management',
    difficulty: 'easy',
    source: 'Clinical Study Pack: Emergency Care',
    sourcePage: 'Page 34'
  },
  {
    id: 'cc-q3',
    type: 'mcq',
    question: 'What is the recommended initial fluid resuscitation volume for a septic patient in the first 3 hours?',
    options: ['10 mL/kg', '20 mL/kg', '30 mL/kg', '50 mL/kg'],
    correctAnswer: '30 mL/kg',
    explanation: 'The Surviving Sepsis Campaign recommends 30 mL/kg of IV crystalloid fluid be given within the first 3 hours for sepsis-induced hypoperfusion.',
    topic: 'Sepsis Management',
    difficulty: 'medium',
    source: 'Clinical Study Pack: Emergency Care',
    sourcePage: 'Page 36'
  },
  {
    id: 'cc-q4',
    type: 'mcq',
    question: 'Which ventilator mode delivers a set tidal volume at a set rate regardless of patient effort?',
    options: ['Pressure Support (PS)', 'Assist-Control (AC)', 'SIMV', 'CPAP'],
    correctAnswer: 'Assist-Control (AC)',
    explanation: 'Assist-Control (AC) mode delivers a preset tidal volume with each breath, whether initiated by the patient or the ventilator at the set rate.',
    topic: 'Mechanical Ventilation',
    difficulty: 'medium',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 45'
  },
  {
    id: 'cc-q5',
    type: 'true_false',
    question: 'A positive end-expiratory pressure (PEEP) of 5 cmH2O is considered physiological PEEP.',
    correctAnswer: 'True',
    explanation: 'Physiological PEEP of approximately 5 cmH2O mimics the natural positive pressure maintained by the glottis during normal breathing and helps prevent alveolar collapse.',
    topic: 'Mechanical Ventilation',
    difficulty: 'easy',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 47'
  },
  {
    id: 'cc-q6',
    type: 'short_answer',
    question: 'Name the primary vasopressor recommended as first-line treatment for septic shock.',
    correctAnswer: 'Norepinephrine',
    explanation: 'Norepinephrine (noradrenaline) is the first-line vasopressor for septic shock as recommended by the Surviving Sepsis Campaign guidelines due to its potent α-adrenergic effects.',
    topic: 'Sepsis Management',
    difficulty: 'medium',
    source: 'Clinical Study Pack: Emergency Care',
    sourcePage: 'Page 40'
  },
  {
    id: 'cc-q7',
    type: 'mcq',
    question: 'Which lab value is most indicative of acute kidney injury in a critically ill patient?',
    options: ['Elevated BUN', 'Rising serum creatinine', 'Low urine specific gravity', 'Elevated potassium'],
    correctAnswer: 'Rising serum creatinine',
    explanation: 'A rising serum creatinine level (≥0.3 mg/dL within 48 hours or ≥1.5 times baseline within 7 days) is the primary KDIGO criterion for diagnosing acute kidney injury.',
    topic: 'Renal Assessment',
    difficulty: 'medium',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 62'
  },
  {
    id: 'cc-q8',
    type: 'multi_answer_mcq',
    question: 'Which of the following are components of the qSOFA score? (Select all that apply)',
    options: ['Respiratory rate ≥ 22/min', 'Altered mentation (GCS < 15)', 'Systolic BP ≤ 100 mmHg', 'Heart rate > 100 bpm', 'Temperature > 38.3°C'],
    correctAnswer: ['Respiratory rate ≥ 22/min', 'Altered mentation (GCS < 15)', 'Systolic BP ≤ 100 mmHg'],
    explanation: 'The qSOFA (Quick SOFA) score consists of three criteria: respiratory rate ≥22/min, altered mentation (GCS <15), and systolic blood pressure ≤100 mmHg. A score of ≥2 suggests organ dysfunction.',
    topic: 'Sepsis Management',
    difficulty: 'hard',
    source: 'Clinical Study Pack: Emergency Care',
    sourcePage: 'Page 38'
  },
  {
    id: 'cc-q9',
    type: 'mcq',
    question: 'What is the target SpO2 range for most mechanically ventilated ICU patients?',
    options: ['88-92%', '92-96%', '96-100%', '85-90%'],
    correctAnswer: '92-96%',
    explanation: 'The target SpO2 for most mechanically ventilated patients is 92-96%. Higher targets may cause oxygen toxicity, while lower targets increase the risk of tissue hypoxia.',
    topic: 'Mechanical Ventilation',
    difficulty: 'easy',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 50'
  },
  {
    id: 'cc-q10',
    type: 'true_false',
    question: 'Central venous pressure (CVP) alone is a reliable indicator of fluid responsiveness in critically ill patients.',
    correctAnswer: 'False',
    explanation: 'CVP alone is not a reliable predictor of fluid responsiveness. Dynamic measures like pulse pressure variation, stroke volume variation, or passive leg raise tests are more accurate.',
    topic: 'Hemodynamic Monitoring',
    difficulty: 'hard',
    source: 'AI-Driven Predictive Analytics in ICU',
    sourcePage: 'Page 55'
  }
];

const pharmacologyQuestions: ExamQuestion[] = [
  {
    id: 'ph-q1',
    type: 'mcq',
    question: 'Which medication requires monitoring of the INR (International Normalized Ratio)?',
    options: ['Heparin', 'Warfarin', 'Enoxaparin', 'Aspirin'],
    correctAnswer: 'Warfarin',
    explanation: 'Warfarin requires INR monitoring because it inhibits vitamin K-dependent clotting factors. The therapeutic INR range is typically 2.0-3.0 for most indications.',
    topic: 'Anticoagulants',
    difficulty: 'easy',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 78'
  },
  {
    id: 'ph-q2',
    type: 'mcq',
    question: 'What is the antidote for heparin overdose?',
    options: ['Vitamin K', 'Protamine sulfate', 'Naloxone', 'Flumazenil'],
    correctAnswer: 'Protamine sulfate',
    explanation: 'Protamine sulfate is the specific antidote for heparin. It binds to heparin molecules, neutralizing their anticoagulant effect. 1 mg of protamine neutralizes approximately 100 units of heparin.',
    topic: 'Anticoagulants',
    difficulty: 'medium',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 82'
  },
  {
    id: 'ph-q3',
    type: 'true_false',
    question: 'Metformin should be withheld 48 hours before and after procedures involving iodinated contrast dye.',
    correctAnswer: 'True',
    explanation: 'Metformin should be temporarily discontinued around iodinated contrast procedures because contrast-induced nephropathy can impair metformin clearance, leading to lactic acidosis.',
    topic: 'Diabetes Medications',
    difficulty: 'medium',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 105'
  },
  {
    id: 'ph-q4',
    type: 'mcq',
    question: 'Which class of antibiotics is contraindicated in children under 8 years due to effects on developing teeth?',
    options: ['Penicillins', 'Tetracyclines', 'Cephalosporins', 'Macrolides'],
    correctAnswer: 'Tetracyclines',
    explanation: 'Tetracyclines can cause permanent discoloration of developing teeth and may impair bone growth. They are contraindicated in children under 8 and pregnant women.',
    topic: 'Antibiotics',
    difficulty: 'easy',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 134'
  },
  {
    id: 'ph-q5',
    type: 'short_answer',
    question: 'What is the maximum recommended dose of acetaminophen (paracetamol) for adults per 24 hours?',
    correctAnswer: '4 grams',
    explanation: 'The maximum recommended dose of acetaminophen for healthy adults is 4 grams (4000 mg) per 24 hours. Lower limits (2-3g/day) apply to patients with liver disease or chronic alcohol use.',
    topic: 'Analgesics',
    difficulty: 'easy',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 22'
  },
  {
    id: 'ph-q6',
    type: 'mcq',
    question: 'Which electrolyte imbalance is a serious concern when administering loop diuretics like furosemide?',
    options: ['Hypernatremia', 'Hypokalemia', 'Hypercalcemia', 'Hypermagnesemia'],
    correctAnswer: 'Hypokalemia',
    explanation: 'Loop diuretics block the Na-K-2Cl cotransporter in the loop of Henle, causing significant potassium wasting. Hypokalemia can lead to fatal cardiac arrhythmias.',
    topic: 'Diuretics',
    difficulty: 'medium',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 156'
  },
  {
    id: 'ph-q7',
    type: 'multi_answer_mcq',
    question: 'Which of the following are signs of digoxin toxicity? (Select all that apply)',
    options: ['Nausea and vomiting', 'Visual disturbances (yellow-green halos)', 'Bradycardia', 'Hypertension', 'Tachypnea'],
    correctAnswer: ['Nausea and vomiting', 'Visual disturbances (yellow-green halos)', 'Bradycardia'],
    explanation: 'Classic signs of digoxin toxicity include GI symptoms (nausea, vomiting, anorexia), cardiac arrhythmias (bradycardia, heart block), and visual disturbances including yellow-green color changes.',
    topic: 'Cardiac Medications',
    difficulty: 'hard',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 168'
  },
  {
    id: 'ph-q8',
    type: 'true_false',
    question: 'ACE inhibitors can cause a persistent dry cough as a side effect.',
    correctAnswer: 'True',
    explanation: 'ACE inhibitors prevent the breakdown of bradykinin, which accumulates in the lungs and can cause a persistent dry cough in 5-20% of patients. Switching to an ARB typically resolves this.',
    topic: 'Cardiac Medications',
    difficulty: 'easy',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 172'
  },
  {
    id: 'ph-q9',
    type: 'mcq',
    question: 'Before administering IV potassium, which assessment is most critical?',
    options: ['Check blood glucose', 'Verify urine output', 'Assess pain level', 'Check respiratory rate'],
    correctAnswer: 'Verify urine output',
    explanation: 'Adequate urine output (≥30 mL/hr) must be confirmed before IV potassium administration. If the kidneys are not properly excreting potassium, hyperkalemia and fatal cardiac arrhythmias can result.',
    topic: 'Electrolyte Management',
    difficulty: 'medium',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 190'
  },
  {
    id: 'ph-q10',
    type: 'mcq',
    question: 'Which opioid analgesic has an active metabolite that can accumulate in renal failure, causing neuroexcitatory effects?',
    options: ['Morphine', 'Fentanyl', 'Hydromorphone', 'Oxycodone'],
    correctAnswer: 'Morphine',
    explanation: 'Morphine is metabolized to morphine-3-glucuronide (M3G) and morphine-6-glucuronide (M6G). M3G can cause neuroexcitatory effects (myoclonus, seizures), and both metabolites accumulate in renal impairment.',
    topic: 'Analgesics',
    difficulty: 'hard',
    source: 'Advanced Pharmacology for Nurses',
    sourcePage: 'Page 28'
  }
];

const pediatricQuestions: ExamQuestion[] = [
  {
    id: 'pd-q1',
    type: 'mcq',
    question: 'What is the normal respiratory rate range for a newborn (0-1 month)?',
    options: ['12-20 breaths/min', '20-30 breaths/min', '30-60 breaths/min', '60-80 breaths/min'],
    correctAnswer: '30-60 breaths/min',
    explanation: 'Normal newborn respiratory rates range from 30-60 breaths per minute. Rates consistently above 60 may indicate respiratory distress.',
    topic: 'Vital Signs',
    difficulty: 'easy',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 15'
  },
  {
    id: 'pd-q2',
    type: 'true_false',
    question: 'The anterior fontanelle in infants typically closes between 12-18 months of age.',
    correctAnswer: 'True',
    explanation: 'The anterior fontanelle normally closes between 12-18 months. Early closure may indicate craniosynostosis, while delayed closure could suggest hydrocephalus or rickets.',
    topic: 'Growth & Development',
    difficulty: 'easy',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 22'
  },
  {
    id: 'pd-q3',
    type: 'mcq',
    question: 'Which immunization is typically given at birth in the hospital?',
    options: ['DTaP', 'Hepatitis B', 'MMR', 'Varicella'],
    correctAnswer: 'Hepatitis B',
    explanation: 'The first dose of Hepatitis B vaccine is given within 24 hours of birth per CDC guidelines, especially to prevent mother-to-child transmission.',
    topic: 'Immunizations',
    difficulty: 'easy',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 45'
  },
  {
    id: 'pd-q4',
    type: 'mcq',
    question: 'A 2-year-old presents with a barking cough, stridor, and hoarseness. What is the most likely diagnosis?',
    options: ['Epiglottitis', 'Croup (Laryngotracheobronchitis)', 'Bronchiolitis', 'Pneumonia'],
    correctAnswer: 'Croup (Laryngotracheobronchitis)',
    explanation: 'Croup presents with the classic triad of barking (seal-like) cough, inspiratory stridor, and hoarseness. It is most common in children 6 months to 3 years old.',
    topic: 'Respiratory Conditions',
    difficulty: 'medium',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 78'
  },
  {
    id: 'pd-q5',
    type: 'short_answer',
    question: 'What formula is used to calculate maintenance IV fluid rates in pediatrics? (Name the rule)',
    correctAnswer: 'Holliday-Segar formula',
    explanation: 'The Holliday-Segar formula calculates maintenance fluids: 100 mL/kg for the first 10 kg, 50 mL/kg for the next 10 kg, and 20 mL/kg for each additional kg above 20 kg per 24 hours.',
    topic: 'Fluid Management',
    difficulty: 'hard',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 92'
  },
  {
    id: 'pd-q6',
    type: 'mcq',
    question: 'Which sign is a red flag for increased intracranial pressure in an infant?',
    options: ['Sunken fontanelle', 'Bulging fontanelle', 'Flat fontanelle', 'Closed fontanelle'],
    correctAnswer: 'Bulging fontanelle',
    explanation: 'A bulging or tense fontanelle indicates increased intracranial pressure. Other signs include sunset eyes, high-pitched cry, irritability, and vomiting.',
    topic: 'Neurological Assessment',
    difficulty: 'medium',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 110'
  },
  {
    id: 'pd-q7',
    type: 'true_false',
    question: 'Aspirin (acetylsalicylic acid) is safe to administer to children with viral infections for fever management.',
    correctAnswer: 'False',
    explanation: 'Aspirin should NEVER be given to children with viral infections due to the risk of Reye syndrome, a potentially fatal condition affecting the liver and brain.',
    topic: 'Medication Safety',
    difficulty: 'easy',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 55'
  },
  {
    id: 'pd-q8',
    type: 'multi_answer_mcq',
    question: 'Which of the following are signs of dehydration in an infant? (Select all that apply)',
    options: ['Decreased tear production', 'Sunken fontanelle', 'Increased urine output', 'Dry mucous membranes', 'Weight gain'],
    correctAnswer: ['Decreased tear production', 'Sunken fontanelle', 'Dry mucous membranes'],
    explanation: 'Signs of dehydration in infants include decreased tears, sunken fontanelle, dry mucous membranes, decreased urine output (not increased), and weight loss (not gain).',
    topic: 'Fluid Management',
    difficulty: 'medium',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 95'
  },
  {
    id: 'pd-q9',
    type: 'mcq',
    question: 'At what age can a child typically sit without support?',
    options: ['3 months', '6 months', '9 months', '12 months'],
    correctAnswer: '6 months',
    explanation: 'Most infants can sit unsupported by 6 months of age. This is an important developmental milestone assessed during well-child visits.',
    topic: 'Growth & Development',
    difficulty: 'easy',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 28'
  },
  {
    id: 'pd-q10',
    type: 'mcq',
    question: 'Which congenital heart defect results in increased pulmonary blood flow?',
    options: ['Tetralogy of Fallot', 'Ventricular Septal Defect (VSD)', 'Pulmonary Stenosis', 'Coarctation of the Aorta'],
    correctAnswer: 'Ventricular Septal Defect (VSD)',
    explanation: 'VSD causes a left-to-right shunt, increasing pulmonary blood flow. This leads to heart failure symptoms if the defect is large enough. It is the most common congenital heart defect.',
    topic: 'Cardiac Conditions',
    difficulty: 'hard',
    source: 'Pediatric Nursing Care',
    sourcePage: 'Page 125'
  }
];

const surgicalQuestions: ExamQuestion[] = [
  {
    id: 'sg-q1',
    type: 'mcq',
    question: 'What is the recommended time to administer prophylactic antibiotics before surgical incision?',
    options: ['2 hours before', 'Within 60 minutes before incision', 'At the time of incision', 'After wound closure'],
    correctAnswer: 'Within 60 minutes before incision',
    explanation: 'Prophylactic antibiotics should be administered within 60 minutes before surgical incision to ensure adequate tissue levels at the time of potential contamination.',
    topic: 'Infection Prevention',
    difficulty: 'medium',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 18'
  },
  {
    id: 'sg-q2',
    type: 'true_false',
    question: 'A wound healing by secondary intention is one that is surgically closed with sutures.',
    correctAnswer: 'False',
    explanation: 'Secondary intention healing occurs when a wound is left open to heal naturally by granulation. Primary intention healing involves surgical closure with sutures, staples, or adhesives.',
    topic: 'Wound Care',
    difficulty: 'easy',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 45'
  },
  {
    id: 'sg-q3',
    type: 'mcq',
    question: 'Which postoperative complication is characterized by a sudden onset of dyspnea, tachycardia, and pleuritic chest pain?',
    options: ['Atelectasis', 'Pulmonary embolism', 'Pneumonia', 'Pneumothorax'],
    correctAnswer: 'Pulmonary embolism',
    explanation: 'Pulmonary embolism classically presents with sudden dyspnea, tachycardia, pleuritic chest pain, and hypoxemia. Early ambulation and anticoagulation prophylaxis are key preventive measures.',
    topic: 'Postoperative Complications',
    difficulty: 'medium',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 72'
  },
  {
    id: 'sg-q4',
    type: 'short_answer',
    question: 'Name the surgical safety checklist developed by the WHO to prevent surgical errors.',
    correctAnswer: 'Surgical Safety Checklist',
    explanation: 'The WHO Surgical Safety Checklist includes three phases: Sign In (before anesthesia), Time Out (before incision), and Sign Out (before patient leaves OR). It has significantly reduced surgical morbidity and mortality.',
    topic: 'Patient Safety',
    difficulty: 'easy',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 8'
  },
  {
    id: 'sg-q5',
    type: 'mcq',
    question: 'Which position is recommended for a patient recovering from spinal anesthesia?',
    options: ['Prone', 'Supine with head elevated', 'Supine with head flat', 'Left lateral'],
    correctAnswer: 'Supine with head flat',
    explanation: 'Patients should remain supine with head flat for several hours post-spinal anesthesia to reduce the risk of post-dural puncture headache from CSF leakage.',
    topic: 'Anesthesia Recovery',
    difficulty: 'medium',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 55'
  },
  {
    id: 'sg-q6',
    type: 'mcq',
    question: 'An increase in serosanguineous drainage from a surgical wound on postoperative day 5 may indicate which complication?',
    options: ['Normal healing', 'Wound dehiscence', 'Hematoma', 'Seroma'],
    correctAnswer: 'Wound dehiscence',
    explanation: 'Increased serosanguineous (salmon/pink) drainage on days 4-5 post-op is a classic sign of impending wound dehiscence. Risk factors include obesity, coughing, and poor nutrition.',
    topic: 'Wound Care',
    difficulty: 'hard',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 50'
  },
  {
    id: 'sg-q7',
    type: 'true_false',
    question: 'Incentive spirometry should be used 10 times every hour while awake to prevent postoperative pulmonary complications.',
    correctAnswer: 'True',
    explanation: 'Incentive spirometry (10 breaths every 1-2 hours while awake) helps prevent atelectasis, pneumonia, and other postoperative pulmonary complications by promoting deep breathing.',
    topic: 'Postoperative Care',
    difficulty: 'easy',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 62'
  },
  {
    id: 'sg-q8',
    type: 'multi_answer_mcq',
    question: 'Which factors increase the risk of surgical site infection? (Select all that apply)',
    options: ['Diabetes mellitus', 'Smoking', 'Proper hand hygiene', 'Prolonged operative time', 'Adequate nutrition'],
    correctAnswer: ['Diabetes mellitus', 'Smoking', 'Prolonged operative time'],
    explanation: 'Diabetes, smoking, and prolonged operative time are documented risk factors for SSI. Proper hand hygiene and adequate nutrition are protective factors.',
    topic: 'Infection Prevention',
    difficulty: 'medium',
    source: 'Surgical Nursing Protocols',
    sourcePage: 'Page 20'
  }
];

const informaticsQuestions: ExamQuestion[] = [
  {
    id: 'ni-q1',
    type: 'mcq',
    question: 'Which federal law mandates the protection of patient health information in electronic format?',
    options: ['OSHA', 'HIPAA', 'ACA', 'EMTALA'],
    correctAnswer: 'HIPAA',
    explanation: 'HIPAA (Health Insurance Portability and Accountability Act) establishes national standards for protecting electronic personal health information. The Security Rule specifically addresses electronic PHI.',
    topic: 'Health IT Regulations',
    difficulty: 'easy',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 12'
  },
  {
    id: 'ni-q2',
    type: 'mcq',
    question: 'What does the acronym "CDSS" stand for in nursing informatics?',
    options: ['Clinical Data Support System', 'Clinical Decision Support System', 'Computerized Drug Safety System', 'Central Data Storage System'],
    correctAnswer: 'Clinical Decision Support System',
    explanation: 'CDSS (Clinical Decision Support System) provides clinicians with knowledge and patient-specific information to enhance decision-making. Examples include drug-drug interaction alerts and diagnostic suggestions.',
    topic: 'Clinical Systems',
    difficulty: 'easy',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 28'
  },
  {
    id: 'ni-q3',
    type: 'true_false',
    question: 'Interoperability in healthcare IT refers to the ability of different systems to exchange and use data.',
    correctAnswer: 'True',
    explanation: 'Interoperability allows different healthcare IT systems to communicate, exchange data, and use the information that has been exchanged. Standards like HL7 FHIR facilitate this.',
    topic: 'Clinical Systems',
    difficulty: 'easy',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 35'
  },
  {
    id: 'ni-q4',
    type: 'mcq',
    question: 'Which nursing terminology system is recognized by the ANA for documenting nursing practice?',
    options: ['ICD-10', 'CPT', 'NANDA-I', 'DRG'],
    correctAnswer: 'NANDA-I',
    explanation: 'NANDA-I (North American Nursing Diagnosis Association International) is one of the ANA-recognized standardized nursing terminologies used for nursing diagnosis documentation in EHRs.',
    topic: 'Documentation Standards',
    difficulty: 'medium',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 42'
  },
  {
    id: 'ni-q5',
    type: 'short_answer',
    question: 'What technology uses barcodes to verify the "five rights" of medication administration?',
    correctAnswer: 'BCMA',
    explanation: 'BCMA (Barcode Medication Administration) technology scans patient wristband and medication barcodes to verify right patient, right drug, right dose, right route, and right time.',
    topic: 'Medication Safety Technology',
    difficulty: 'medium',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 55'
  },
  {
    id: 'ni-q6',
    type: 'mcq',
    question: 'What is the primary purpose of implementing a Computerized Provider Order Entry (CPOE) system?',
    options: ['Reduce paperwork', 'Reduce medication errors', 'Speed up billing', 'Track staff attendance'],
    correctAnswer: 'Reduce medication errors',
    explanation: 'CPOE systems primarily aim to reduce medication errors by eliminating handwriting legibility issues, providing built-in alerts for allergies, interactions, and dosing errors.',
    topic: 'Clinical Systems',
    difficulty: 'medium',
    source: 'Nursing Informatics: The Future of EHR',
    sourcePage: 'Page 48'
  },
  {
    id: 'ni-q7',
    type: 'true_false',
    question: 'Telehealth nursing visits must always include video consultation to be considered valid.',
    correctAnswer: 'False',
    explanation: 'Telehealth can include phone calls, video visits, secure messaging, and remote monitoring. Not all modalities require video; the appropriate method depends on clinical need and patient access.',
    topic: 'Telehealth',
    difficulty: 'easy',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 20'
  },
  {
    id: 'ni-q8',
    type: 'mcq',
    question: 'Which AI application in nursing involves using algorithms to identify patients at risk of readmission?',
    options: ['Natural Language Processing', 'Predictive Analytics', 'Computer Vision', 'Robotic Process Automation'],
    correctAnswer: 'Predictive Analytics',
    explanation: 'Predictive analytics uses machine learning algorithms to analyze patient data and identify those at high risk of readmission, allowing for targeted interventions and care coordination.',
    topic: 'AI in Healthcare',
    difficulty: 'medium',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 25'
  }
];

const ethicsQuestions: ExamQuestion[] = [
  {
    id: 'et-q1',
    type: 'mcq',
    question: 'Which ethical principle requires nurses to "do no harm"?',
    options: ['Autonomy', 'Beneficence', 'Nonmaleficence', 'Justice'],
    correctAnswer: 'Nonmaleficence',
    explanation: 'Nonmaleficence (primum non nocere - "first, do no harm") obligates healthcare providers to avoid causing harm to patients. It is one of the four core bioethical principles.',
    topic: 'Ethical Principles',
    difficulty: 'easy',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 5'
  },
  {
    id: 'et-q2',
    type: 'true_false',
    question: 'A competent adult patient has the right to refuse life-saving treatment.',
    correctAnswer: 'True',
    explanation: 'The principle of autonomy grants competent adult patients the right to make their own healthcare decisions, including refusing life-saving treatment, as long as they have decision-making capacity.',
    topic: 'Patient Rights',
    difficulty: 'easy',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 10'
  },
  {
    id: 'et-q3',
    type: 'mcq',
    question: 'When an AI system recommends a treatment plan but the nurse disagrees based on clinical judgment, what should the nurse do first?',
    options: ['Follow the AI recommendation without question', 'Ignore the AI and proceed with own judgment', 'Consult with the healthcare team and document the discrepancy', 'Report the AI system as faulty'],
    correctAnswer: 'Consult with the healthcare team and document the discrepancy',
    explanation: 'Nurses should never blindly follow or ignore AI recommendations. The appropriate action is to use clinical judgment, consult with the team, and document any discrepancies between AI output and clinical assessment.',
    topic: 'AI Ethics in Nursing',
    difficulty: 'medium',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 35'
  },
  {
    id: 'et-q4',
    type: 'short_answer',
    question: 'Name the document that outlines a patient\'s wishes for end-of-life care.',
    correctAnswer: 'Advance directive',
    explanation: 'An advance directive is a legal document that specifies what actions should be taken regarding a patient\'s health if they are no longer able to make decisions. It includes living wills and durable power of attorney for healthcare.',
    topic: 'End-of-Life Care',
    difficulty: 'easy',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 45'
  },
  {
    id: 'et-q5',
    type: 'mcq',
    question: 'Which ethical issue is most concerning with AI-powered predictive algorithms in healthcare?',
    options: ['Processing speed', 'Algorithmic bias in training data', 'Cost of implementation', 'User interface design'],
    correctAnswer: 'Algorithmic bias in training data',
    explanation: 'Algorithmic bias occurs when AI systems are trained on non-representative data sets, leading to disparities in care recommendations for different populations, particularly minorities and underserved communities.',
    topic: 'AI Ethics in Nursing',
    difficulty: 'hard',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 38'
  },
  {
    id: 'et-q6',
    type: 'true_false',
    question: 'Patient confidentiality can be breached without consent when there is a duty to warn of imminent danger to others.',
    correctAnswer: 'True',
    explanation: 'The Tarasoff ruling established a "duty to warn" when a patient poses a credible threat of violence to identifiable third parties. This is a legal exception to patient confidentiality.',
    topic: 'Confidentiality',
    difficulty: 'medium',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 15'
  },
  {
    id: 'et-q7',
    type: 'mcq',
    question: 'Which professional organization publishes the Code of Ethics for Nurses?',
    options: ['WHO', 'CDC', 'ANA (American Nurses Association)', 'AMA (American Medical Association)'],
    correctAnswer: 'ANA (American Nurses Association)',
    explanation: 'The ANA publishes the Code of Ethics for Nurses with Interpretive Statements, which serves as the profession\'s non-negotiable ethical standard.',
    topic: 'Professional Standards',
    difficulty: 'easy',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 3'
  },
  {
    id: 'et-q8',
    type: 'multi_answer_mcq',
    question: 'Which of the following are ethical concerns with using AI in nursing documentation? (Select all that apply)',
    options: ['Data privacy and security', 'Over-reliance on technology', 'Improved documentation speed', 'Loss of clinical narrative', 'Reduced paper usage'],
    correctAnswer: ['Data privacy and security', 'Over-reliance on technology', 'Loss of clinical narrative'],
    explanation: 'Ethical concerns with AI in documentation include data privacy risks, the danger of over-relying on automated systems, and the potential loss of nuanced clinical narratives that capture the human side of care.',
    topic: 'AI Ethics in Nursing',
    difficulty: 'hard',
    source: 'Ethics of AI in Nursing Care',
    sourcePage: 'Page 40'
  }
];

// ---- Exams ----

export const exams: Exam[] = [
  {
    id: 'exam-cc-1',
    title: 'Critical Care Midterm',
    description: 'Comprehensive assessment covering ICU predictive analytics, sepsis management, mechanical ventilation, and hemodynamic monitoring.',
    category: 'Critical Care',
    difficulty: 'medium',
    questionCount: 10,
    timeLimitMinutes: 30,
    questions: criticalCareQuestions,
    spaceId: 'crit-care',
    createdAt: '2024-03-25',
    examDate: '2024-04-10',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000',
    status: 'completed',
    bestScore: 80,
    attemptCount: 2
  },
  {
    id: 'exam-ph-1',
    title: 'Pharmacology Final Exam',
    description: 'Test your knowledge on anticoagulants, diabetes medications, antibiotics, cardiac medications, and electrolyte management.',
    category: 'Pharmacology',
    difficulty: 'hard',
    questionCount: 10,
    timeLimitMinutes: 45,
    questions: pharmacologyQuestions,
    spaceId: 'core-nursing',
    createdAt: '2024-03-26',
    examDate: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000',
    status: 'not_started',
    attemptCount: 0
  },
  {
    id: 'exam-pd-1',
    title: 'Pediatric Nursing Assessment',
    description: 'Assessment covering pediatric vital signs, growth milestones, immunizations, respiratory conditions, and fluid management.',
    category: 'Pediatrics',
    difficulty: 'medium',
    questionCount: 10,
    timeLimitMinutes: 30,
    questions: pediatricQuestions,
    spaceId: 'core-nursing',
    createdAt: '2024-03-27',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1000',
    status: 'completed',
    bestScore: 90,
    attemptCount: 1
  },
  {
    id: 'exam-sg-1',
    title: 'Surgical Nursing Protocols',
    description: 'Evaluate your understanding of pre/post-operative care, infection prevention, wound management, and patient safety.',
    category: 'Surgical Care',
    difficulty: 'medium',
    questionCount: 8,
    timeLimitMinutes: 25,
    questions: surgicalQuestions,
    spaceId: 'core-nursing',
    createdAt: '2024-03-28',
    examDate: '2024-04-20',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    status: 'not_started',
    attemptCount: 0
  },
  {
    id: 'exam-ni-1',
    title: 'Nursing Informatics Quiz',
    description: 'Test your understanding of EHR systems, HIPAA, clinical decision support, telehealth, and AI applications in nursing.',
    category: 'Informatics',
    difficulty: 'easy',
    questionCount: 8,
    timeLimitMinutes: 20,
    questions: informaticsQuestions,
    spaceId: 'nursing-informatics',
    createdAt: '2024-03-29',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000',
    status: 'in_progress',
    attemptCount: 0
  },
  {
    id: 'exam-et-1',
    title: 'Ethics & AI in Nursing',
    description: 'Assessment on ethical principles, patient rights, AI ethics, confidentiality, and professional nursing standards.',
    category: 'Ethics',
    difficulty: 'medium',
    questionCount: 8,
    timeLimitMinutes: 25,
    questions: ethicsQuestions,
    spaceId: 'nursing-informatics',
    createdAt: '2024-03-30',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    status: 'not_started',
    attemptCount: 0
  }
];

// ---- Pre-built Exam Attempts ----

export const examAttempts: ExamAttempt[] = [
  {
    id: 'attempt-cc-1',
    examId: 'exam-cc-1',
    answers: [
      { questionId: 'cc-q1', userAnswer: 'NEWS (National Early Warning Score)', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 45 },
      { questionId: 'cc-q2', userAnswer: 'True', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 20 },
      { questionId: 'cc-q3', userAnswer: '30 mL/kg', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 35 },
      { questionId: 'cc-q4', userAnswer: 'SIMV', isCorrect: false, isSkipped: false, isMarked: true, timeTaken: 55 },
      { questionId: 'cc-q5', userAnswer: 'True', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 15 },
      { questionId: 'cc-q6', userAnswer: 'Norepinephrine', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 30 },
      { questionId: 'cc-q7', userAnswer: 'Elevated BUN', isCorrect: false, isSkipped: false, isMarked: false, timeTaken: 40 },
      { questionId: 'cc-q8', userAnswer: ['Respiratory rate ≥ 22/min', 'Altered mentation (GCS < 15)', 'Systolic BP ≤ 100 mmHg'], isCorrect: true, isSkipped: false, isMarked: true, timeTaken: 65 },
      { questionId: 'cc-q9', userAnswer: '92-96%', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 25 },
      { questionId: 'cc-q10', userAnswer: 'False', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 30 }
    ],
    score: 80,
    totalQuestions: 10,
    correctCount: 8,
    incorrectCount: 2,
    skippedCount: 0,
    timeTaken: 360,
    completedAt: '2024-03-26T14:30:00',
    strengths: ['Sepsis Management', 'Patient Assessment', 'Mechanical Ventilation'],
    weaknesses: ['Renal Assessment', 'Mechanical Ventilation (AC mode)']
  },
  {
    id: 'attempt-pd-1',
    examId: 'exam-pd-1',
    answers: [
      { questionId: 'pd-q1', userAnswer: '30-60 breaths/min', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 20 },
      { questionId: 'pd-q2', userAnswer: 'True', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 15 },
      { questionId: 'pd-q3', userAnswer: 'Hepatitis B', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 25 },
      { questionId: 'pd-q4', userAnswer: 'Croup (Laryngotracheobronchitis)', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 30 },
      { questionId: 'pd-q5', userAnswer: 'Holliday-Segar formula', isCorrect: true, isSkipped: false, isMarked: true, timeTaken: 60 },
      { questionId: 'pd-q6', userAnswer: 'Bulging fontanelle', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 20 },
      { questionId: 'pd-q7', userAnswer: 'False', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 15 },
      { questionId: 'pd-q8', userAnswer: ['Decreased tear production', 'Dry mucous membranes'], isCorrect: false, isSkipped: false, isMarked: false, timeTaken: 45 },
      { questionId: 'pd-q9', userAnswer: '6 months', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 20 },
      { questionId: 'pd-q10', userAnswer: 'Ventricular Septal Defect (VSD)', isCorrect: true, isSkipped: false, isMarked: false, timeTaken: 35 }
    ],
    score: 90,
    totalQuestions: 10,
    correctCount: 9,
    incorrectCount: 1,
    skippedCount: 0,
    timeTaken: 285,
    completedAt: '2024-03-28T10:15:00',
    strengths: ['Vital Signs', 'Growth & Development', 'Immunizations', 'Respiratory Conditions', 'Neurological Assessment'],
    weaknesses: ['Fluid Management (dehydration signs)']
  }
];

// Exam categories for filtering
export const examCategories = [
  { id: 'all', name: 'All Exams' },
  { id: 'Critical Care', name: 'Critical Care' },
  { id: 'Pharmacology', name: 'Pharmacology' },
  { id: 'Pediatrics', name: 'Pediatrics' },
  { id: 'Surgical Care', name: 'Surgical Care' },
  { id: 'Informatics', name: 'Informatics' },
  { id: 'Ethics', name: 'Ethics' }
];
