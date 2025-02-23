# Student Information System - Local Setup & Functionality

## **1. Running the Project Locally(Failed to deploy whilst keeping frontend connected to backend**

### **Prerequisites**
Ensure you have the following installed on your machine:
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **SQLite3** (for database management)

### **Backend Setup**
1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the backend server:
   ```powershell
   node StudentsGQL_server.js
   ```
4. The backend GraphQL API should now be available at:
   ```
   http://localhost:4000/graphql
   ```

### **Frontend Setup**
1. Open a new terminal and navigate to the frontend folder:
   ```powershell
   cd frontend-react
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend application:
   ```powershell
   npm start
   ```
4. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

---

## **2. Overview of Implemented Functions**

### **Backend - GraphQL API**
The backend is built using **Apollo Server with Express** and an **SQLite database**.

#### **GraphQL Queries**
- `departments`: Retrieves all departments from the database.
- `studentsByDepartment(departmentId)`: Fetches students belonging to a specific department.

#### **GraphQL Mutations**
- `addStudent(firstName, lastName, studentId, address, departmentId)`: Adds a new student to the database.
  - This function executes an `INSERT` SQL statement and then retrieves the newly added student.

### **Frontend - React with Apollo Client**
The frontend is built using **React.js** and **Apollo Client** for GraphQL queries.

#### **Key Components**
- **`AddStudentForm.js`**: Handles adding new students by collecting input and sending a GraphQL mutation.
- **`StudentList.js`**: Displays students based on the selected department.

#### **GraphQL Integration in Frontend**
- The frontend connects to the backend GraphQL API via `ApolloClient` in `client.js`:
  ```javascript
  import { ApolloClient, InMemoryCache } from "@apollo/client";

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Connects frontend to backend
    cache: new InMemoryCache(),
  });

  export default client;
  ```

---

## **3. Troubleshooting**
- **If `npm start` fails**: Ensure `node_modules` exists, otherwise run `npm install`.
- **If the backend doesn’t start**: Check `server logs` for database errors.
- **If the frontend shows errors**: Verify `React` dependencies are correctly installed.
- **GraphQL Errors?** Use `http://localhost:4000/graphql` to manually test queries.

For further debugging, check logs using:
```powershell
npm run build  # For frontend
npm run dev    # For backend (if applicable)
```

This concludes the setup and function summary for the Student Information System.

