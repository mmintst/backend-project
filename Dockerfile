FROM node:latest

WORKDIR /app

COPY ..

ENV DATABASE_URL="postgresql://postgres:academy@localhost:5432/learnhub?schema=public"
ENV AUTH_SECRE="authsecret"
ENV PORT=8000

RUN npm i
# RUN npm run build
RUN npx tsc

CMD ["node", 'dist/index.js']