pipeline {
  agent any
  options {
    skipDefaultCheckout true
  }
  stages {
    stage("Git Checkout") {
      when { 
        not { 
          branch "master",
          branch "PR-*"
        }
      }
      steps {
        sh "rm -rf ./nodeapp1"
        sh "git clone --single-branch --branch ${BRANCH_NAME} https://github.com/MarcAnthonyFanfan/nodeapp1"
        sh "cd nodeapp1 && hub pull-request --no-edit"
      }
    }
  }
}