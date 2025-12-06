
'use client';

import React, { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  Calendar,
  ArrowRight,
  Menu,
  Search,
  Filter,
  ChevronDown,
  Clock,
  MapPin,
  Briefcase,
  Download,
  X,
  Star
} from 'lucide-react';

export default function RecruitAI() {
  // Navigation & State
  const [currentView, setCurrentView] = useState('landing'); // landing, dashboard, processing, results
  const [activeTab, setActiveTab] = useState('dashboard'); // internal dashboard tabs if needed
  
  // Data State
  const [uploadedJD, setUploadedJD] = useState<File | null>(null);
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedulingCandidate, setSchedulingCandidate] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Processing State
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');
  const [currentProcessingFile, setCurrentProcessingFile] = useState('');

  // Email Draft State
  const [emailDraft, setEmailDraft] = useState('');

  // Mock Data
  const mockCandidates = [
    {
      id: 1,
      name: 'Rahul Verma',
      email: 'rahul.verma@email.com',
      phone: '+91-98765-43210',
      photo: 'RV',
      score: 92,
      scores: {
        technical: 95,
        experience: 90,
        education: 85,
        cultural: 95
      },
      experience: '5 years',
      education: 'IIT Delhi',
      location: 'Bangalore',
      currentRole: 'Senior Developer @ Zomato',
      noticePeriod: '30 days',
      skills: ['React', 'Node.js', 'Redux', 'MongoDB'],
      strengths: 'React expertise, team lead experience, startup background',
      gaps: 'Limited TypeScript (mentioned in JD)',
      highlights: [
        'Led team of 4 developers at Zomato',
        'Built React Native app with 1M+ downloads',
        'Open source contributor (2K+ GitHub stars)'
      ],
      concerns: [
        'Limited TypeScript experience (JD requirement)',
        'Currently in Bangalore, role is hybrid Pune'
      ],
      recommendation: 'STRONG MATCH - Schedule Interview',
      reasoning: 'Strong candidate. Schedule technical interview to assess TypeScript skills. Discuss relocation plans.',
      status: 'recommended'
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91-98765-43211',
      photo: 'PS',
      score: 78,
      scores: {
        technical: 85,
        experience: 70,
        education: 90,
        cultural: 80
      },
      experience: '3 years',
      education: 'NIT Trichy',
      location: 'Remote',
      currentRole: 'Full Stack Developer @ Paytm',
      noticePeriod: '15 days',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      strengths: 'Full-stack skills, startup experience, quick learner',
      gaps: '2 years in React (JD asks for 3+)',
      highlights: [
        'Full stack capability',
        'Top of class at NIT Trichy'
      ],
      concerns: [
        'Less experience than required for Senior role',
        'Remote only preference'
      ],
      recommendation: 'MAYBE - Review work samples',
      reasoning: 'Good potential but lacks specific seniority in React. Review portfolio before deciding.',
      status: 'maybe'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.k@email.com',
      phone: '+91-98765-43212',
      photo: 'AK',
      score: 45,
      scores: {
        technical: 40,
        experience: 30,
        education: 60,
        cultural: 70
      },
      experience: '1 year',
      education: 'Tier-3 College',
      location: 'Jaipur',
      currentRole: 'Junior Developer @ Local Startup',
      noticePeriod: 'Immediate',
      skills: ['HTML', 'CSS', 'JavaScript'],
      strengths: 'Eager to learn, good communication',
      gaps: 'Limited JavaScript, no React experience',
      highlights: [
        'Immediate availability',
        'Strong desire to learn'
      ],
      concerns: [
        'Significant skill gap',
        'Lack of relevant experience'
      ],
      recommendation: 'REJECT - Not enough experience',
      reasoning: 'Does not meet minimum technical requirements for this role.',
      status: 'rejected'
    }
  ];

  const handleJDUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedJD(e.target.files[0]);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedResumes(Array.from(e.target.files));
    }
  };

  const startAnalysis = () => {
    if (!uploadedJD || uploadedResumes.length === 0) {
      // For demo purposes, if they haven't uploaded, we'll pretend they did
      // to show the flow
      if (uploadedResumes.length === 0) {
        // Just setting dummy file for visual if needed, 
        // normally would alert or require file
      }
    }

    setCurrentView('processing');
    setProcessingProgress(0);

    // Simulation Sequence
    const steps = [
      { progress: 10, text: 'Initializing AI Agent...', file: '' },
      { progress: 30, text: 'Extracting text from PDF', file: 'Rahul_Verma_Resume.pdf' },
      { progress: 50, text: 'Comparing to Job Description', file: 'Priya_Singh_Resume.pdf' },
      { progress: 70, text: 'Analyzing technical skills gap', file: 'Amit_Kumar_Resume.pdf' },
      { progress: 90, text: 'Generating scores and recommendations', file: 'Finalizing...' },
      { progress: 100, text: 'Analysis Complete', file: '' }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setCandidates(mockCandidates);
        setCurrentView('results');
        return;
      }
      
      const step = steps[currentStep];
      setProcessingProgress(step.progress);
      setProcessingStep(step.text);
      setCurrentProcessingFile(step.file);
      currentStep++;
    }, 800);
  };

  const openScheduleModal = (candidate: any) => {
    setSchedulingCandidate(candidate);
    setEmailDraft(`To: ${candidate.email}
Subject: Interview Opportunity - Frontend Developer

Hi ${candidate.name.split(' ')[0]},

Thank you for applying to the Frontend Developer role at Recruit-AI. We were impressed by your ${candidate.experience} of experience and your background at ${candidate.currentRole.split('@')[1] || 'your current company'}.

We'd love to schedule a 45-minute technical interview with our Engineering Manager.

Please select a convenient time slot here:
[Calendly Link]

Looking forward to speaking with you!

Best regards,
Sarah
Talent Acquisition`);
    setShowScheduleModal(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'recommended': return 'border-l-emerald-500';
      case 'maybe': return 'border-l-amber-500';
      case 'rejected': return 'border-l-red-500';
      default: return 'border-l-gray-300';
    }
  };

  const getBadgeStyle = (status: string) => {
    switch(status) {
      case 'recommended': return 'bg-emerald-100 text-emerald-800';
      case 'maybe': return 'bg-amber-100 text-amber-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // --- VIEWS ---

  const LandingPage = () => (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="text-indigo-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recruit-AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium">Log in</button>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Stop Drowning in Resumes.<br />
            <span className="text-indigo-600">Let AI Screen Candidates.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Sarah saves 15 hours/week with our AI-powered screening. Upload resumes and get ranked results in minutes, not days.
          </p>
          <div className="flex justify-center space-x-4 mb-20">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-200"
            >
              Start Free Trial
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Upload</h3>
              <p className="text-gray-600">Drag & drop your Job Description and bulk resumes. We handle PDFs, Docs, and more.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Analyze</h3>
              <p className="text-gray-600">Our AI reads every resume, comparing skills and experience against your specific requirements.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Decide</h3>
              <p className="text-gray-600">Get a ranked list of top candidates. Schedule interviews with one click.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome back, Sarah. Ready to find your next hire?</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">New Screening</h3>
              <p className="text-sm text-gray-600">Start a new candidate analysis batch</p>
            </div>
            <div className="p-8 space-y-6">
              
              {/* JD Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                  Job Description
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleJDUpload}
                    className="hidden"
                    id="jd-upload"
                  />
                  <label htmlFor="jd-upload" className="cursor-pointer w-full block">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                      <Upload className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedJD ? uploadedJD.name : 'Click to upload Job Description'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX or TXT</p>
                  </label>
                </div>
              </div>

              {/* Resumes Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-indigo-500" />
                  Candidate Resumes
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer w-full block">
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                      <Upload className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedResumes.length > 0 
                        ? `${uploadedResumes.length} resumes selected` 
                        : 'Upload Resumes (Bulk)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Drag multiple PDFs here</p>
                  </label>
                </div>
              </div>

              <button
                onClick={startAnalysis}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Start AI Analysis</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Screenings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Frontend Developer</h4>
                  <span className="text-xs text-gray-500">Nov 28</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                  <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> 47</span>
                  <span className="flex items-center text-emerald-600"><CheckCircle className="h-3 w-3 mr-1" /> 8</span>
                  <span className="flex items-center text-amber-600"><AlertCircle className="h-3 w-3 mr-1" /> 12</span>
                </div>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                  View Results <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>

              <div className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Backend Engineer</h4>
                  <span className="text-xs text-gray-500">Nov 25</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                  <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> 32</span>
                  <span className="flex items-center text-emerald-600"><CheckCircle className="h-3 w-3 mr-1" /> 5</span>
                  <span className="flex items-center text-amber-600"><AlertCircle className="h-3 w-3 mr-1" /> 8</span>
                </div>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                  View Results <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProcessingView = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-2xl mx-auto">
      <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <div className="relative mb-8 mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-indigo-50 rounded-full p-6">
            <Users className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI Agent is Analyzing Candidates
        </h2>
        <p className="text-gray-500 mb-8">Reading resumes, comparing skills, and checking fit...</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-3 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${processingProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-8">
          <span>Progress</span>
          <span>{processingProgress}%</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 text-left border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm font-medium text-gray-900">{processingStep}</p>
          </div>
          {currentProcessingFile && (
            <p className="text-xs text-gray-500 ml-5 font-mono">
              Processing: {currentProcessingFile}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ResultsView = () => {
    const filteredCandidates = filterStatus === 'all' 
      ? candidates 
      : candidates.filter(c => c.status === filterStatus);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-2"
            >
              <ArrowRight className="h-3 w-3 mr-1 rotate-180" /> Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              Frontend Developer Screening
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Nov 28, 2025 • {candidates.length} Candidates Analyzed
            </p>
          </div>
          
          <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All <span className="ml-1 text-xs opacity-70">{candidates.length}</span>
            </button>
            <button
              onClick={() => setFilterStatus('recommended')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === 'recommended' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Recommended <span className="ml-1 text-xs opacity-70">{candidates.filter(c => c.status === 'recommended').length}</span>
            </button>
            <button
              onClick={() => setFilterStatus('maybe')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === 'maybe' ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Maybe <span className="ml-1 text-xs opacity-70">{candidates.filter(c => c.status === 'maybe').length}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-xl border border-gray-200 border-l-[6px] ${getStatusColor(candidate.status)} p-6 shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg border border-gray-200">
                        {candidate.photo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          {candidate.name}
                          <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${getBadgeStyle(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                          <span className="flex items-center"><Briefcase className="h-3 w-3 mr-1" /> {candidate.experience}</span>
                          <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {candidate.location}</span>
                          <span>• {candidate.education}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right lg:hidden">
                      <div className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">MATCH SCORE</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <p className="text-xs font-bold text-green-800 uppercase mb-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> Strengths
                      </p>
                      <p className="text-sm text-gray-700">{candidate.strengths}</p>
                    </div>
                    {candidate.gaps && (
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                        <p className="text-xs font-bold text-amber-800 uppercase mb-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> Gaps
                        </p>
                        <p className="text-sm text-gray-700">{candidate.gaps}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <div className="mt-0.5">
                      {candidate.status === 'recommended' ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-gray-400" />}
                    </div>
                    <p className="text-gray-700 italic">
                      <span className="font-semibold text-gray-900">AI Note:</span> {candidate.recommendation}
                    </p>
                  </div>
                </div>

                {/* Actions & Score (Desktop) */}
                <div className="flex flex-col justify-between items-end border-l border-gray-100 pl-6 min-w-[200px]">
                  <div className="hidden lg:block text-right mb-6">
                    <div className={`text-4xl font-extrabold ${getScoreColor(candidate.score)}`}>
                      {candidate.score}
                    </div>
                    <div className="text-xs text-gray-400 font-bold tracking-wider">MATCH SCORE</div>
                  </div>

                  <div className="space-y-3 w-full">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    {candidate.status === 'recommended' && (
                      <button 
                        onClick={() => openScheduleModal(candidate)}
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm flex items-center justify-center"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Interview
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Conditionally Render Views */}
      {currentView === 'landing' && <LandingPage />}
      
      {currentView !== 'landing' && (
        <>
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
              <div 
                className="flex items-center space-x-2 cursor-pointer" 
                onClick={() => setCurrentView('dashboard')}
              >
                <Users className="text-indigo-600 h-8 w-8" />
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Recruit-AI</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-900">
                  <Search className="h-5 w-5" />
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    SJ
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">Sarah Jenkins</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'processing' && <ProcessingView />}
            {currentView === 'results' && <ResultsView />}
          </main>
        </>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-start sticky top-0 z-10">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl border border-gray-200">
                  {selectedCandidate.photo}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-x-4 gap-y-1">
                    <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {selectedCandidate.email}</span>
                    <span className="flex items-center"><Briefcase className="h-3 w-3 mr-1" /> {selectedCandidate.currentRole}</span>
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {selectedCandidate.noticePeriod} Notice</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-8 bg-gray-50/50">
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Left Column: Scores */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Overall Match</p>
                    <div className={`text-5xl font-extrabold ${getScoreColor(selectedCandidate.score)} mb-2`}>
                      {selectedCandidate.score}<span className="text-2xl text-gray-300">/100</span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${getBadgeStyle(selectedCandidate.status)}`}>
                      {selectedCandidate.status === 'recommended' ? 'Recommended' : selectedCandidate.status === 'maybe' ? 'Under Review' : 'Rejected'}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900">Score Breakdown</h3>
                    
                    {[
                      { label: 'Technical Skills', val: selectedCandidate.scores.technical },
                      { label: 'Experience Match', val: selectedCandidate.scores.experience },
                      { label: 'Education', val: selectedCandidate.scores.education },
                      { label: 'Cultural Fit', val: selectedCandidate.scores.cultural },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-semibold text-gray-900">{item.val}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressBarColor(item.val)}`} 
                            style={{width: `${item.val}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 space-y-6">
                  {/* AI Analysis Box */}
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <h3 className="text-indigo-900 font-bold flex items-center mb-3">
                      <Star className="h-5 w-5 mr-2 text-indigo-600 fill-indigo-600" />
                      AI Analysis
                    </h3>
                    <p className="text-indigo-800 leading-relaxed">
                      {selectedCandidate.reasoning}
                    </p>
                  </div>

                  {/* Highlights & Concerns */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedCandidate.highlights.map((h: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        Potential Concerns
                      </h4>
                      <ul className="space-y-2">
                        {selectedCandidate.concerns.map((c: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Skills Cloud */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Detected Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white border-t border-gray-200 p-6 flex justify-end space-x-4">
              <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </button>
              <button 
                onClick={() => {
                  setSelectedCandidate(null);
                  openScheduleModal(selectedCandidate);
                }}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center shadow-lg shadow-emerald-200"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && schedulingCandidate && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Schedule Interview</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                 <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold border border-gray-200">
                  {schedulingCandidate.photo}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{schedulingCandidate.name}</p>
                  <p className="text-sm text-gray-500">{schedulingCandidate.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI-Generated Email Draft
                </label>
                <textarea
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  You can edit this draft before sending. The calendar link will be active.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-5 py-2.5 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Email sent successfully!');
                  setShowScheduleModal(false);
                }}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center shadow-md"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
