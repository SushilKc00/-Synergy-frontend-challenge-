# User Management Application

A fully functional User Management application that allows users to **Create**, **Read**, **Update**, and **Delete** (CRUD) user profiles. This application employs JSONPlaceholder for fetching user data and uses Local Storage for data persistence. Built with **React** and **TypeScript**, it also integrates **Toastify** for better user notifications and error handling. Additionally, it utilizes **Zod** for form validation, ensuring that user input is properly validated before submission.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Application Structure](#application-structure)
- [API Endpoints](#api-endpoints)
- [Data Persistence](#data-persistence)
- [Error Handling](#error-handling)
- [Form Validation](#form-validation)
- [User Interface](#user-interface)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This application serves as a simple interface for managing user profiles. Users can create new profiles, view existing profiles, edit them, or delete them as needed. The application demonstrates best practices in React development, including the use of Context API for state management, hooks for functional components, and TypeScript for type safety.

## Features

- **CRUD Operations**: Full functionality to create, read, update, and delete user profiles.
- **Data Persistence**: User data persists across sessions using Local Storage.
- **API Integration**: Fetch user data from JSONPlaceholder, providing realistic sample data.
- **User Notifications**: Implemented using Toastify for better user feedback on actions.
- **Type Safety**: The application is built with TypeScript, enhancing code quality and maintainability.
- **Form Validation**: Utilizes Zod for input validation, ensuring user data is correctly formatted and complete.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript and adds type safety.
- **JSONPlaceholder**: Fake online REST API for testing and prototyping user data.
- **Local Storage**: Web storage for persisting user data in the browser.
- **Toastify**: Library for easy-to-use toast notifications.
- **Zod**: TypeScript-first schema declaration and validation library.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/user-management.git
