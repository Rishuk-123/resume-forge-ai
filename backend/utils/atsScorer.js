const { industryTemplates } = require('./templateEngine');

const calculateATSScore = (resume) => {
  let score = 0;
  const industry = industryTemplates[resume.industry];
  
  if (!industry) return 0;
  
  // Check for required sections (30 points)
  const requiredSections = industry.sections;
  let sectionsPresent = 0;
  
  if (resume.summary) sectionsPresent++;
  if (resume.experience && resume.experience.length > 0) sectionsPresent++;
  if (resume.education && resume.education.length > 0) sectionsPresent++;
  if (resume.skills && Object.keys(resume.skills).length > 0) sectionsPresent++;
  if (resume.projects && resume.projects.length > 0) sectionsPresent++;
  if (resume.certifications && resume.certifications.length > 0) sectionsPresent++;
  
  score += (sectionsPresent / requiredSections.length) * 30;
  
  // Check for industry keywords (40 points)
  const resumeText = JSON.stringify(resume).toLowerCase();
  let keywordsFound = 0;
  
  industry.keywords.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      keywordsFound++;
    }
  });
  
  score += (keywordsFound / industry.keywords.length) * 40;
  
  // Check for quantifiable achievements (15 points)
  let hasMetrics = false;
  const metricPatterns = /\d+%|\d+\+|increased|decreased|reduced|improved/gi;
  
  if (resume.experience) {
    resume.experience.forEach(exp => {
      const expText = JSON.stringify(exp);
      if (metricPatterns.test(expText)) {
        hasMetrics = true;
      }
    });
  }
  
  if (hasMetrics) score += 15;
  
  // Check for contact information (10 points)
  if (resume.personalInfo) {
    const { email, phone, linkedin } = resume.personalInfo;
    if (email) score += 3;
    if (phone) score += 3;
    if (linkedin) score += 4;
  }
  
  // Check resume length (5 points)
  const experienceCount = resume.experience ? resume.experience.length : 0;
  if (experienceCount >= 2 && experienceCount <= 5) {
    score += 5;
  }
  
  return Math.min(Math.round(score), 100);
};

const generateATSSuggestions = (resume, score) => {
  const suggestions = [];
  const industry = industryTemplates[resume.industry];
  
  if (score < 70) {
    suggestions.push('Your ATS score is below recommended threshold. Consider the following improvements:');
  }
  
  // Section suggestions
  if (!resume.summary || resume.summary.length < 50) {
    suggestions.push('Add a compelling professional summary (100-150 words)');
  }
  
  if (!resume.experience || resume.experience.length === 0) {
    suggestions.push('Add at least 2-3 relevant work experiences');
  }
  
  // Keyword suggestions
  const resumeText = JSON.stringify(resume).toLowerCase();
  const missingKeywords = industry.keywords.filter(
    keyword => !resumeText.includes(keyword.toLowerCase())
  );
  
  if (missingKeywords.length > 0) {
    suggestions.push(`Consider including these industry keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }
  
  // Metrics suggestion
  const metricPatterns = /\d+%|\d+\+|increased|decreased|reduced|improved/gi;
  const hasMetrics = metricPatterns.test(JSON.stringify(resume.experience));
  
  if (!hasMetrics) {
    suggestions.push('Add quantifiable achievements (e.g., "Increased sales by 25%")');
  }
  
  // Contact info
  if (!resume.personalInfo?.linkedin) {
    suggestions.push('Add your LinkedIn profile URL');
  }
  
  return suggestions;
};

module.exports = { calculateATSScore, generateATSSuggestions };