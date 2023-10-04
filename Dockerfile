FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/*.war
COPY ${JAR_FILE} container-platform-webuser.war
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=dev","/container-platform-webuser.war"]
