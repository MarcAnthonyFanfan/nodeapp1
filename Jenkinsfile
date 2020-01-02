pipeline {
  agent any
  options {
    skipDefaultCheckout true
  }
  stages {
    stage("Git Checkout") {
      steps {
        script {
          if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "PR-*") {
            echo "Should not execute"
          }
          else {
            rm -rf ./nodeapp1
            git clone --single-branch --branch ${BRANCH_NAME} "https://github.com/MarcAnthonyFanfan/nodeapp1"
            cd nodeapp1 && hub pull-request --no-edit
          }
        }
      }
    }
  }
}