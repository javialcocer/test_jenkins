#!groovy
// Jenkinsfile

def DOCKER_HUB_USER="fjalcr"
def CONTAINER_NAME="dockerTest"
def CONTAINER_TAG="test1"
def HTTP_PORT="8081"
def NAMEJOB="TEST"
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
                    runApp(CONTAINER_NAME, CONTAINER_TAG, DOCKER_HUB_USER, HTTP_PORT, WORKDIRLOCAL)
                    echo 'Run Selenium Hub in the network grid...'
                    sh 'docker run --rm -d -p 4444:4444 --net grid --name selenium-hub-testing-1 selenium/hub'
                    echo 'Run a node of firefox... (Selenium Grid)'
                    sh 'docker run --rm -d --net grid --name node-firefox-1 -e HUB_HOST=selenium-hub-testing-1 -e START_XVFB=false -v /dev/shm:/dev/shm selenium/node-firefox'
                }
            }
            stage('Build') {
                steps {
                    echo 'Start Install Dependencies...'
                    sh "docker run --rm --name npm-pipeline -v ${WORKDIRLOCAL}:/usr/src/app -w /usr/src/app node:8-alpine npm install"

                }
            }
            stage('Test') {
                steps {
                    echo 'Start Testing (Mocha)...'
                    sh "docker run --rm --name npm-pipeline -v ${WORKDIRLOCAL}:/usr/src/app -w /usr/src/app node:8-alpine npm test"

                }
            }
            stage('Deploy') {
                steps {
                    sh 'echo DEPLOY'
                }
            }


        }
        post {
            always {
                echo '===== ALWAYS ====='
                imagePrune(CONTAINER_NAME)
            }
        //    cleanup {
        //           echo 'One way or another, I have finished'
                   //deleteDir() /* clean up our workspace */
        //       }
        }

}

def imagePrune(containerName){
    try {
        print 'Stop all services..'
        sh "docker stop $containerName"
        sh "docker stop node-firefox-1"
        sh "docker stop selenium-hub-testing-1"

    } catch(error){}
}

def runApp(containerName, tag, dockerHubUser, httpPort, WORKSPACE){
    sh "docker pull $dockerHubUser/$containerName:$tag"
    sh "docker run -d --rm -p $httpPort:80 --name $containerName -v $WORKSPACE:/var/www/localhost/htdocs/ $dockerHubUser/$containerName:$tag"
    echo "Application started on port: $httpPort (http)"
}