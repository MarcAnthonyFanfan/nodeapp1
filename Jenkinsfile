pipeline {
  agent any
  stages {
    stage("Build") {
      when { 
        not { 
          branch "master"
        }
      }
      steps {
        sh "echo ${BRANCH_NAME}"
        sh "git status"
      }
    }
  }
}