pipeline {
  agent any
  options {
    skipDefaultCheckout true
  }
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
      steps {
        sh "rm -rf ./nodeapp1"
        sh "git clone https://github.com/MarcAnthonyFanfan/nodeapp1"
        sh "cd nodeapp1 && git checkout ${BRANCH_NAME}"
        sh "cd nodeapp1 && git diff origin/master jenkins_pipeline_branch_test_2 > diff_output.txt"
        sh "cd nodeapp1 && hub pull-request --no-edit --base=master --head=${BRANCH_NAME}"
      }
    }
  }
}