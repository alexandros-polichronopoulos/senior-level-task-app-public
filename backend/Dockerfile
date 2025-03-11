# 1. Use an official OpenJDK runtime as a base image
FROM maven:3.9.6-eclipse-temurin-17 AS build

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy Maven/Gradle build files and dependencies (to speed up builds)
COPY pom.xml ./
COPY src ./src

# 4. Build the application
RUN mvn clean package -DskipTests

# 5. Use a minimal JDK runtime for the final image
FROM eclipse-temurin:17-jre

# 6. Set working directory
WORKDIR /app

# 7. Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# 8. Expose port 8080 (or change it based on your application properties)
EXPOSE 8080

# 9. Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]