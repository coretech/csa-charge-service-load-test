def runnerContext = [
    scenarioFile: "",
    baseUrl: "",
]

pipeline {
    agent { label 'qa_linux_awscli' }

    options {
        timestamps()
        ansiColor('xterm')
        timeout(time: 90, unit: 'MINUTES')
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    deleteDir()
                    checkout scm
                }
            }
        }

        stage('Bundle scripts') {
            steps {
                script {
                    sh "npm install"
                    sh "npm run clean"
                    sh "npm run bundle"
                }
            }
        }

        stage('Run performance test script') {
            steps {
                withEnv([
                    "PATH+DOCKER=${tool 'Docker-18.09.6'}/bin", "PATH+DOCKER-COMPOSE=${tool 'docker-compose1.22.0'}"
                ]) {
                    withCredentials([usernamePassword(credentialsId: 'INFLUX_DB_ACCOUNT', usernameVariable: 'INFLUX_DB_USER', passwordVariable: 'INFLUX_DB_PASS')]) {
                        script {
                            if(tryGetProperty("BASE_URL")) {
                                runnerContext.baseUrl = tryGetProperty("BASE_URL")
                            }
                            if(tryGetProperty("SCRIPT_NAME")) {
                                runnerContext.scenarioFile = tryGetProperty("SCRIPT_NAME")
                            }
                            sh "npm run execute:tests --base_url=${runnerContext.baseUrl}  --influxdb_user=$INFLUX_DB_USER --influxdb_pass=$INFLUX_DB_PASS --script_name=${runnerContext.scenarioFile}"
                            sh "npm run delete:containers"
                        }
                    }
                }
            }
        }
    }
}

def tryGetProperty(varName){
    try {
        def propValue = getProperty(varName)
        return propValue;
    }
    catch (MissingPropertyException e) {
        log.info "property ${varName} does not defined"
        return null
    }
}
