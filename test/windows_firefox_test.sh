#!/bin/bash
GRID_BROWSER='firefox' GRID_PLATFORM='windows' python3 test/grid_test.py > test/windows_firefox_output.txt 2>&1
printf '[Windows/Firefox] '; grep 'tests passed' test/windows_firefox_output.txt