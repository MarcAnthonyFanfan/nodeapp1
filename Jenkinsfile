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
        sh "git clone https://github.com/MarcAnthonyFanfan/nodeapp1 $(pwd)"
        sh "git checkout ${BRANCH_NAME}"
        sh "hub pull-request --no-edit --base=master --head=${BRANCH_NAME}"
        cleanWs()
      }
    }
  }
}