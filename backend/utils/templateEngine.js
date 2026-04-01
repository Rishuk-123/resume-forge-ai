const industryTemplates = {
  technology: {
    sections: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
    keywords: ['agile', 'scrum', 'cloud', 'devops', 'api', 'database', 'frontend', 'backend'],
    recommendedSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'],
    summaryTemplate: 'Results-driven software professional with expertise in [SKILLS]. Proven track record in [ACHIEVEMENTS].'
  },
  
  finance: {
    sections: ['summary', 'experience', 'education', 'certifications', 'skills'],
    keywords: ['financial analysis', 'risk management', 'compliance', 'forecasting', 'budgeting'],
    recommendedSkills: ['Excel', 'SQL', 'Financial Modeling', 'Bloomberg Terminal', 'Python'],
    summaryTemplate: 'Detail-oriented finance professional with [X] years of experience in [AREA]. Strong analytical skills in [SPECIALIZATION].'
  },
  
  healthcare: {
    sections: ['summary', 'experience', 'education', 'certifications', 'skills'],
    keywords: ['patient care', 'medical records', 'hipaa', 'clinical', 'diagnosis'],
    recommendedSkills: ['EMR Systems', 'Patient Care', 'Medical Terminology', 'Healthcare Compliance'],
    summaryTemplate: 'Dedicated healthcare professional with expertise in [SPECIALTY]. Committed to providing quality patient care.'
  },
  
  marketing: {
    sections: ['summary', 'experience', 'projects', 'skills', 'education'],
    keywords: ['seo', 'sem', 'content marketing', 'social media', 'analytics', 'campaigns', 'roi'],
    recommendedSkills: ['Google Analytics', 'SEO', 'Content Strategy', 'Social Media Marketing', 'Adobe Creative Suite'],
    summaryTemplate: 'Creative marketing professional with proven success in [CHANNELS]. Expert in driving [METRICS] growth.'
  },
  
  education: {
    sections: ['summary', 'experience', 'education', 'certifications', 'skills'],
    keywords: ['curriculum', 'lesson planning', 'student engagement', 'assessment', 'pedagogy'],
    recommendedSkills: ['Classroom Management', 'Curriculum Development', 'Educational Technology', 'Assessment'],
    summaryTemplate: 'Passionate educator with [X] years of experience in [SUBJECT/LEVEL]. Dedicated to student success.'
  }
};

module.exports = { industryTemplates };