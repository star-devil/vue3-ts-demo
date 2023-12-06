FROM nginx
COPY default.conf.template /etc/nginx/templates/
COPY dist /usr/share/nginx/html