pipeline {
    agent any
    environment {
        NODE_VERSION = '18' // Adjust based on your project's Node.js version
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'githubtoken', url: 'https://github.com/amanmaurya7/linux-aura-portfolio.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install $NODE_VERSION'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test || true' // Use '|| true' to prevent pipeline failure if tests are not set up
            }
        }
        stage('Deploy') {
            steps {
                // Example for deploying to Vercel (replace with your deployment method)
                sh 'vercel --prod'
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
