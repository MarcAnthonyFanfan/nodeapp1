pipeline {
  agent any
  stages {
    stage("Git Checkout Branch (Head attached)") {
      when {
        not {
          anyOf {
            branch "master";
            branch pattern: "PR-\\d+", comparator: "REGEXP"
          }
        }
      }
      options {
        skipDefaultCheckout true
      }
      steps {
        sh "rm -rf .git/; rm .gitignore; rm -rf tmp/; git clone --no-checkout https://github.com/MarcAnthonyFanfan/nodeapp1 tmp && mv tmp/.git . && rmdir tmp && git checkout -f ${BRANCH_NAME}"
      }
    }
    // to-do: add testing
    stage("Create Pull Request & Jira Issue") {
      when {
        not {
          anyOf {
            branch "master";
            branch pattern: "PR-\\d+", comparator: "REGEXP"
          }
        }
      }
      steps {
        sh "if [[ $(git log -1 --pretty=%B) == *'/pr'* ]]; then hub pull-request --no-edit --base=master --head=${BRANCH_NAME} > pull_request_url.txt; fi"
        sh "if [[ $(git log -1 --pretty=%B) == *'/pr'* ]]; then chmod +x ./create_issue.sh && ./create_issue.sh; fi"
      }
    }
  }
}