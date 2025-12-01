@echo off
echo ========================================
echo InstaAI Studio - Video Montage Creator
echo ========================================
echo.

cd /d "%~dp0"

REM Check if clips exist
if not exist "public\videos\clips\clip1.mp4" (
    echo ERROR: clip1.mp4 not found!
    echo.
    echo Please download clips first. See: create-video-montage.md
    echo.
    pause
    exit /b 1
)

echo Creating professional video montage...
echo.
echo Step 1: Normalizing clips to 720p...

REM Normalize all clips to same resolution and framerate
ffmpeg -i public\videos\clips\clip1.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1" -r 30 -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -y public\videos\clips\normalized1.mp4 2>nul

if exist "public\videos\clips\clip2.mp4" (
    ffmpeg -i public\videos\clips\clip2.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1" -r 30 -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -y public\videos\clips\normalized2.mp4 2>nul
)

if exist "public\videos\clips\clip3.mp4" (
    ffmpeg -i public\videos\clips\clip3.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1" -r 30 -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -y public\videos\clips\normalized3.mp4 2>nul
)

if exist "public\videos\clips\clip4.mp4" (
    ffmpeg -i public\videos\clips\clip4.mp4 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1" -r 30 -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -y public\videos\clips\normalized4.mp4 2>nul
)

echo Step 2: Creating smooth crossfade transitions...
echo.

REM Create file list for concatenation
echo file 'normalized1.mp4' > public\videos\clips\filelist.txt
if exist "public\videos\clips\normalized2.mp4" echo file 'normalized2.mp4' >> public\videos\clips\filelist.txt
if exist "public\videos\clips\normalized3.mp4" echo file 'normalized3.mp4' >> public\videos\clips\filelist.txt
if exist "public\videos\clips\normalized4.mp4" echo file 'normalized4.mp4' >> public\videos\clips\filelist.txt

REM Concatenate with crossfade
cd public\videos\clips
ffmpeg -f concat -safe 0 -i filelist.txt -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=10:d=0.5" -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k -movflags +faststart -y temp_output.mp4 2>nul
cd ..\..\..

echo Step 3: Optimizing for web (compressing to ~3-5MB)...
echo.

REM Final compression and optimization
ffmpeg -i public\videos\clips\temp_output.mp4 -vf "scale=1280:720" -c:v libx264 -preset slow -crf 28 -maxrate 500k -bufsize 1M -c:a aac -b:a 96k -movflags +faststart -y public\videos\background.mp4

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Video montage created!
    echo ========================================
    echo.
    echo Output: public\videos\background.mp4
    echo.

    REM Show file size
    for %%A in (public\videos\background.mp4) do echo File size: %%~zA bytes
    echo.

    REM Cleanup
    del /q public\videos\clips\normalized*.mp4 2>nul
    del /q public\videos\clips\filelist.txt 2>nul
    del /q public\videos\clips\temp_output.mp4 2>nul

    echo Cleaned up temporary files
    echo.
    echo Ready to use! Refresh your browser at:
    echo http://localhost:8081
    echo.
) else (
    echo.
    echo ERROR: Failed to create montage
    echo Check that FFmpeg is installed correctly
    echo.
)

pause
