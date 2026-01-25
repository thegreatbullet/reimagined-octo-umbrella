# Pokémon Frontend Application

A **production-ready frontend application** for interacting with the Pokémon Backend API. 

Users can view Pokémon, roll for random Pokémon, and track their roll history.

---

## Project Architecture

The project follows a **Component-Based Architecture** for maintainability and reusability:

* **Pages:** Top-level components representing routes (Home, Roll, History, Admin).
* **Components:** Reusable UI elements (PokémonCard, RollButton, Navbar, Modal).
* **Services:** Axios wrappers for interacting with backend API endpoints.
* **Context / Hooks:** Global state and custom hooks for managing user session, rolls, and API data.
* **Assets:** Images, icons, and static resources.
* **Styles:** Tailwind or modular CSS for scoped styling.

---

## App Highlights

### Core Features
* **View Pokémon:** List all available Pokémon, with pagination and filtering options.
* **Roll Pokémon:** Get a random Pokémon using the backend roll API (rate-limited).
* **History Tracking:** View the user's roll history and global roll data.
* **Admin Panel:** Add or remove Pokémon (Admin users only).
* **Responsive Design:** Works on mobile and desktop seamlessly.

### Environment & API
* Connects to backend API via environment variable: `REACT_APP_API_URL`.
* Supports development (`localhost`) and production URLs.

---

## Tech Stack

| Category              | Tools                                    |
| :-------------------- | :--------------------------------------- |
| **Framework**         | React (ESM, functional components)      |
| **State Management**  | React Context / Hooks                    |
| **HTTP Client**       | Axios / Fetch API                        |
| **Routing**           | React Router                             |
| **Styling**           | Tailwind CSS / CSS Modules               |
| **Testing**           | Jest, React Testing Library              |
| **Build Tool**        | Webpack           |
| **Environment**       | Node.js, npm                             |

---

## Getting Started

### 1. Installation
```bash
npm install
```

## 2. Development Mode

```bash
npm start
```

## 3. Production Build

```bash
npm run build
```

---

## License

This project is licensed under the **MIT License**
