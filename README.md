# Task Management Application

# Specification

Backend: Golang, Gin

Frontend: React + Typescript + TailwindCSS, built by Vite

# How To Run

The Backend and Frontend application runs separately.

### Before run:

1. If no `.env` file yet, copy the `.env.example` file and rename it to `.env`.
2. (Optional) Update the API path & protocol defined `.env` if needed. This may be useful if you need to run it on staging / different environment.

### To run backend:

1. Make sure you have Golang installed (preferably 1.19)
2. Go to `/api`
3. Run `go install` for the first time
4. Run `go run .`. The API should be ready to use now

### To run frontend:

1. Make sure you have NodeJS installed
2. Go to `/webapp`
3. Run `npm install` for the first time
4. Run `npm run dev`. The web application should be ready to use now, served by vite

# Feature Available

### User able to create, read and update the tasks

# Feature to Improve

### 1. User shall be able to sort by Due Date, Create Date, or Task Name

To implement this, I will need to:
- Create a state to save the user's selected filter
- Create a select form to allow user to choose the sort option
- Create a new variable that map the `tasks` array to sort based on the selected sort option

### 2. User shall be able to load all the tasks without affecting the performance

To implement this, I will need to:
- Create a pagination params on the tasks API
- Paginate the rendered task list. It can be either:
  - Pagination by page number, or
  - Lazy loading pagination, means the list will be rendered whenever user scroll to the bottom, or
  - Partial Lazy loading pagination, means only few lists will be rendered based on the user's current position

### 3. Backend Wise, there should be a Database to store the user tasks

Currently I only stored the task list as Go variable, which means when the server restarted, the task data will be gone.
By right there should be a database like PostgreSQL to permanently store the tasks.

### 4. Data Validation before user submit

The data input from user shall be validated first before sending to the API, such as:
- it should not be empty (if required)
- it should be filtered to prevent XSS
- it should show warning message to the user if the condition does not fit

### 5. Show response to user if the application API failed

If the API failed to respond, there should be a warning or error message shown to the user, notifying them what went wrong and
instruct them further step if possible.

### 6. Write a Unit Test for the Backend & Frontend

Write the simple use-case to ensure the basic functionality of Create, Read, and Update Task is still working, to prevent regression if the code updated
