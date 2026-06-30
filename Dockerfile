# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP application
FROM php:8.3-cli-alpine
WORKDIR /app

RUN apk add --no-cache sqlite sqlite-dev libzip-dev zip unzip oniguruma-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_sqlite zip mbstring xml

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN composer install --no-dev --optimize-autoloader \
    && mkdir -p database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database

EXPOSE 10000
CMD php artisan config:clear && php artisan migrate --seed --force && php artisan serve --host 0.0.0.0 --port 10000