

FROM node:lts-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/spa /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
  