FROM nginx:alpine
COPY /dist/hb-exam-angular/browser/* /usr/share/nginx/html/
EXPOSE 80