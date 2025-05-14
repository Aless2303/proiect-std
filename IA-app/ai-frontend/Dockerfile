FROM node:18-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM httpd:2.4
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Configure Apache with necessary modules and settings
RUN sed -i \
    -e 's/^#\(LoadModule proxy_module modules\/mod_proxy.so\)/\1/' \
    -e 's/^#\(LoadModule proxy_http_module modules\/mod_proxy_http.so\)/\1/' \
    /usr/local/apache2/conf/httpd.conf


RUN mkdir -p /usr/local/apache2/logs && \
    chown -R www-data:www-data /usr/local/apache2/logs && \
    chmod -R 755 /usr/local/apache2/logs


RUN sed -i \
    -e 's|ErrorLog.*|ErrorLog /proc/self/fd/2|g' \
    -e 's|CustomLog.*|CustomLog /proc/self/fd/1 common|g' \
    /usr/local/apache2/conf/httpd.conf


RUN echo 'ProxyPass /api http://ai-backend:3000\n\
ProxyPassReverse /api http://ai-backend:3000' >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80