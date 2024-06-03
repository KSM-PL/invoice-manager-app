# Etap budowania: użyj obrazu Maven z OpenJDK 11 do zbudowania aplikacji
FROM maven:3.8.4-openjdk-17 AS build

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik pom.xml oraz katalog src do kontenera
COPY pom.xml .
COPY .env .

COPY src src

# Zbuduj aplikację za pomocą Mavena, pomijając testy
RUN mvn clean package -DskipTests

# Etap uruchomieniowy: użyj mniejszego obrazu Javy do uruchomienia aplikacji
FROM openjdk:17.0.1-jdk-slim

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj skompilowany artefakt (jar) z etapu budowania
COPY --from=build /app/target/*.jar app.jar

# Uruchom aplikację Java
CMD ["java", "-jar", "app.jar"]
