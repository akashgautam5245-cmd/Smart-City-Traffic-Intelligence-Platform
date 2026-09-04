@echo off
echo Initializing Git repository and pushing NagarFlow AI backend optimizations to GitHub...
git init
git config user.name "Akash Gautam"
git add .
git commit -m "fix: Add email-validator requirement for Pydantic EmailStr and root api/index.py Vercel serverless entrypoint"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
git push -u origin main --force
echo.
echo Done! Project pushed successfully to https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
pause
