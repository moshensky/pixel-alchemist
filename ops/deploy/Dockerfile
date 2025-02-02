# Install dependencies only when needed
FROM node:22.12.0 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


# Rebuild the source code only when needed
FROM node:22.12.0 AS builder
ARG new_version
ENV APP_VERSION=$new_version
ENV HOME=/root
WORKDIR $HOME
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM nginx:1.13-alpine AS runner
COPY ./ops/deploy/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /root/dist /usr/share/nginx/html/
