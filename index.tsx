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
  ChevronLeft,
  Search,
  MoreVertical,
  Clock,
  Briefcase
} from 'lucide-react';

/**
 * Recruit-AI - Intelligent Recruitment Dashboard
 * Based on Figma Wireframes & Frontend Prototype
 */

export default function RecruitAI() {
  // --- State Management ---
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, dashboard, processing, results
  const [uploadedJD, setUploadedJD] = useState(null);
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingLog, setProcessingLog] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [emailDraft, setEmailDraft] = useState('');

  // --- Mock Data (Simulating Backend) ---
  const mockCandidates = [
    {
      id: 1,
      name: 'Rahul Verma',
      email: 'rahul.verma@email.com',
      phone: '+91-98765-43210',
      score: 92,
      experience: '5 years',
      education: 'IIT Delhi',
      location: 'Bangalore',
      currentRole: 'Senior Developer @ Zomato',
      skills: ['React', 'Node.js', 'Redux', 'MongoDB'],
      strengths: 'React expertise, team lead experience, startup background',
      gaps: 'Limited TypeScript (mentioned in JD)',
      recommendation: 'STRONG MATCH - Schedule Interview',
      status: 'recommended',
      culturalFit: 95,
      technicalScore: 95,
      experienceScore: 90
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91-98765-43211',
      score: 78,
      experience: '3 years',
      education: 'NIT Trichy',
      location: 'Remote',
      currentRole: 'Full Stack Developer @ Paytm',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      strengths: 'Full-stack skills, startup experience, quick learner',
      gaps: '2 years in React (JD asks for 3+)',
      recommendation: 'MAYBE - Review work samples',
      status: 'maybe',
      culturalFit: 88,
      technicalScore: 75,
      experienceScore: 70
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.k@email.com',
      phone: '+91-98765-43212',
      score: 45,
      experience: '1 year',
      education: 'Tier-3 College',
      location: 'Jaipur',
      currentRole: 'Junior Developer @ Local Startup',
      skills: ['HTML', 'CSS', 'JavaScript'],
      strengths: 'Eager to learn, good communication',
      gaps: 'Limited JavaScript, no React experience',
      recommendation: 'REJECT - Not enough experience',
      status: 'rejected',
      culturalFit: 60,
      technicalScore: 40,
      experienceScore: 30
    }
  ];

  // --- Handlers ---

  const handleJDUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedJD(file);
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedResumes(prev => [...prev, ...files]);
  };

  const startAnalysis = () => {
    if (!uploadedJD || uploadedResumes.length === 0) {
      // In a real app, use a toast. Here we'll just allow it for demo if empty, or alert.
      // For smoother demo flow, if empty, we simulate mock uploads.
      if (!uploadedJD) setUploadedJD({ name: 'Senior_Frontend_Dev_JD.pdf' });
      if (uploadedResumes.length === 0) setUploadedResumes([{ name: 'Batch_Resume_Upload.pdf' }]);
    }
    
    setCurrentScreen('processing');
    setProcessingProgress(0);
    
    // Simulate complex AI processing steps
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress > 100) progress = 100;
      
      setProcessingProgress(progress);

      // Log updates based on progress
      if (progress < 30) setProcessingLog(`Extracting text from ${uploadedResumes.length || 3} resumes...`);
      else if (progress < 60) setProcessingLog('Comparing skills against Job Description...');
      else if (progress < 85) setProcessingLog('Analyzing cultural fit and experience gaps...');
      else setProcessingLog('Finalizing scores and ranking candidates...');

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCandidates(mockCandidates);
          setCurrentScreen('results');
        }, 800);
      }
    }, 400);
  };

  const openScheduleModal = (candidate) => {
    const draft = `Subject: Interview Opportunity - Frontend Developer

Hi ${candidate.name.split(' ')[0]},

Thank you for applying to the Frontend Developer role. We were impressed by your experience at ${candidate.currentRole.split('@')[1] || 'your current company'}.

We'd love to schedule a 45-minute technical interview with our Engineering Manager.

Please select a convenient time slot:
[Calendly Link Placeholder]

Looking forward to speaking with you!

Best regards,
Sarah, Talent Acquisition`;
    
    setEmailDraft(draft);
    setShowScheduleModal(true);
  };

  // --- Utility Functions for Styling ---
  const getStatusColor = (status) => {
    switch(status) {
      case 'recommended': return 'border-green-500 bg-white';
      case 'maybe': return 'border-amber-500 bg-white';
      case 'rejected': return 'border-red-500 bg-white';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'recommended': return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Recommended</span>;
      case 'maybe': return <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Maybe</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Rejected</span>;
      default: return null;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const filteredCandidates = filterStatus === 'all' 
    ? candidates 
    : candidates.filter(c => c.status === filterStatus);

  // --- Sub-Components (Inline for Single File) ---

  const Header = ({ showNav = true }) => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentScreen('landing')}>
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Users className="text-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Recruit-AI</h1>
        </div>
        {showNav && (
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">Help</button>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium text-sm">
                S
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Sarah</span>
            </div>
          </div>
        )}
        {!showNav && (
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-gray-900 font-medium text-sm">Log in</button>
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );

  // --- Screens ---

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header showNav={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Stop Drowning in Resumes.<br />
          <span className="text-indigo-600">Let AI Screen Candidates in Minutes.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Sarah saves 15 hours/week with AI-powered screening. Upload JDs and bulk resumes, get ranked results instantly.
        </p>
        <div className="flex justify-center space-x-4 mb-16">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all flex items-center"
          >
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
            Watch Demo
          </button>
        </div>

        {/* Social Proof / Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Upload className="text-indigo-600 h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">1. Upload Data</h3>
            <p className="text-gray-500">Drag & drop Job Descriptions and bulk resume PDFs.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-indigo-600 h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">2. AI Analysis</h3>
            <p className="text-gray-500">Our agent reads, parses, and scores candidates against your criteria.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="text-indigo-600 h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">3. Decide</h3>
            <p className="text-gray-500">Review ranked profiles and schedule interviews in one click.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">New Screening</h2>
              <p className="text-gray-500 mt-1">Start a new campaign by uploading requirements and candidates.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="space-y-6">
                
                {/* JD Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    1. Job Description
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group text-center cursor-pointer">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleJDUpload}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                        <FileText className={`h-6 w-6 ${uploadedJD ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedJD ? uploadedJD.name : 'Click to upload or drag JD'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOCX, or TXT</p>
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    2. Candidate Resumes (Bulk)
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group text-center cursor-pointer">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleResumeUpload}
                      multiple
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                        <Upload className={`h-6 w-6 ${uploadedResumes.length > 0 ? 'text-indigo-600' : 'text-gray-400'}`} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedResumes.length > 0 
                          ? `${uploadedResumes.length} resumes selected` 
                          : 'Drag multiple PDFs here'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Up to 50 files at once</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={startAnalysis}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-sm
                    ${(uploadedJD || uploadedResumes.length > 0) 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Start AI Analysis</span>
                </button>

              </div>
            </div>
          </div>

          {/* Recent Screenings Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent</h2>
              <p className="text-gray-500 mt-1">Previous screening campaigns.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Senior Frontend Dev', date: 'Nov 28, 2025', count: 47, rec: 8 },
                { title: 'Backend Engineer', date: 'Nov 25, 2025', count: 32, rec: 5 },
                { title: 'Product Designer', date: 'Nov 20, 2025', count: 18, rec: 2 },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{item.date}</div>
                  <div className="flex items-center space-x-2 text-xs font-medium">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{item.count} analyzed</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{item.rec} recommended</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );

  const ProcessingScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-white p-4 rounded-full border-2 border-indigo-100">
              <Users className="h-12 w-12 text-indigo-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Agent is Analyzing Candidates</h2>
          <p className="text-gray-500 mb-8 h-6">{processingLog}</p>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {processingProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
              <div style={{ width: `${processingProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300 ease-out"></div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className={`p-4 rounded-lg border ${processingProgress > 30 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
              <FileText className={`h-6 w-6 mx-auto mb-2 ${processingProgress > 30 ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="text-xs font-medium text-gray-600">Text Extraction</p>
            </div>
            <div className={`p-4 rounded-lg border ${processingProgress > 60 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
              <Search className={`h-6 w-6 mx-auto mb-2 ${processingProgress > 60 ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="text-xs font-medium text-gray-600">Skill Matching</p>
            </div>
            <div className={`p-4 rounded-lg border ${processingProgress > 90 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
              <TrendingUp className={`h-6 w-6 mx-auto mb-2 ${processingProgress > 90 ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="text-xs font-medium text-gray-600">Ranking</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Frontend Developer Screening</h2>
              <p className="text-sm text-gray-500">Analysis completed just now • {candidates.length} candidates</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            {['all', 'recommended', 'maybe', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all
                  ${filterStatus === status 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {status} <span className="ml-1 opacity-70">({status === 'all' ? candidates.length : candidates.filter(c => c.status === status).length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* List of Candidates */}
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className={`group bg-white rounded-xl border-l-4 shadow-sm hover:shadow-lg transition-all p-6 ${getStatusColor(candidate.status)}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                
                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    {getStatusBadge(candidate.status)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1"/> {candidate.experience}</span>
                    <span>•</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1"/> {candidate.education}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-medium">{candidate.currentRole}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-green-800 uppercase mb-1">Strengths</p>
                      <p className="text-sm text-gray-700">{candidate.strengths}</p>
                    </div>
                    {candidate.gaps && (
                       <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs font-bold text-amber-800 uppercase mb-1">Potential Gaps</p>
                        <p className="text-sm text-gray-700">{candidate.gaps}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex flex-row md:flex-col items-end justify-between min-w-[200px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-4">
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(candidate.score)}`}>
                      {candidate.score}
                      <span className="text-lg text-gray-300 font-normal">/100</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mt-1 text-right">AI Score</p>
                  </div>
                  
                  <div className="flex flex-col w-full gap-2">
                    <button 
                      onClick={() => setSelectedCandidate(candidate)}
                      className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      View Analysis
                    </button>
                    {candidate.status !== 'rejected' && (
                      <button 
                        onClick={() => openScheduleModal(candidate)}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center justify-center"
                      >
                        <Mail className="w-4 h-4 mr-2" /> Schedule
                      </button>
                    )}
                  </div>
                </div>

              </div>
              
              {/* AI Insight Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                <div className="mt-1">
                  {candidate.status === 'recommended' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                </div>
                <p className="text-sm text-gray-600 italic">
                  <span className="font-semibold text-gray-900 not-italic">AI Reasoning:</span> {candidate.recommendation}
                </p>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );

  // --- Modals ---

  const CandidateModal = () => {
    if (!selectedCandidate) return null;
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm text-2xl font-bold text-indigo-600">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4" /> {selectedCandidate.email}
                  <span>•</span>
                  {selectedCandidate.phone}
                </div>
                <p className="text-sm text-indigo-600 font-medium mt-1">{selectedCandidate.currentRole}</p>
              </div>
            </div>
            <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-gray-200 rounded-full">
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div>
                <p className="text-sm font-semibold text-indigo-900 uppercase">Overall Match Score</p>
                <p className="text-sm text-indigo-700 mt-1">{selectedCandidate.recommendation}</p>
              </div>
              <div className="text-4xl font-bold text-indigo-600">{selectedCandidate.score}/100</div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Detailed Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Technical Skills', score: selectedCandidate.technicalScore, color: 'bg-green-500' },
                    { label: 'Experience Match', score: selectedCandidate.experienceScore, color: 'bg-blue-500' },
                    { label: 'Cultural Fit', score: selectedCandidate.culturalFit, color: 'bg-purple-500' }
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{metric.label}</span>
                        <span className="font-bold text-gray-900">{metric.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className={`${metric.color} h-2.5 rounded-full`} style={{ width: `${metric.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" /> Key Highlights
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 pl-2">
                    {selectedCandidate.strengths.split(',').map((s, i) => (
                      <li key={i}>{s.trim()}</li>
                    ))}
                    <li>Verified education at {selectedCandidate.education}</li>
                    <li>Strong career progression</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" /> Areas to Probe
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 pl-2">
                    {selectedCandidate.gaps ? selectedCandidate.gaps.split(',').map((g, i) => (
                      <li key={i}>{g.trim()}</li>
                    )) : <li>No major flags detected</li>}
                    <li>Salary expectations vs budget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
              Download Resume
            </button>
            <button 
              onClick={() => { setSelectedCandidate(null); openScheduleModal(selectedCandidate); }}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-sm"
            >
              Schedule Interview
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ScheduleModal = () => {
    if (!showScheduleModal) return null;
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" /> Schedule Interview
            </h2>
            <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Generated Email Draft
              </label>
              <div className="relative">
                <textarea
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm leading-relaxed text-gray-800"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white px-2 rounded">
                  Editable
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <button className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                <Clock className="w-4 h-4" /> Connect Calendar
              </button>
              <button className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
                <MoreVertical className="w-4 h-4" /> Insert Calendly Link
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
            <button onClick={() => setShowScheduleModal(false)} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
              Cancel
            </button>
            <button 
              onClick={() => { setShowScheduleModal(false); alert('Email sent successfully!'); }}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" /> Send Invitation
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="font-sans antialiased text-gray-900">
      {currentScreen === 'landing' && <LandingPage />}
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'processing' && <ProcessingScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
      
      {/* Global Modals */}
      <CandidateModal />
      <ScheduleModal />
    </div>
  );
}
