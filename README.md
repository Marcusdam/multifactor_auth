# Multifactor Authentication API

This is a simple Multifactor Authentication (MFA) API built with **Node.js**, **Express**, **Passport.js**, and **JWT** (JSON Web Tokens). It provides user registration, login, and the option to enable MFA for added security.

## Features

- **User Registration**: Create a new user with a username and password.
- **User Login**: Authenticate users and issue JWT tokens.
- **JWT Authentication**: Secure routes using JWT for authentication.
- **MFA Integration** (optional): Enable Multi-Factor Authentication for additional security.

## Tech Stack

- **Backend**: Node.js, Express
- **Authentication**: Passport.js (JWT strategy)
- **Database**: MongoDB (with Mongoose)
- **Security**: bcryptjs (password hashing), JWT (authentication), speakeasy (optional MFA)
- **Environment Variables**: .env

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud MongoDB instance)
- [Git](https://git-scm.com/)

