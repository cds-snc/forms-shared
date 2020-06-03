FROM wordpress:latest

RUN set -eux; \
	apt-get update; \
	apt-get install -y --no-install-recommends mariadb-client; \
	rm -rf /var/lib/apt/lists/*

RUN rm -rf /usr/src/wordpress/wp-content/plugins/akismet &&\
    rm -rf /usr/src/wordpress/wp-content/plugins/hello.php &&\
    rm -rf /usr/src/wordpress/wp-content/themes/*

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

WORKDIR /var/www/html

RUN  tar cf - --one-file-system -C /usr/src/wordpress . | tar xf -
COPY wordpress .
RUN chown -R www-data:www-data /var/www/html

## 

CMD ["apache2-foreground"]