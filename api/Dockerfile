FROM amazon/aws-lambda-nodejs:18.2023.12.14.14

COPY . .
RUN npm install
RUN npm run build

CMD ["dist/main.handler"]