#!/bin/bash
echo 'Testing Node.js Application'
echo 'Platforms: [Linux, Windows]'
printf 'Browsers: [Chrome, Firefox]\n\n'
# Platform: Linux
GRID_BROWSER='chrome' GRID_PLATFORM='linux' python3 test/grid_test.py > test/linux_chrome_output.txt 2>&1 && printf '   [Linux/Chrome] '; grep 'tests passed' test/linux_chrome_output.txt
GRID_BROWSER='firefox' GRID_PLATFORM='linux' python3 test/grid_test.py > test/linux_firefox_output.txt 2>&1 && printf '  [Linux/Firefox] '; grep 'tests passed' test/linux_firefox_output.txt
# Platform: Windows
GRID_BROWSER='chrome' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_chrome_output.txt 2>&1 && printf ' [Windows/Chrome] '; grep 'tests passed' test/windows_chrome_output.txt
GRID_BROWSER='firefox' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_firefox_output.txt 2>&1 && printf '[Windows/Firefox] '; grep 'tests passed' test/windows_firefox_output.txt