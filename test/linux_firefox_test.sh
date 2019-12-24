#!/bin/bash
GRID_BROWSER='firefox' GRID_PLATFORM='linux' python3 test/grid_test.py > test/linux_firefox_output.txt 2>&1
printf '  [Linux/Firefox] '; grep 'tests passed' test/linux_firefox_output.txt