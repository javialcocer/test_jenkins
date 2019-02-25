#!groovy
// Jenkinsfile

def DOCKER_HUB_USER="etejeda"
def CONTAINER_NAME="dockerxc"
def CONTAINER_TAG="beta"
def HTTP_PORT="8081"
def NAMEJOB="XCARET.COM"
def WORKDIRLOCAL="/var/lib/docker/volumes/jenkins-data/_data/workspace/${NAMEJOB}"
// Test 3
pipeline {

        agent { node { label 'master' } }

        environment {
            CI = 'false'
        }
        stages {
            stage('Git Checkout'){
                steps {
                    print 'Checkout to Repository..'
                }
            }
            stage('Prepare Images') {
                steps {
                    echo 'Run Docker Apache...'
                }
            }
            stage('Build') {
                steps {
                    echo 'Start Install Dependencies...'
                }
            }
            stage('Test') {
                steps {
                    echo 'Start Testing (Mocha)...'

                }
            }
            stage('Deploy') {
                steps {
                    sh 'echo DEPLOY'
                }
            }


        }

}