FROM tomcat:9-jre8-alpine
COPY server.xml /usr/local/tomcat/conf
RUN rm -rf /usr/local/tomcat/webapps/*
ARG JAR_FILE=build/libs/*.war
COPY ${JAR_FILE} /usr/local/tomcat/webapps/paas-ta-container-platform-webadmin.war

EXPOSE 8080
