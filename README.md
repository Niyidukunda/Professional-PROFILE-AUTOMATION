# Professional Profile Automation System

A legendary automation system that maintains your professional materials with GitHub as the single source of truth. Update your data once, and automatically generate CV, LinkedIn content, and portfolio materials.

## Features

- **Single Source of Truth**: All professional data stored in structured JSON files
- **Multiple Output Formats**: HTML CV, LinkedIn bio, portfolio content, and more
- **Automatic Updates**: GitHub Actions regenerate materials when data changes
- **Modern Design**: Responsive HTML CV that works on any device
- **Easy Customization**: Simple JSON structure for quick updates
- **Version Control**: Track changes to your professional narrative over time

## Project Structure

```
professional-profile/
├── 📁 data/                    # Master data files (JSON)
│   ├── personal.json          # Contact info, title, summary
│   ├── experience.json        # Work history and achievements
│   ├── projects.json          # Featured projects and repositories
│   └── skills.json            # Technical skills and certifications
├── 📁 templates/               # Template files
│   ├── cv-template.html       # HTML CV template
│   └── linkedin-template.md   # LinkedIn bio template
├── 📁 generated/               # Auto-generated files
│   ├── cv-latest.html         # Current HTML CV
│   ├── linkedin-bio.txt       # LinkedIn-ready content
│   └── profile-summary.json   # Summary for other platforms
├── 📁 scripts/                 # Generation scripts
│   └── generate-cv.js         # Main generation script
├── 📁 .github/workflows/       # GitHub Actions
│   └── generate-profile.yml   # Auto-generation workflow
└── package.json               # Project configuration
```

## Prerequisites (First Time Setup)

**Before you start, make sure you have:**
- A computer with internet connection
- [Git installed](https://git-scm.com/downloads) (for version control)
- [Node.js installed](https://nodejs.org/) (version 16 or newer)
- A [GitHub account](https://github.com) (free)

**Not sure if you have these?** Open your terminal/command prompt and run:
```bash
git --version          # Should show a version number
node --version         # Should show a version number  
npm --version          # Should show a version number
```

## Quick Start

### 1. Get Your Own Copy
**Option A: Fork this repository (Recommended for beginners)**
1. Click the "Fork" button at the top of this GitHub page
2. This creates your own copy under your GitHub account

**Option B: Clone directly**
```bash
git clone https://github.com/Niyidukunda/Professional-PROFILE-AUTOMATION.git
cd Professional-PROFILE-AUTOMATION
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Materials
```bash
npm run generate
```

### 4. View Results
- **Windows**: Double-click `generated/cv-latest.html` to open in browser
- **Mac/Linux**: `open generated/cv-latest.html` 
- Copy content from `generated/linkedin-bio.txt` for LinkedIn
- Use `generated/profile-summary.json` for other platforms

### 5. Make It Yours!
Edit the files in the `data/` folder to replace my information with yours:
- `data/personal.json` - Your name, contact, summary
- `data/experience.json` - Your work history  
- `data/projects.json` - Your projects
- `data/skills.json` - Your technical skills

**Tip:** Use a text editor like VS Code, Notepad++, or even regular Notepad to edit JSON files.

## How It Works

### Data Files
All your professional information is stored in structured JSON files:

- **personal.json**: Basic info, contact details, professional summary
- **experience.json**: Work history with detailed responsibilities
- **projects.json**: Featured projects with technologies and links
- **skills.json**: Technical skills, certifications, and education

### Example: What Your Data Looks Like
Here's a sample of what goes in `data/personal.json`:
```json
{
  "name": "Your Name",
  "title": "Software Developer", 
  "location": "Your City, Country",
  "email": "your.email@example.com",
  "summary": "Passionate developer with 3+ years experience..."
}
```

**Don't worry if this looks scary!** You just need to replace the text inside the quotes with your own information.

### Automatic Generation
When you update any data file:
1. GitHub Actions detects the change
2. Runs the generation script
3. Creates updated CV and LinkedIn content
4. Commits the generated files back to the repository

### Templates
The system uses templates that are populated with your data:
- Modern, responsive HTML CV
- LinkedIn-optimized bio text
- Portfolio-ready content summaries

## Customization

### Update Your Information
1. Edit the JSON files in the `data/` directory
2. Commit and push changes
3. GitHub Actions automatically generates new materials

### Modify Templates
- Edit `templates/cv-template.html` for CV styling
- Modify `scripts/generate-cv.js` for generation logic
- Add new templates for other formats

### Add New Formats
The system is designed to be extensible:
```javascript
// Add to generate-cv.js
function generateNewFormat(data) {
    // Your generation logic here
}
```

## Benefits

- **Time Saving**: Update once, use everywhere
- **Consistency**: Same data across all platforms
- **Professional**: Modern, clean design
- **Trackable**: Version control for your career progression
- **Portable**: Works anywhere, no external dependencies
- **Showcase**: Demonstrates your automation skills

## Generated Files

### HTML CV (`generated/cv-latest.html`)
- Modern, responsive design
- Print-friendly styling
- Interactive project links
- Professional color scheme

### LinkedIn Bio (`generated/linkedin-bio.txt`)
- Optimized for LinkedIn character limits
- Hashtag suggestions included
- Key projects highlighted
- Copy-paste ready

### Profile Summary (`generated/profile-summary.json`)
- Structured data for other platforms
- Key metrics and highlights
- API-friendly format

## Scripts

- `npm run generate` - Generate all materials
- `npm run dev` - Generate and open CV in browser
- `npm run build` - Production build (same as generate)

## GitHub Actions

The workflow automatically:
- Triggers on data file changes
- Installs dependencies
- Generates new materials
- Commits results back to repository

## Deployment

### GitHub Pages (Optional)
Enable GitHub Pages to host your HTML CV:
1. Go to repository Settings
2. Enable Pages from the `generated/` folder
3. Your CV will be live at `https://username.github.io/professional-profile/cv-latest.html`

### Local Development
For testing changes locally:
```bash
npm run generate
open generated/cv-latest.html
```

## Troubleshooting

### Common Issues for New Users

**❌ "npm: command not found"**
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

**❌ "git: command not found"**  
- **Solution**: Install Git from [git-scm.com](https://git-scm.com)
- Restart your terminal after installation

**❌ "Permission denied" errors**
- **Windows**: Run terminal as Administrator
- **Mac/Linux**: Use `sudo` before the command

**❌ JSON syntax errors**
- **Solution**: Use a JSON validator like [jsonlint.com](https://jsonlint.com)
- Common mistakes: missing commas, extra quotes, unclosed brackets

**❌ Generated files don't update**
- **Solution**: Run `npm run generate` after editing data files
- Check that your JSON files are valid (no syntax errors)

**❌ GitHub Actions failing**
- **Solution**: Check the "Actions" tab in your GitHub repository
- Look for error messages in the workflow logs
- Ensure your JSON files are valid before committing

### Need Help?
- Create an [Issue](https://github.com/Niyidukunda/Professional-PROFILE-AUTOMATION/issues) on GitHub
- Include error messages and what you were trying to do
- I'll try to help you out!

## Contributing

This is a personal professional profile system, but feel free to:
- Fork for your own use
- Submit improvements  
- Share feedback

## Technical Details

- **Node.js**: Generation scripts
- **GitHub Actions**: Automation pipeline
- **HTML/CSS**: Modern responsive design
- **JSON**: Structured data format
- **Git**: Version control and automation

## License

MIT License - Feel free to use and modify for your own professional materials.

---

**Built with care for professional excellence**

*This automation system demonstrates technical skills while solving a real-world problem: maintaining consistent professional materials across multiple platforms.*