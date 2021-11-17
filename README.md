# Book Management API

_This is a Book Management API which is purely created using JavaScript and JSON. I have also used MongoDB and Mongoose for managing database. You can add book data, updates existing book data as well delete the book data using this API._

***

## Technologies Used ##
<img alt="JavScript" width="140px" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
<img alt="Nodejs" width="110px" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img alt="Expressjs" width="140px" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img alt="NPM" width="80px" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
<img alt="MongoDB" width="120px" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img alt="VS Code" width="200px" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>

***

## Steps to RUN the project ##
1. Download NPM Modules
    > npm init <br>
    > npm i express <br>
    > npm i nodemon (optional) <br>
    > npm i mongoose <br>
    > npm i dotenv (MongoDB connection) <br>

2. Create `.env` file
    > Assign your MongoDB connection URL in `MONGO_URL` variable

3. Run Node Server
    > node index.js (if nodemon isn't installed) <br>
    > npx nodemon index.js (if nodemon is installed)

***