FROM node:16
COPY api/ /usr/DefiBoard/api/
COPY web/ /usr/DefiBoard/web/
WORKDIR /usr/DefiBoard/api/
RUN npm install
EXPOSE 3190
CMD ["npm", "start"]
