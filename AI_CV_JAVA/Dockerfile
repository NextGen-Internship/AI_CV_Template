FROM openjdk:23-jdk-slim

# WORKDIR /app

# COPY . .

# COPY ./target/dependency/*.jar /app/
# COPY ./target/demo-0.0.1-SNAPSHOT.jar /app

COPY target/*.jar app.jar

CMD ["java", "-jar", "/app.jar"]
