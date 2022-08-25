FROM httpd:latest
LABEL traefik.enable=true
LABEL traefik.http.routers.bibites.rule=Host(`bibites.kkhost.pl`)
LABEL traefik.http.routers.bibites.entrypoints=web
LABEL traefik.http.routers.bibites.tls.certresolver=myresolver
COPY ./dist /usr/local/apache2/htdocs
EXPOSE 80
CMD ["httpd-foreground"]
