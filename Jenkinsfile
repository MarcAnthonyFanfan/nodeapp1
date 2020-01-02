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
        sh "git clone https://github.com/MarcAnthonyFanfan/nodeapp1"
        sh "mv ./nodeapp1/* ./"
        sh "mv ./nodeapp1/.git ./.git"
        sh "mv ./nodeapp1/.gitignore ./.gitignore"
        sh "rmdir ./nodeapp1/"
        sh "cd nodeapp1 && git checkout ${BRANCH_NAME}"
        sh "cd nodeapp1 && hub pull-request --no-edit --base=master --head=${BRANCH_NAME}"
        cleanWs()
      }
    }
  }
}