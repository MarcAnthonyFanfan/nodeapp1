#!/bin/bash
GRID_BROWSER='chrome' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_chrome_output.txt 2>&1
printf ' [Windows/Chrome] '; grep 'tests passed' test/windows_chrome_output.txt