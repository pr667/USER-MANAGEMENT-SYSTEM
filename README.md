# User Management Dashboard

A responsive user management application built with React that supports creating, viewing, updating, and deleting users through the JSONPlaceholder REST API. The project focuses on clean component architecture, reusable logic, responsive design, and a smooth user experience.

**Live Demo:** https://pr667.github.io/USER-MANAGEMENT-SYSTEM/

**Repository:** https://github.com/pr667/USER-MANAGEMENT-SYSTEM

## Features

* View users in a sortable and paginated table
* Add new users through a validated form
* Edit existing users with pre-filled data
* Delete users with confirmation before removal
* Global search with debounced input
* Sort users by clicking table headers
* Filter users by first name, last name, email, and department
* Choose between 10, 25, 50, or 100 rows per page
* Responsive table on desktop and card layout on mobile
* Client-side form validation
* Error handling with user-friendly messages and React Error Boundary

## Tech Stack

* React 18 (Vite)
* Tailwind CSS v4
* Axios
* Lucide React
* Vitest & React Testing Library
* JSONPlaceholder REST API
* GitHub Pages

## Project Structure

```text
src/
├── components/
│   ├── UserTable/
│   ├── UserForm/
│   ├── Pagination/
│   ├── FilterPopup/
│   ├── SearchBar/
│   ├── Modal/
│   ├── Loader/
│   └── ErrorMessage/
├── services/
├── hooks/
├── utils/
├── constants/
├── App.jsx
└── main.jsx
```

The project follows a feature-based component structure. API calls are centralized in the `services` folder, reusable business logic lives in `hooks` and `utils`, and UI components are separated into their own directories to keep the application easy to maintain.

## Getting Started

Clone the repository.

```bash
git clone https://github.com/pr667/USER-MANAGEMENT-SYSTEM.git
cd USER-MANAGEMENT-SYSTEM
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

Useful scripts:

```bash
npm test
npm run test:watch
npm run build
npm run preview
npm run deploy
```

## Design Decisions

A few implementation choices were made because of the limitations of the JSONPlaceholder API:

* The API returns a single `name` field, so it is split into first and last names for display.
* Since there is no department field, `company.name` is used instead.
* CRUD operations are simulated by JSONPlaceholder, so changes disappear after a page refresh.
* Newly created users receive a locally generated ID to avoid duplicate IDs returned by the mock API.
* Department filter options are predefined because the API does not provide a department list.

## Challenges

Some of the interesting problems during development included:

* Normalizing API data into a consistent application model
* Keeping the UI responsive while performing optimistic CRUD updates
* Building reusable filtering and sorting logic
* Implementing debounced search without unnecessary re-renders
* Configuring Vite correctly for GitHub Pages deployment

## Future Improvements

Given more time, I would add:

* React Query for server-state management
* Toast notifications
* Bulk user actions
* Infinite scrolling
* A real backend for persistent data
* End-to-end tests with Playwright

## API

Base URL:

```text
https://jsonplaceholder.typicode.com
```

Endpoints used:

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

---

Built by **Preetham** as part of the Ajackus assignment.
