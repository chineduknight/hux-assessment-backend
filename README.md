# Contact Keeper Backend

This is the backend service for the Contact Keeper application, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. The backend provides a REST API for managing user accounts, authentication, and contacts.

## Features

- **User Authentication**: Signup, login, and logout using JWT tokens.
- **Contact Management**: Create, read, update, and delete contacts.
- **Validation**: Input validation using express-validator.
- **Security**: Helmet for secure HTTP headers, HPP for parameter pollution prevention, express-rate-limit for rate limiting, and CORS configuration.
- **Unit Tests**: Written using Jest and Supertest.
- **API Documentation**: Available through Postman collection.

## Technologies Used

- **Node.js** & **Express**: Backend framework for building APIs.
- **TypeScript**: Superset of JavaScript for type safety and developer productivity.
- **MongoDB**: NoSQL database for storing user and contact data.
- **JWT**: JSON Web Tokens for secure authentication.

## Prerequisites

- **Node.js**: v14 or later
- **Yarn**: Preferred package manager
- **MongoDB**: Locally or through MongoDB Atlas

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/chineduknight/hux-assessment-backend
   cd contact-keeper-backend
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Environment Variables**

   - Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   MONGO_URI_TEST=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the Application**
   - **Development Mode**:
     ```bash
     yarn dev
     ```
   - **Production Mode** (build and run):
     ```bash
     yarn build
     NODE_ENV=production node dist/index.js
     ```

## Running Tests

- **Unit Tests**: Run the test suite using Jest.
  ```bash
  yarn test
  ```

## API Endpoints

### **Base URL**

- Local: `http://localhost:5000`
- Production (Heroku): `<your-heroku-app-url>`

### **Authentication**

- **POST** `/api/v1/users/signup` - Register a new user.
- **POST** `/api/v1/users/login` - Login an existing user.
- **POST** `/api/v1/users/logout` - Logout the user.

### **Contacts**

- **GET** `/api/v1/contacts` - Get all contacts for the logged-in user.
- **POST** `/api/v1/contacts` - Create a new contact.
- **GET** `/api/v1/contacts/:id` - Get a contact by ID.
- **PUT** `/api/v1/contacts/:id` - Update a contact by ID.
- **DELETE** `/api/v1/contacts/:id` - Delete a contact by ID.

## API Documentation

- **Postman Collection**: Import the Postman collection to explore and test the available API endpoints.

## Development Steps

### Backend Steps (Test-Driven Development TDD)

1. **Setup the Repository**:

   - Create the GitHub repository (`hux-assessment-backend`).
   - Initialize the project with `git init` and create a `.gitignore` file.
   - Make the first commit with the initial setup files.

2. **Install Dependencies**:

   - Install core dependencies: Express, TypeScript, Mongoose, JWT (`jsonwebtoken`), and necessary utility libraries.
   - Install development dependencies: TypeScript, Jest, nodemon, ts-node, type definitions, and testing utilities like **Supertest**.
   - Make a commit for the installed dependencies and configuration.

3. **Project Structure**:

   - Create a clean folder structure: `controllers`, `models`, `routes`, `middleware`, `services`, `utils`, and `tests`.
   - Set up TypeScript configuration (`tsconfig.json`).
   - Make a commit for the folder structure and configuration setup.

4. **Testing Setup**:

   - Configure **Jest** for unit testing and integration testing.
   - Set up the test environment, including a test database.
   - Write initial placeholder tests to confirm the setup is working.
   - Make a commit for the testing setup.

5. **Database Setup**:

   - Set up a MongoDB connection using Mongoose.
   - Create a simple script to connect to the database and log the connection status.
   - Make a commit for the database setup.

6. **Error Handling Middleware**:

   - Create a global error handling middleware to handle errors across all routes.
   - Write a test to confirm the error handling middleware is functioning as expected.
   - Make a commit for the error handling setup.

7. **User Model and Auth Routes (Test-First)**:

   - Write tests for creating a new user, login, and logout.
   - Create a `User` model with validation.
   - Implement user authentication (`signup`, `login`, `logout`) using JWT.
   - Make a commit after implementing and passing tests for user authentication.

8. **Middleware for Authentication**:

   - Write tests for the authentication middleware to verify it correctly validates JWT tokens.
   - Implement middleware to protect routes.
   - Make a commit for the middleware implementation.

9. **Contact Model and CRUD Routes (Test-First)**:

   - Write tests for creating, reading, updating, and deleting contacts.
   - Create a `Contact` model with necessary fields (first name, last name, phone number).
   - Implement CRUD routes and controllers.
   - Make a commit for the contact model and CRUD routes after ensuring tests pass.

10. **Input Validation**:

    - Add validation for incoming requests using tools like **express-validator**.
    - Write tests to validate the correctness of input data.
    - Make a commit for the input validation logic.

11. **API Documentation with Postman**:

    - Create a Postman collection for the API and add all endpoints with example requests and responses.
    - Make a commit with the Postman collection exported.

12. **Finalize Testing**:

    - Write additional tests for other scenarios and edge cases.
    - Ensure all tests pass and make a commit for the finalized test suite.

13. **Code Cleanup and Optimization**:

    - Review and refactor code for readability and maintainability.
    - Add comments where necessary.
    - Make a final commit for the cleaned and optimized code.

14. **Prepare for Deployment**:
    - Add environment variables support using `dotenv`.
    - Update the README with detailed setup and usage instructions.
    - Make a commit with the final deployment preparation.

## License

This project is licensed under the MIT License.

## Author

- **Chinedu Knight** - Full Stack Developer
