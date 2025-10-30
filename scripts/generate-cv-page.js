import fs from 'fs';
import path from 'path';

function generateStandaloneCVPage() {
    // Ensure docs directory exists
    const docsDir = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
        console.log('✅ Created docs directory');
    }
    
    // Create .nojekyll file to disable Jekyll
    const nojekyllPath = path.join(docsDir, '.nojekyll');
    fs.writeFileSync(nojekyllPath, 'Jekyll processing disabled for GitHub Pages');
    console.log('✅ Created .nojekyll file');
    
    // Load data
    const personal = JSON.parse(fs.readFileSync('data/personal.json', 'utf8'));
    const experience = JSON.parse(fs.readFileSync('data/experience.json', 'utf8'));
    const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
    const skills = JSON.parse(fs.readFileSync('data/skills.json', 'utf8'));
    
    const data = { ...personal, ...experience, ...projects, ...skills };
    console.log('🔍 Loaded data for index.html:', JSON.stringify(data, null, 2));
    
    // Generate standalone CV HTML
    const standaloneCVHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${data.name} - ${data.title} Professional CV">
    <meta name="author" content="${data.name}">
    <meta property="og:title" content="${data.name} - Professional CV">
    <meta property="og:description" content="${data.title} - View my professional experience and skills">
    <title>${data.name} - CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 21cm;
            margin: 0 auto;
            padding: 2cm;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
        }
        
        .name { 
            font-size: 2rem; 
            font-weight: bold; 
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        
        .contact-info {
            font-size: 0.85rem;
            color: #555;
            line-height: 1.8;
        }
        
        .contact-info a {
            color: #3498db;
            text-decoration: none;
        }
        
        .section {
            margin-bottom: 2rem;
        }
        
        .section-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .job {
            margin-bottom: 1.5rem;
        }
        
        .job-header {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.3rem;
        }
        
        .job-details {
            color: #7f8c8d;
            font-style: italic;
            margin-bottom: 0.5rem;
        }
        
        .responsibilities {
            list-style: none;
            padding-left: 0;
        }
        
        .responsibilities li {
            margin-bottom: 0.3rem;
            padding-left: 1rem;
            position: relative;
        }
        
        .responsibilities li::before {
            content: "•";
            color: #3498db;
            position: absolute;
            left: 0;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .skill-category {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }
        
        .skill-category h4 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        
        .project-card {
            background: #f8f9fa;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
            border-left: 4px solid #3498db;
        }
        
        .project-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        
        .project-links a {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 3px;
            text-decoration: none;
            font-size: 0.7em;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
        }
        
        .cert-item {
            margin-bottom: 0.5rem;
        }
        
        .cert-name {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .education-item {
            margin-bottom: 0.8rem;
        }
        
        .footer {
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
            border-top: 1px solid #bdc3c7;
            color: #7f8c8d;
            font-size: 0.8rem;
        }
        
        @media print {
            body { padding: 1cm; }
            .footer { display: none; }
        }
        
        @media (max-width: 768px) {
            body { padding: 1rem; }
            .name { font-size: 2rem; }
            .skills-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <div class="header">
        <div class="name">${data.name}</div>
        <div class="contact-info">
            ${data.phone ? data.phone : ''} | ${data.email ? data.email : ''}<br>
            ${data.website ? `<a href="${data.website}" target="_blank">${data.website}</a> | ` : ''}
            ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ''} | 
            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : ''}<br>
            ${data.location ? data.location : ''}
        </div>
    </div>

    <!-- Professional Summary -->
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${data.summary}</p>
    </div>

    <!-- Work Experience -->
    <div class="section">
        <div class="section-title">Work Experience</div>
        ${data.work_experience.map(job => `
            <div class="job">
                <div class="job-header">${job.title} – ${job.company}</div>
                <div class="job-details">${job.period}</div>
                <ul class="responsibilities">
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>

    <!-- Featured Projects -->
    <div class="section">
        <div class="section-title">Featured Projects</div>
        ${data.featured_projects.map(project => `
            <div class="project-card">
                <div class="project-title">${project.name}</div>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                <div class="project-links">
                    ${project.repository ? `<a href="${project.repository}" target="_blank">View Code</a><br><span style="font-size:0.8em; color:#555; word-break:break-all;">${project.repository}</span>` : ''}
                    ${project.live_url ? `<a href="${project.live_url}" target="_blank">Live Demo</a>` : ''}
                </div>
            </div>
        `).join('')}
    </div>

    <!-- Technical Skills -->
    <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
            ${data.technical_skills.web_development?.tools ? `<div class="skill-category"><h4>Web Development</h4><p>Tools: ${data.technical_skills.web_development.tools.join(', ')}</p></div>` : ''}
            ${data.technical_skills.databases?.tools ? `<div class="skill-category"><h4>Databases</h4><p>Tools: ${data.technical_skills.databases.tools.join(', ')}</p></div>` : ''}
            ${data.technical_skills.version_control_automation?.tools ? `<div class="skill-category"><h4>Version Control & Automation</h4><p>Tools: ${data.technical_skills.version_control_automation.tools.join(', ')}</p></div>` : ''}
            ${data.technical_skills.infrastructure_networking?.tools ? `<div class="skill-category"><h4>Infrastructure & Networking</h4><p>Tools: ${data.technical_skills.infrastructure_networking.tools.join(', ')}</p></div>` : ''}
            ${data.technical_skills["API integration"]?.tools ? `<div class="skill-category"><h4>API Integration</h4><p>Tools: ${data.technical_skills["API integration"].tools.join(', ')}</p></div>` : ''}
        </div>
    </div>

    <!-- Education & Certifications -->
    <div class="section">
        <div class="section-title">Education & Certifications</div>
        ${data.certifications.map(cert => `
            <div class="cert-item">
                <span class="cert-name">${cert.name}</span> (${cert.year})${cert.issuer ? ` - ${cert.issuer}` : ''}
            </div>
        `).join('')}
        ${(() => {
            // Custom order: Cisco CCNA first, Command Secondary School last, Durban University second-last
            const edu = [...data.education];
            const ciscoIdx = edu.findIndex(e => e.school === 'Cisco CCNA');
            const commandIdx = edu.findIndex(e => e.school === 'Command Secondary School');
            const durbanIdx = edu.findIndex(e => e.school === 'Durban University of Technology');
            let rest = edu.filter(e => e.school !== 'Cisco CCNA' && e.school !== 'Command Secondary School' && e.school !== 'Durban University of Technology');
            // Sort rest by year descending
            rest = rest.sort((a, b) => {
                const yearA = Math.max(...(a.period.match(/\d{4}/g) || [0]));
                const yearB = Math.max(...(b.period.match(/\d{4}/g) || [0]));
                return yearB - yearA;
            });
            const ordered = [];
            if (ciscoIdx !== -1) ordered.push(edu[ciscoIdx]);
            ordered.push(...rest);
            if (durbanIdx !== -1) ordered.push(edu[durbanIdx]);
            if (commandIdx !== -1) ordered.push(edu[commandIdx]);
            return ordered.map(edu => `
                <div class="education-item">
                    <div class="cert-name">${edu.school} (${edu.period})</div>
                    <div>${edu.degree} ${edu.status ? `(${edu.status})` : ''}</div>
                </div>
            `).join('');
        })()}
    </div>

    <!-- References -->
    <div class="section">
        <div class="section-title">References</div>
        ${data.references && data.references.length ? data.references.map(ref => `
            <div class="reference-item">
                <strong>${ref.name}</strong> – ${ref.title}<br>
                ${ref.phone ? `Phone: ${ref.phone}` : ''}
                ${ref.email ? `<br>Email: ${ref.email}` : ''}
            </div>
        `).join('') : '<div>No references available.</div>'}
    </div>
    
    <div class="footer">
        This CV is automatically generated and maintained through a professional profile automation system.<br>
        For the most current version, visit this URL directly.
    </div>
</body>
</html>`;

    // Write standalone CV page
    fs.writeFileSync(path.join(docsDir, 'index.html'), standaloneCVHTML);
    console.log('✅ Standalone CV website generated at docs/index.html');

    // Also write HTML to generated/cv-latest.html
    const generatedDir = path.join(process.cwd(), 'generated');
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, { recursive: true });
        console.log('✅ Created generated directory');
    }
    fs.writeFileSync(path.join(generatedDir, 'cv-latest.html'), standaloneCVHTML);
    console.log('✅ CV HTML also written to generated/cv-latest.html');

    // Generate PDF from HTML and save to generated/cv-latest.pdf
    // Use html-pdf or puppeteer for PDF generation
    import('puppeteer').then(puppeteer => {
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(standaloneCVHTML, { waitUntil: 'networkidle0' });
            await page.pdf({ path: path.join(generatedDir, 'cv-latest.pdf'), format: 'A4' });
            await browser.close();
            console.log('✅ PDF generated at generated/cv-latest.pdf');
            // Log data for PDF generation
            console.log('🔍 Data used for PDF generation:', JSON.stringify(data, null, 2));
        })();
    });
    // Log data for HTML generation
    console.log('🔍 Data used for HTML generation:', JSON.stringify(data, null, 2));
}

generateStandaloneCVPage();