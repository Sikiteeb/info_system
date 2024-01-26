# Contact Information System

This project is a simple contact management system with a RESTful backend service built with Spring Boot and a minimalistic frontend.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Java JDK 11 or higher is installed
- PostgreSQL is installed and running
- Gradle

## Configuration

Before running the application, set up the required environment variables. Create a `.env` file in the root of the project directory with the following content:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/info_system
DATABASE_USERNAME=yourUsername
DATABASE_PASSWORD=yourPassword
```
## Clone the repository
```
git clone git@github.com:Sikiteeb/info_system.git

cd info_system
```

## Set up the .env variables

```
source .env
```

## Build the project using Gradle

### On Mac
```
./gradlew build
```

### On Windows
```
gradlew.bat build
```

## Run the application
```
java -jar build/libs/info-system-1.0-SNAPSHOT.jar

```

## Frontend 

The frontend static files are served by the Spring Boot application and are available at http://localhost:8080.

