pipeline {
  agent any
  options {
    skipDefaultCheckout true
  }
  stages {
    stage("Git Checkout") {
      when { 
        not { 
          branch "master"
        }
      }
      steps {
        sh "git clone --single-branch --branch ${BRANCH_NAME} https://github.com/github/hub.git"
        sh "hub pull-request --no-edit"
      }
    }
  }
}