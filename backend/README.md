# Backend (Spring Boot)

## Development
1. Build the project:
   ```sh
   ./mvnw clean package
   ```
2. Run locally:
   ```sh
   ./mvnw spring-boot:run
   ```

## Docker
Build and run with Docker:
```sh
docker build -t portfolio-backend .
docker run -p 8080:8080 portfolio-backend
```
