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
        sh "git checkout -f ${BRANCH_NAME}"
        sh "echo git status"
        sh "hub pull-request --no-edit"
      }
    }
  }
}