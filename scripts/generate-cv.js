const fs = require('fs');
const path = require('path');

// Load all data files
function loadData() {
    try {
        const personal = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/personal.json'), 'utf8'));
        const experience = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/experience.json'), 'utf8'));
        const projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf8'));
        const skills = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/skills.json'), 'utf8'));
        
        return { ...personal, ...experience, ...projects, ...skills };
    } catch (error) {
        console.error('Error loading data files:', error.message);
        process.exit(1);
    }
}

// Simple template replacement function
function replaceTemplateVariables(template, data) {
    let result = template;
    
    // Replace simple variables
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, data[key]);
        }
    });
    
    return result;
}

// Generate experience HTML
function generateExperienceHTML(experiences) {
    return experiences.map(job => `
        <div class="job">
            <div class="job-header">${job.title} – ${job.company}</div>
            <div class="job-details">${job.period}</div>
            <ul class="responsibilities">
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Generate projects HTML
function generateProjectsHTML(projects) {
    return projects.map(project => `
        <div class="project-card">
            <div class="project-title">${project.name}</div>
            <p>${project.description}</p>
            <div style="margin: 0.5rem 0;">
                <strong>Technologies:</strong> ${project.technologies.join(', ')}
            </div>
            ${project.highlights ? `
                <div style="margin: 0.5rem 0;">
                    <strong>Highlights:</strong>
                    <ul style="margin-left: 1rem; margin-top: 0.3rem;">
                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            <div class="project-links">
                ${project.repository ? `<a href="${project.repository}" target="_blank">View Code</a>` : ''}
                ${project.live_url ? `<a href="${project.live_url}" target="_blank">Live Demo</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Generate LinkedIn content
function generateLinkedInContent(data) {
    const linkedinBio = `${data.title} | ${data.location_short}

${data.summary}

🔧 Core Technologies: ${data.technical_skills.programming.frontend.slice(0, 4).join(' • ')} • ${data.technical_skills.programming.backend.slice(0, 2).join(' • ')}

📊 Recent Projects:
${data.featured_projects.slice(0, 3).map(project => `• ${project.name}: ${project.description.substring(0, 80)}...`).join('\n')}

🎓 Certifications: ${data.certifications.slice(0, 3).map(cert => cert.name).join(' • ')}

💼 Founder: del IT & Web
🌍 Building accessible technology solutions in South Africa

#WebDevelopment #EducationalTechnology #FullStackDeveloper`;

    return linkedinBio;
}

// Main generation function
function generateCV() {
    console.log('🚀 Starting CV generation...');
    
    const data = loadData();
    const template = fs.readFileSync(path.join(__dirname, '../templates/cv-template.html'), 'utf8');
    
    // Replace template variables
    let html = replaceTemplateVariables(template, data);
    
    // Generate and insert experience HTML
    const experienceHTML = generateExperienceHTML(data.work_experience);
    html = html.replace('<div id="experience-placeholder"></div>', experienceHTML);
    
    // Generate and insert projects HTML
    const projectsHTML = generateProjectsHTML(data.featured_projects);
    html = html.replace('<div id="projects-placeholder"></div>', projectsHTML);
    
    // Ensure generated directory exists
    const generatedDir = path.join(__dirname, '../generated');
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, { recursive: true });
    }
    
    // Write HTML CV
    fs.writeFileSync(path.join(generatedDir, 'cv-latest.html'), html);
    console.log('✅ HTML CV generated: generated/cv-latest.html');
    
    // Generate LinkedIn content
    const linkedinContent = generateLinkedInContent(data);
    fs.writeFileSync(path.join(generatedDir, 'linkedin-bio.txt'), linkedinContent);
    console.log('✅ LinkedIn content generated: generated/linkedin-bio.txt');
    
    // Generate summary JSON for other uses
    const summary = {
        name: data.name,
        title: data.title,
        location: data.location_short,
        summary: data.summary,
        key_skills: [
            ...data.technical_skills.programming.frontend.slice(0, 3),
            ...data.technical_skills.programming.backend.slice(0, 2)
        ],
        recent_projects: data.featured_projects.slice(0, 3).map(p => ({
            name: p.name,
            description: p.description,
            technologies: p.technologies.slice(0, 3)
        })),
        generated_at: new Date().toISOString()
    };
    
    fs.writeFileSync(path.join(generatedDir, 'profile-summary.json'), JSON.stringify(summary, null, 2));
    console.log('✅ Profile summary generated: generated/profile-summary.json');
    
    console.log('\n🎉 All materials generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Open generated/cv-latest.html in your browser');
    console.log('2. Copy content from generated/linkedin-bio.txt for LinkedIn');
    console.log('3. Use generated/profile-summary.json for other platforms');
}

// Run the generator
if (require.main === module) {
    generateCV();
}

module.exports = { generateCV, loadData };