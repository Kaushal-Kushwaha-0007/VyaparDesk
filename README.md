# VyaparDesk

VyaparDesk is a web-based inventory and product management system designed for shop owners. It provides an easy-to-use interface to manage products, track stock levels, analyze inventory, and make data-driven decisions.

## Features

- **Product Management**

  - Add, edit, and delete products
  - Bulk upload products via Excel
  - Download product list as CSV

- **Inventory Analytics**

  - Stock distribution by category
  - Stock distribution by brand
  - Low-stock vs sufficient-stock overview
  - Top 5 most expensive and cheapest products
  - Inventory value distribution (price × quantity)

- **User Authentication**
  - Secure login and registration
  - User-specific product management

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Handling:** Multer, XLSX
- **API Testing:** Postman

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sahilkr37/vyapardesk
    cd cineguide
    ```

2.  **Install dependencies:**

- Backend:
  ```bash
  cd server
  npm install
  ```
- Frontend:
  ```bash
  cd ../client
  npm install
  ```

3.  **Usage:**

- Start the backend server

  ```bash
  cd server
  node server.js
  ```

- Start the frontend server
  ```bash
  cd ../client
  npm run dev
  ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.
5.  Environment Variables

- Configure your backend .env file in the server directory with your MongoDB URI and JWT secret:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

- For the frontend, set the API URL in .env:

```bash
VITE_API_URL=http://localhost:5000
```
