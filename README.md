## Requirements

- npm
- Node.js
- Docker 

## Installation

Clone the repository :


    git clone https://github.com/flmts/nodejs-tp.git


2. Install the dependencies using the following command:

    ```bash
    npm install
    ```
3. If using Docker, start a MySQL container with:

   ```bash 
    docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5
   ```

4. Configure mailer with https://ethereal.email.
   Create your account and copy the id in the .env file.

5. Create a file .env in the root project and add in it:

   ```env
   # Database configuration
   DB_HOST='0.0.0.0'
   DB_USER='root' 
   DB_PASSWORD='hapi'
   DB_DATABASE='user'
   
   # Mail ID
   MAIL_HOST='smtp.ethereal.email' 
   MAIL_PORT=587 
   MAIL_USER='username' 
   MAIL_PASS='password'
   ```

6. Start the server :

    ```bash
    npm start
    ```

7. access API at http://localhost:3000/documentation.
