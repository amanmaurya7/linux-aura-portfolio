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
        stage('Install Node and Dependencies') {
            steps {
                // Install correct Node version if using nvm or nodeenv (optional)
                sh 'node -v' // just to check the current version (optional)

                // Install dependencies
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    sh 'vercel --prod --token $VERCEL_TOKEN --yes'
                }
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
