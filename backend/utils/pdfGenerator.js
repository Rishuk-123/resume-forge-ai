const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = (resume, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);
      
      // Header - Personal Info
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text(resume.personalInfo.fullName.toUpperCase(), { align: 'center' });
      
      doc.fontSize(10)
         .font('Helvetica')
         .moveDown(0.5);
      
      const contact = [
        resume.personalInfo.email,
        resume.personalInfo.phone,
        resume.personalInfo.location
      ].filter(Boolean).join(' | ');
      
      doc.text(contact, { align: 'center' });
      
      if (resume.personalInfo.linkedin || resume.personalInfo.github) {
        doc.moveDown(0.3);
        const links = [];
        if (resume.personalInfo.linkedin) links.push(resume.personalInfo.linkedin);
        if (resume.personalInfo.github) links.push(resume.personalInfo.github);
        doc.text(links.join(' | '), { align: 'center', link: links[0] });
      }
      
      doc.moveDown(1);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);
      
      // Professional Summary
      if (resume.summary) {
        addSection(doc, 'PROFESSIONAL SUMMARY');
        doc.fontSize(10)
           .font('Helvetica')
           .text(resume.summary, { align: 'justify' });
        doc.moveDown(1);
      }
      
      // Skills
      if (resume.skills) {
        addSection(doc, 'SKILLS');
        
        if (resume.skills.technical && resume.skills.technical.length > 0) {
          doc.fontSize(10)
             .font('Helvetica-Bold')
             .text('Technical: ', { continued: true })
             .font('Helvetica')
             .text(resume.skills.technical.join(', '));
          doc.moveDown(0.5);
        }
        
        if (resume.skills.soft && resume.skills.soft.length > 0) {
          doc.fontSize(10)
             .font('Helvetica-Bold')
             .text('Soft Skills: ', { continued: true })
             .font('Helvetica')
             .text(resume.skills.soft.join(', '));
          doc.moveDown(0.5);
        }
        
        doc.moveDown(0.5);
      }
      
      // Experience
      if (resume.experience && resume.experience.length > 0) {
        addSection(doc, 'PROFESSIONAL EXPERIENCE');
        
        resume.experience.forEach((exp, index) => {
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(exp.position, { continued: true })
             .fontSize(10)
             .font('Helvetica')
             .text(` - ${exp.company}`, { continued: false });
          
          const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          const endDate = exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          
          doc.fontSize(9)
             .fillColor('#666666')
             .text(`${exp.location} | ${startDate} - ${endDate}`)
             .fillColor('#000000');
          
          doc.moveDown(0.5);
          
          if (exp.description && exp.description.length > 0) {
            exp.description.forEach(desc => {
              doc.fontSize(10)
                 .font('Helvetica')
                 .text(`• ${desc}`, { indent: 20 });
            });
          }
          
          if (exp.achievements && exp.achievements.length > 0) {
            exp.achievements.forEach(achievement => {
              doc.fontSize(10)
                 .font('Helvetica')
                 .text(`• ${achievement}`, { indent: 20 });
            });
          }
          
          doc.moveDown(1);
        });
      }
      
      // Projects
      if (resume.projects && resume.projects.length > 0) {
        addSection(doc, 'PROJECTS');
        
        resume.projects.forEach(project => {
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(project.name);
          
          if (project.technologies && project.technologies.length > 0) {
            doc.fontSize(9)
               .fillColor('#666666')
               .text(`Technologies: ${project.technologies.join(', ')}`)
               .fillColor('#000000');
          }
          
          doc.moveDown(0.3);
          
          if (project.description) {
            doc.fontSize(10)
               .font('Helvetica')
               .text(project.description);
          }
          
          if (project.highlights && project.highlights.length > 0) {
            project.highlights.forEach(highlight => {
              doc.text(`• ${highlight}`, { indent: 20 });
            });
          }
          
          doc.moveDown(1);
        });
      }
      
      // Education
      if (resume.education && resume.education.length > 0) {
        addSection(doc, 'EDUCATION');
        
        resume.education.forEach(edu => {
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(edu.degree + ' in ' + edu.field);
          
          doc.fontSize(10)
             .font('Helvetica')
             .text(edu.institution);
          
          const gradDate = new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          doc.fontSize(9)
             .fillColor('#666666')
             .text(`Graduated: ${gradDate}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}`)
             .fillColor('#000000');
          
          doc.moveDown(1);
        });
      }
      
      // Certifications
      if (resume.certifications && resume.certifications.length > 0) {
        addSection(doc, 'CERTIFICATIONS');
        
        resume.certifications.forEach(cert => {
          doc.fontSize(10)
             .font('Helvetica')
             .text(`• ${cert.name} - ${cert.issuer} (${new Date(cert.date).getFullYear()})`);
        });
      }
      
      doc.end();
      
      stream.on('finish', () => {
        resolve(filePath);
      });
      
    } catch (error) {
      reject(error);
    }
  });
};

function addSection(doc, title) {
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .fillColor('#1a1a1a')
     .text(title);
  
  doc.moveDown(0.3);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);
}

module.exports = { generatePDF };