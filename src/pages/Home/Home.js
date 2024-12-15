import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container className="my-4">
        <h2>App Description</h2>
        <p>
          This is a Task Management Application built using the MERN stack
          (MongoDB, Express, React, Node.js). The application allows users to
          efficiently manage tasks, track their progress, and collaborate
          effectively. Users can create, update, and delete tasks, set due
          dates, and categorize tasks based on their status. The app also
          features user authentication using JSON Web Tokens (JWT) and provides
          a user-friendly interface.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>
            User Registration and Login using JWT authentication. 
          </li>
          <li>
          User Dashboard to manage tasks. Create, update, and delete tasks with title, description, due date, and status. 
          </li>
          <li>Mark tasks as completed or move them to different statuses.
             </li>
             <li>Organized and visually appealing task display.</li>
             <li>Form validation and error handling for submissions.</li>
          <li>
            Responsive design for a seamless experience on different devices.
          </li>
        </ul>
        <h2>How to use App?</h2>
        <ul>
          <li>
            <b>Step 1: </b>
            Create an account.
            <Link to={"/signup"}> (Click here)</Link>
          </li>
          <li>
            <b>Step 2: </b>
            Log In to the app.
            <Link to={"/login"}> (Click here)</Link>
          </li>
          <li>
            <b>Step 3: </b>
            Create task, by default it sets the status as To-do.
          </li>
          <li>
            <b>Step 4: </b>
            You can set the task as In-progress
          </li>
          <li>
            <b>Step 5: </b>
            Once you completed the task, set it to completed.
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Home;
