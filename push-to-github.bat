@echo off
echo Initializing Git repository and pushing NagarFlow AI to GitHub...
git init
git config user.name "Akash Gautam"
git add .
git commit -m "fix: Remove invalid services key from vercel.json for 100% clean Vercel schema validation"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
git push -u origin main --force
echo.
echo Done! Project pushed successfully to https://github.com/akashgautam5245-cmd/Smart-City-Traffic-Intelligence-Platform.git
pause
