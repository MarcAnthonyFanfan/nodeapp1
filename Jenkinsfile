node {
  parameters {
    string(name: "BRANCH_NAME", defaultValue: "", description: "Branch Name")
  }
  stage("Git Checkout") {
    when {
      not {
        anyOf {
            branch "master";
            branch ""
        }
      }
    }
    steps {
      sh 'echo ${params.BRANCH_NAME}'
    }
  }
}
