#!/bin/bash

curl -d "{\"fields\": {\"project\":{\"key\":\"WEB\"},\"summary\":\"%ISSUE_PREFIX%_%dtStamp%\",\"description\":\"%ISSUE_DESCRIPTION%\",\"issuetype\":{\"name\":\"Bug\"}}}" -H "Content-Type: application/json" --user jenkins:0WxvQ3E4T5 -X POST  http://u1910-jira:8080/rest/api/2/issue
