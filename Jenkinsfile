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
            sh "rm -rf ./nodeapp1"
            sh "git clone --single-branch --branch ${BRANCH_NAME} https://github.com/MarcAnthonyFanfan/nodeapp1"
            sh "cd nodeapp1 && git diff origin/master jenkins_pipeline_branch_test_2 > diff_output.txt"
            sh "cd nodeapp1 && hub pull-request --no-edit --base=master --head=${BRANCH_NAME}"
          }
        }
      }
    }
  }
}