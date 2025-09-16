pipeline {
    agent any
    
    environment {
        AWS_ACCOUNT_ID = '689787741512'
        AWS_REGION = 'ap-south-1'
        ECR_REPO = 'prodioslabs/cert-uk'
        APP_IMAGE_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
    }

    stages {
        stage('git checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-access-token', url: 'https://github.com/prodioslabs/cert-uk.git'
            }
        }
        
        stage('Get Commit ID') {
            steps {
                script {
                    COMMIT_ID = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim().take(7)
                    TAG_NAME = "main-${COMMIT_ID}"
                    echo "Image Tag will be: ${TAG_NAME}"
                }
            }
        }
        stage('Create ECR Repo If Not Exists') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-cred']]) {
                    script {
                        def repoExists = sh (
                            script: """
                                aws ecr describe-repositories --repository-names ${ECR_REPO} --region ${AWS_REGION} > /dev/null 2>&1
                            """,
                            returnStatus: true
                        ) == 0
    
                        if (!repoExists) {
                            echo "Creating ECR repo: ${ECR_REPO}"
                            sh """
                                aws ecr create-repository --repository-name ${ECR_REPO} --region ${AWS_REGION}
                            """
                            // Optional: apply lifecycle policy
                            sh """
                                aws ecr put-lifecycle-policy \\
                                  --repository-name ${ECR_REPO} \\
                                  --lifecycle-policy-text file://ci/ecr/lifecycle-policy.json \\
                                  --region ${AWS_REGION}
                            """
                        } else {
                            echo "ECR repository already exists."
                        }
                    }
                }
            }
        }
        stage('Docker Build and Push to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-cred']]) {
                    script {
                        sh """
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

                            docker build -t ${APP_IMAGE_NAME}:latest -t ${APP_IMAGE_NAME}:${TAG_NAME} -f ./docker/Dockerfile .

                            docker push ${APP_IMAGE_NAME}:latest
                            docker push ${APP_IMAGE_NAME}:${TAG_NAME}
                        """
                    }
                }
            }
        }
        
        stage('Docker image prune') {
            steps {
                    script {
                        sh """
                            docker image prune -f
                        """
                    }
            }
        }
        
    }
}
