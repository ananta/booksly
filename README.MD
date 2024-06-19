# Booksly


![Preview](./extras/screenshots/booksly-main.png "Booksly Landing Page")

### Overview
Booksly is a simple book management application designed to help users track their books seamlessly. The application features a robust backend system, an intuitive frontend interface, and shared utilities to ensure consistency and efficiency across the platform.

### Packages
- backend: Powers the application with a REST API for managing books, built with Node.js and Express.
- frontend: Provides a user-friendly interface for book management, built with React and TypeScript.
- shared: Contains shared utilities, types, and constants to ensure consistency and reuse across both the backend and frontend.

### Getting Started

#### Prerequisites
- Node.js (version 14 or later)
- npm (version 6 or later)

#### Scripts
1. Clone the repository:

```sh
git clone https://github.com/ananta/booksly.git
cd booksly
````

#### Install dependencies:

```sh
yarn
````

#### Running the Project in dev mode:

```sh
yarn start:dev
````

#### Helpful scripts

`yarn clean`
Removes the output directories for shared, backend, and frontend workspaces.

`yarn prebuild`
Runs the `clean` script to remove output directories before the build process.

`yarn build`
Builds the shared, backend, and frontend workspaces concurrently.

`yarn start`
Starts the backend and frontend workspaces concurrently in production mode.

> **Note:** Before running the `frontend` or `backend` package, be sure to build the `shared` package.

`yarn start:dev`
Starts the backend in development mode and the frontend workspaces concurrently.

### Running Tests
```sh
yarn test
```

### Key Features
#### Backend:
- REST API for managing books.
- Validation middleware using Joi.
- Controllers for handling book-related operations.

#### Frontend:
- Book management interface built with React.
- Form handling with react-hook-form and validation with zod.
- Toast notifications for user feedback using a custom useToast hook.

#### Shared:
- Common types and constants used across the backend and frontend.
- Utility functions for shared logic.

### Contributing
Fork the repository.
Create a new branch `git checkout -b feature-branch`.
Make your changes.
Commit your changes `git commit -am 'Add new feature'`.
Push to the branch `git push origin feature-branch`.
Create a new Pull Request.

