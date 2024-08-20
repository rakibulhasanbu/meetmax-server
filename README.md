# MeetMax Server

## Overview

This repository contains the server-side implementation for the MeetMax project. The server handles user authentication, posts, comments, and other core features of the MeetMax platform. The server is built to work with the frontend and provides APIs for all the required operations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **User Authentication:**

  - Sign up and login using Firebase authentication.
  - Secure user sessions and authorization.

- **Post Management:**

  - Create, update, delete, and fetch posts.
  - Supports liking and commenting on posts.

- **Comment Management:**
  - Add, update, delete, and fetch comments related to posts.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web framework for Node.js.
- **Firebase:** Authentication and database services.
- **MongoDB (optional):** Database for storing persistent data (if used instead of Firebase).
- **Vercel:** Hosting platform for server deployment.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rakibulhasanbu/meetmax-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd meetmax-server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```
