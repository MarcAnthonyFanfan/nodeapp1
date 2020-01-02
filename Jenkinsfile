pipeline {
  agent any
  stages {
    stage("Git Checkout") {
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
        sh "hub pull-request --no-edit --base=master --head=${BRANCH_NAME}"
      }
    }
  }
}