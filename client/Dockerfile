FROM node:8.16.1-alpine as builder
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
COPY --from=builder /app/build .
CMD ["node", "start"]
