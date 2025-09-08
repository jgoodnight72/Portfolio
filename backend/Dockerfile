# Dockerfile for Spring Boot Backend
FROM eclipse-temurin:17-jdk
VOLUME /tmp
WORKDIR /app
COPY target/*.jar app.jar
COPY data /app/data
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 8080
