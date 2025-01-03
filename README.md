
## Setup and Run
1. Clone the repository
2. Run 'npm install' to install all dependecies for this project
3. To run project enter command 'node server.js' OR 'nodemon server.js' with nodemon
4. If the project runs successfully, the terminal will display: "Server is running on port 3000" and "Successfully connected to the database!"

### I have used MongoDB Cloud so that you can get actual results for below endpoints also i have attached screenshot with email of postman endpoints testing result

### API Endpoints to test on Postman
- `http://localhost:3000/api/v1/quiz/createQuiz`: Create a new quiz Api.
- `http://localhost:3000/api/v1/quiz/getQuiz/6777c5a270982216c67ed942`: Get a quiz by its id (without answers) Api.
- `http://localhost:3000/api/v1/result/submitAnswer`: Submit an answer Api.
- `http://localhost:3000/api/v1/result/getResults?quizId=6777c5a270982216c67ed942&userId=user-123`: Get quiz results Api.