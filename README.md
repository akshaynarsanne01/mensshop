# eCommerce Platform

An eCommerce platform  for mens that allows users to browse products, add them to the cart, and purchase them.

## Description

This project is an eCommerce web application built to facilitate online shopping. It includes features for user authentication, product browsing, shopping cart management, and order processing. The platform aims to provide a seamless shopping experience for users and an easy-to-manage interface for administrators.

## Features

- User Authentication (Sign Up, Login, Logout)
- Product Listings and Search
- Product Categories and Subcategories
- Shopping Cart Management
- Order Placement
- Admin Dashboard for Managing Products and Orders

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MySql
- **Authentication:** JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (>=14.x)
- MySql

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/akshaynarsanne01/mensshop.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd mensshop/server1
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the `backend` directory and add the following variables:
      ```env
      JWT_SECRET=your_jwt_secret
      PORT=3000
      ```
5. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd mensshop/client
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm run dev
    ```

The application should now be running locally on `http://localhost:3000` (backend) .

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with existing credentials.
3. Browse products, add them to your cart, and proceed to checkout to place an order.
4. Admin users can log in and access the admin dashboard to manage products and orders.

## API Endpoints

### Authentication

### Products

### Orders

## Contact

- Maintainer: Akshay Narsanne
- Email: akshaynarsanne01@gmail.com
- GitHub: [akshaynarsanne01](https://github.com/akshaynarsanne01)
