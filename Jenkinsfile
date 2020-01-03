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
        SHOULD_MAKE_PULL_REQUEST = sh (script: "git log -1 --pretty=%B | grep /pr", returnStdout: true)
        sh "if [[ ${SHOULD_MAKE_PULL_REQUEST} ]]; then hub pull-request --no-edit --base=master --head=${BRANCH_NAME} > pull_request_url.txt; fi"
        sh "if [[ ${SHOULD_MAKE_PULL_REQUEST} ]]; then chmod +x ./create_issue.sh && ./create_issue.sh; fi"
      }
    }
  }
}