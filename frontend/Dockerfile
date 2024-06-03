# Użyj oficjalnego runtime node jako obrazu bazowego
FROM node:20.12.0-alpine3.19

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj package.json oraz package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę kodu aplikacji
COPY . .

# Otwórz port, na którym działa aplikacja
EXPOSE 5173

# Uruchom aplikację
CMD ["npm", "run", "dev","--","--host"]
