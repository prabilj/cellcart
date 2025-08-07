pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = 1
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/prabilj/cellcart.git'
      }
    }

    stage('Build & Deploy Docker') {
      steps {
        dir('cellcart') {
          script {
            try {
              sh 'docker-compose down'
              sh 'docker-compose up -d --build'
            } catch (Exception e) {
              error "Docker build failed: ${e.getMessage()}"
            }
          }
        }
      }
    }
  }
}
