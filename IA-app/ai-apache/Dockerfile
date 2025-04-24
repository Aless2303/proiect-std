FROM httpd:2.4

RUN echo "LoadModule proxy_module modules/mod_proxy.so" >> /usr/local/apache2/conf/httpd.conf \
    && echo "LoadModule proxy_http_module modules/mod_proxy_http.so" >> /usr/local/apache2/conf/httpd.conf \
    && echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf \
    && echo "Include conf/extra/ai-vhost.conf" >> /usr/local/apache2/conf/httpd.conf

COPY ai-vhost.conf /usr/local/apache2/conf/extra/
