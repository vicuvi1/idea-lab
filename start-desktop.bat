@echo off
REM Double-click to start Idea Lab as a desktop window (needs Rust installed: https://rustup.rs).
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies, first time only...
  call npm install
)
call npm run desktop
