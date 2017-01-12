FROM risingstack/alpine:3.4-v7.4.0-4.2.0

COPY package.json package.json  
RUN npm install
RUN bower install

# Add your source files
COPY . .  
CMD ["nf","start"]