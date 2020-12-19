pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps { 
                sh "sudo rsync -avzh ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
            }
        }
    }
}