FROM tomcat:9-jre8-alpine
WORKDIR /usr/local/tomcat
COPY server.xml ./conf
RUN rm -rf ./webapps/*
ARG JAR_FILE=build/libs/*.war
COPY ${JAR_FILE} ./webapps/paas-ta-container-platform-webadmin.war

EXPOSE 8080
