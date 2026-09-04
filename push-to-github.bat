@echo off
echo Initializing Git repository and pushing NagarFlow AI backend optimizations to GitHub...
git init
git config user.name "Akash Gautam"
git add .
git commit -m "fix: Vercel serverless root api/index.py function and Render frontend environment integration"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
git push -u origin main --force
echo.
echo Done! Project pushed successfully to https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
pause
