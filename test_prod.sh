#!/bin/bash
echo 'Testing Node.js Application'
echo 'Platforms: [Linux, Windows]'
printf 'Browsers: [Chrome, Firefox]\n\n'
# Platform: Linux
./test/prod/linux_chrome_test.sh & PID_LINUX_CHROME=$!
./test/prod/linux_firefox_test.sh & PID_LINUX_FIREFOX=$!
# Platform: Windows
./test/prod/windows_chrome_test.sh & PID_WINDOWS_CHROME=$!
./test/prod/windows_firefox_test.sh & PID_WINDOWS_FIREFOX=$!
# Wait for test results
wait $PID_LINUX_CHROME
wait $PID_LINUX_FIREFOX
wait $PID_WINDOWS_CHROME
wait $PID_WINDOWS_FIREFOX