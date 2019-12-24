#!/bin/bash
GRID_BROWSER='chrome' GRID_PLATFORM='linux' python3 test/grid_test.py > test/linux_chrome_output.txt 2>&1
printf '   [Linux/Chrome] '; grep 'tests passed' test/linux_chrome_output.txt