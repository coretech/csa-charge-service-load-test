def runnerContext = [
    scenarioFile: "",
    baseUrl: "https://psp-charge-service.awsqa.idt.net",
]

pipeline {
    agent { label 'qa_linux_auto_performance' }

    tools{
        nodejs 'node16.14'
    }

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
                    withCredentials([string(credentialsId: 'INFLUX_DB_USR', variable: 'INFLUX_DB_USER'),
                                     string(credentialsId: 'INFLUX_DB_PWD', variable: 'INFLUX_DB_PASS')]) {
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
