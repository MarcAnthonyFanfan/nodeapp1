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
    stage("Selenium Grid Testing on Staging Server") {
      steps {
        // Testing PR merge
        sh "echo 'Deploying ${BRANCH_NAME} to STAGE environment...'"
        sh "ssh mfanx2@192.168.1.177 'cd ~/nodeapp1/; pkill node; git fetch; git checkout ${BRANCH_NAME}; git reset --hard; git pull --force; node app.js > /home/mfanx2/node.log 2>&1 &'"
        sh "echo 'Testing STAGE environment with Selenium Grid'"
        sh "ssh mfanx2@192.168.1.177 'cd ~/nodeapp1/; chmod +x ./test_stage.sh && ./test_stage.sh'"
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