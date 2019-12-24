SET USER=jenkins
SET TOKEN=0WxvQ3E4T5
SET ISSUE_PREFIX=pull_request
SET ISSUE_TYPE=Bug
SET /p PULL_REQUEST_URL=< pull_request_url.txt
SET ISSUE_DESCRIPTION=Must be approved and merged into master by an admin. Pull Request URL: %PULL_REQUEST_URL%

SET HOUR=%time:~0,2%
SET dtStamp9=%date:~-4%%date:~4,2%%date:~7,2%_0%time:~1,1%%time:~3,2%%time:~6,2% 
SET dtStamp24=%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
if "%HOUR:~0,1%" == " " (SET dtStamp=%dtStamp9%) else (SET dtStamp=%dtStamp24%)

"curl.exe" -g -d "{"""fields""": {"""project""":{"""key""":"""WEB"""},"""summary""":"""%ISSUE_PREFIX%_%dtStamp%""","""description""":"""%ISSUE_DESCRIPTION%""","""issuetype""":{"""name""":"""%ISSUE_TYPE%"""}}}" -H "Content-Type: application/json" --user %USER%:%TOKEN% -X POST  http://u1910-jira:8080/rest/api/2/issue