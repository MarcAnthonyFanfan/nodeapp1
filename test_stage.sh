#!/bin/bash
echo 'Testing Node.js Application'
echo 'Platforms: [Linux, Windows]'
printf 'Browsers: [Chrome, Firefox]\n\n'
# Platform: Linux
./test/stage/linux_chrome_test.sh & PID_LINUX_CHROME=$!
./test/stage/linux_firefox_test.sh & PID_LINUX_FIREFOX=$!
# Platform: Windows
./test/stage/windows_chrome_test.sh & PID_WINDOWS_CHROME=$!
./test/stage/windows_firefox_test.sh & PID_WINDOWS_FIREFOX=$!
# Wait for test results
wait $PID_LINUX_CHROME
wait $PID_LINUX_FIREFOX
wait $PID_WINDOWS_CHROME
wait $PID_WINDOWS_FIREFOX