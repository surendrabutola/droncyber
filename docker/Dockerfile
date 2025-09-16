# Stage 1: Install PHP dependencies and generate routes
FROM php:8.3-fpm-alpine AS php-build

# Install build dependencies
RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    imagemagick \
    imagemagick-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    autoconf \
    gcc \
    g++ \
    make \
    pkgconfig \
    postgresql-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql pdo_pgsql zip

# Install Imagick extension
RUN pecl install imagick \
    && docker-php-ext-enable imagick

# Install Composer
COPY --from=composer:2.8.8 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .
RUN composer install --no-dev --no-interaction --no-progress

# Generate Ziggy routes (this creates the file that your frontend build needs)
RUN php artisan ziggy:generate

# Stage 2: Build frontend (now that Ziggy routes exist)
FROM node:22.5.1-alpine3.19 AS client
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy application files including the generated Ziggy routes from php-build stage
COPY --from=php-build /app /app

# Build frontend
RUN npm run build

# Stage 3: Final minimal PHP runtime
FROM php:8.3-fpm-alpine

# Install only required runtime libraries
RUN apk add --no-cache \
    libpng \
    libjpeg-turbo \
    freetype \
    libpq \
    libzip \
    imagemagick

# Copy PHP extensions from build stage
COPY --from=php-build /usr/local/lib/php/extensions /usr/local/lib/php/extensions
COPY --from=php-build /usr/local/etc/php/conf.d /usr/local/etc/php/conf.d

# Copy application
WORKDIR /app
COPY --from=php-build /app /app

# Copy built frontend assets
COPY --from=client /app/public /app/public

# Copy php.ini
COPY php.ini /usr/local/etc/php/php.ini

EXPOSE 8001
ENTRYPOINT [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=8001" ]