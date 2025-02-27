# To-Do List Application

## Project Description

### Objective:
Build a To-Do List where users can add, view, mark as completed, and
delete tasks.

*Task Breakdown*:

1. Frontend (HTML, CSS, JavaScript)

Create a simple form to add a task with fields:
Task Title (Text)
Submit Button
Display the task list below the form.
Style the page using CSS with basic responsiveness.
Use JavaScript for form validation (ensure the title is not empty before
submission).

2. Backend (Python & sqlite)

Database Schema:

Create a table todos with columns:
id (Primary Key, Auto-increment)
task (VARCHAR)
status (ENUM: ‘pending’, ‘completed’)
created_at (TIMESTAMP)

Functionality:
Store tasks in the database.
Retrieve and display all tasks.
Provide a delete button to remove tasks.
Provide a checkbox or button to mark a task as completed (update
status).

## Project Overview

This is a simple, yet powerful To-Do List application built with FastAPI for the backend and vanilla JavaScript for the frontend. The application allows users to create, view, update, and delete tasks in a clean, responsive interface.

## Features

- Add new tasks
- Mark tasks as completed/pending
- Delete tasks
- Responsive design that works on mobile and desktop
- Real-time updates without page refresh
- Data persistence using SQLite database

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript
- **Server**: Uvicorn

## Project Structure 

## Running the Application

### Step-by-Step Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Set up a virtual environment** (recommended):
   
   On Windows:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
   
   On macOS/Linux:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   
   Option 1 - Using Python:
   ```bash
   python app.py
   ```
   
   Option 2 - Using Uvicorn directly:
   ```bash
   uvicorn app:app --reload
   ```

5. **Access the application**:
   
   Open your web browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```

6. **Using the application**:
   - Add a task: Type in the input field and click "Add Task"
   - Mark as completed: Click the "Complete" button next to a task
   - Undo completion: Click the "Undo" button on a completed task
   - Delete a task: Click the "Delete" button next to a task

7. **Testing the API with Swagger UI**:
   
   To explore and test the API endpoints:
   ```
   http://127.0.0.1:8000/docs
   ```
   
   This interactive documentation allows you to:
   - See all available endpoints
   - Test each endpoint directly in the browser
   - View request and response schemas
   - Execute API calls and see the results

8. **Stopping the application**:
   
   Press `CTRL+C` in the terminal where the application is running.
   
   To deactivate the virtual environment:
   ```bash
   deactivate
   ``` 
