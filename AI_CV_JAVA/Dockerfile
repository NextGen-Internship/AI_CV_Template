# FROM openjdk:23-jdk-slim
#
# COPY target/*.jar app.jar
#
# CMD ["java", "-jar", "/app.jar"]
FROM maven:3-eclipse-temurin-21 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package

FROM openjdk:17

WORKDIR /app

COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]