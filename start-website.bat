@echo off
REM Double-click to start Idea Lab in your browser.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies, first time only...
  call npm install
)
call npm run dev
