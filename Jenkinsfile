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
    // to-do: complete testing stage
    stage("Selenium Grid Testing on Staging Server") {
      steps {
        sh "ssh mfanx2@192.168.1.177 'cd ~/nodeapp1/; pkill node; git fetch; git checkout ${BRANCH_NAME}; git pull; node app.js > /home/mfanx2/node.log 2>&1 &'"
        sh "ssh mfanx2@192.168.1.177 'cd ~/nodeapp1/; NODEAPP1_STAGE=1 chmod +x ./test_all.sh && ./test_all.sh'"
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