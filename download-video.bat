@echo off
echo =============================================
echo InstaAI Studio - Professional Video Downloader
echo =============================================
echo.
echo Opening Pexels in your browser...
echo.
echo Search for: "entrepreneur working"
echo Then download HD version and save to:
echo   %~dp0public\videos\background.mp4
echo.
echo Press any key to open Pexels...
pause >nul
start https://www.pexels.com/search/videos/entrepreneur%%20working/
echo.
echo Browser opened! Follow these steps:
echo 1. Click on any professional-looking video
echo 2. Click the "Free Download" button
echo 3. Select "HD" quality
echo 4. Save as: background.mp4
echo 5. Move to: %~dp0public\videos\
echo.
pause
