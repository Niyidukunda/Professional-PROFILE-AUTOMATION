@echo off
echo ================================================
echo  Professional Profile Automation - Quick Deploy
echo ================================================
echo.

echo 1. Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 2. Generating all materials...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to generate materials
    pause
    exit /b 1
)

echo.
echo Success! Your professional materials have been generated:
echo.
echo Local CV: generated\cv-latest.html
echo Standalone CV: docs\index.html
echo LinkedIn Bio: generated\linkedin-bio.txt
echo Profile Summary: generated\profile-summary.json
echo.
echo Next steps:
echo 1. Commit and push your changes to GitHub
echo 2. Enable GitHub Pages in your repository settings
echo 3. Your CV will be live at: https://YOUR-USERNAME.github.io/Professional-PROFILE-AUTOMATION/
echo.
echo To preview locally, run: python -m http.server 8000 --directory docs
echo.
pause