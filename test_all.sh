#!/bin/bash
echo 'Testing Node.js Application'
echo 'Platforms: [Linux, Windows]'
echo 'Browsers: [Chrome, Firefox]'
# Platform: Linux
GRID_BROWSER='chrome' GRID_PLATFORM='linux' python3 test/grid_test.py > test/windows_chrome_output.txt 2>&1
GRID_BROWSER='firefox' GRID_PLATFORM='linux' python3 test/grid_test.py > test/windows_firefox_output.txt 2>&1
# Platform: Windows
GRID_BROWSER='chrome' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_chrome_output.txt 2>&1
GRID_BROWSER='firefox' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_firefox_output.txt 2>&1