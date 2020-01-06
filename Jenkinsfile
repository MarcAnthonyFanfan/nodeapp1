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
    stage("Selenium Grid Testing") {
      steps {
        sh "echo 'Deploy to staging server'"
        sh "echo 'Run Selenium Grid testing'"
      }
    }
    stage("Create Pull Request & Jira Issue (if [pr] is in commit message)") {
      when {
        not {
          anyOf {
            branch "master";
            branch pattern: "PR-\\d+", comparator: "REGEXP";
            //changelog "^((?!\\[pr\\]).)*\$"
          }
        }
      }
      steps {
        sh "chmod +x ./pull_request.sh && ./pull_request.sh"
      }
    }
  }
}