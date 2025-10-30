import fs from 'fs';
import path from 'path';

// Validation functions
function validatePersonal(data) {
    const required = ['name', 'phone', 'email', 'title', 'summary'];
    const errors = [];
    required.forEach(field => {
        if (!data[field]) {
            errors.push(`Personal data missing required field: ${field}`);
        }
    });
    // Email validation
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        errors.push('Invalid email format');
    }
    return errors;
}

function validateExperience(data) {
    const errors = [];
    
    if (!data.work_experience || !Array.isArray(data.work_experience)) {
        errors.push('Experience data must contain work_experience array');
        return errors;
    }
    
    data.work_experience.forEach((job, index) => {
        const required = ['title', 'company', 'period', 'responsibilities'];
        required.forEach(field => {
            if (!job[field]) {
                errors.push(`Job ${index + 1} missing required field: ${field}`);
            }
        });
        
        if (job.responsibilities && !Array.isArray(job.responsibilities)) {
            errors.push(`Job ${index + 1} responsibilities must be an array`);
        }
    });
    
    return errors;
}

function validateProjects(data) {
    const errors = [];
    
    if (!data.featured_projects || !Array.isArray(data.featured_projects)) {
        errors.push('Projects data must contain featured_projects array');
        return errors;
    }
    
    data.featured_projects.forEach((project, index) => {
        const required = ['name', 'description', 'technologies'];
        required.forEach(field => {
            if (!project[field]) {
                errors.push(`Project ${index + 1} missing required field: ${field}`);
            }
        });
        
        if (project.technologies && !Array.isArray(project.technologies)) {
            errors.push(`Project ${index + 1} technologies must be an array`);
        }
    });
    
    return errors;
}

function validateSkills(data) {
    const errors = [];
    
    if (!data.technical_skills) {
        errors.push('Skills data must contain technical_skills object');
        return errors;
    }
    
    if (!data.certifications || !Array.isArray(data.certifications)) {
        errors.push('Skills data must contain certifications array');
    }
    
    return errors;
}
function validateAllData() {
    console.log('🔍 Validating data files...\n');
    
    let totalErrors = 0;
    const dataFiles = ['personal', 'experience', 'projects', 'skills'];
    
    dataFiles.forEach(fileName => {
        try {
            const filePath = path.join(__dirname, `../data/${fileName}.json`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            let errors = [];
            switch (fileName) {
                case 'personal':
                    errors = validatePersonal(data);
                    break;
                case 'experience':
                    errors = validateExperience(data);
                    break;
                case 'projects':
                    errors = validateProjects(data);
                    break;
                case 'skills':
                    errors = validateSkills(data);
                    break;
            }
            
            if (errors.length === 0) {
                console.log(`✅ ${fileName}.json: Valid`);
            } else {
                console.log(`❌ ${fileName}.json: ${errors.length} error(s)`);
                errors.forEach(error => console.log(`   - ${error}`));
                totalErrors += errors.length;
            }
        } catch (error) {
            console.log(`❌ ${fileName}.json: File error - ${error.message}`);
            totalErrors++;
        }
    });
    
    console.log(`\n📊 Validation complete: ${totalErrors} total errors`);
    
    if (totalErrors === 0) {
        console.log('🎉 All data files are valid! Ready to generate materials.');
    } else {
        console.log('🔧 Please fix the errors above before generating materials.');
        process.exit(1);
    }
}

// Run validation
if (import.meta.url === `file://${process.argv[1]}`) {
    validateAllData();
}

export { validateAllData };