FROM php:8.2-apache

#instalez dependente necesare
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

#activez mod_Rewrite ptr apache
RUN a2enmod rewrite

#copiez fisierele ptr statamic
WORKDIR /var/www/html
COPY . .

#copiez conf apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

COPY volum /var/www/html

#setez permisiunile
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

#creez directorul ptr log uri si setez permisiuni
RUN mkdir -p /var/log/apache2 \
    && chown -R www-data:www-data /var/log/apache2 \
    && chmod -R 755 /var/log/apache2

#expune portul 80.
EXPOSE 80

CMD ["apache2-foreground"]