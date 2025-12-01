@echo off
echo ========================================
echo InstaAI Studio - Quick Clip Downloader
echo ========================================
echo.
echo Opening 4 Pexels tabs with perfect searches...
echo.
echo Download HD versions and save as:
echo   clip1.mp4 - Content creator filming
echo   clip2.mp4 - Entrepreneur working
echo   clip3.mp4 - Phone social media
echo   clip4.mp4 - Creative workspace
echo.
echo Save to: %~dp0public\videos\clips\
echo.
pause

echo Opening tabs...
start https://www.pexels.com/search/videos/woman%%20filming%%20instagram/
timeout /t 2 /nobreak >nul

start https://www.pexels.com/search/videos/entrepreneur%%20laptop/
timeout /t 2 /nobreak >nul

start https://www.pexels.com/search/videos/phone%%20social%%20media/
timeout /t 2 /nobreak >nul

start https://www.pexels.com/search/videos/creative%%20office/
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo All tabs opened!
echo ========================================
echo.
echo Download HD version from each tab
echo Rename to: clip1.mp4, clip2.mp4, clip3.mp4, clip4.mp4
echo Save to: %~dp0public\videos\clips\
echo.
echo Then run: create-montage.bat
echo.
pause
