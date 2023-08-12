# MERN Web To-Do List

A simple yet efficient To-Do list web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can add tasks, mark them as done, and delete tasks.
Features

   *Add Tasks: Quickly add tasks to the list with a single click.
   *Mark Tasks as Done: Once you've completed a task, you can mark it as done to move it to the completed list.
   *Delete Tasks: Remove tasks from the list.

Database Configuration

The application is connected to a MongoDB database. Before running the application, you will need to set up a MongoDB instance and provide the connection string.
Steps:

   *Setup MongoDB: Create a database on MongoDB , then create a collection and name it 'things'
   *Configure Connection: In the backend directory, create a .env file
   *Add Connection String: Inside the .env file, add the following line:
   
     MONGODB=<Your MongoDB Connection String>

Replace <Your MongoDB Connection String> with the actual connection string of your MongoDB database.

# Getting Started:

Clone the Repository:

     git clone https://github.com/DonDraper04/MERN-To-Do-list.git
     cd MERN-To-Do-list

Install Dependencies:

Navigate to frontend and backend directories to install dependencies in both

    cd frontend && npm install
    cd ../backend && npm install

Run the Application:

First, start the backend:

    cd backend && npm start

Then, in another terminal, start the frontend:

    cd frontend && npm start

The application should now be running on your local environment!
Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Feedback is always welcome!

This README provides a basic introduction to the application, its features, and steps to get it running. You can further enhance this README with screenshots, detailed setup instructions, or any other pertinent information you feel would be beneficial for users or contributors.
