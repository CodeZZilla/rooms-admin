#FROM node:14-alpine
#WORKDIR ./
#ENV PATH ./node_modules/.bin:$PATH
#COPY package.json ./
#COPY yarn.lock ./
#RUN yarn install
#COPY . ./
#CMD ["yarn", "start"]

FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]