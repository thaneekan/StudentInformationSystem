# Student Information System - Local Setup & Functionality

## **1. Running the Project Locally (Failed to deploy whilst keeping frontend connected to backend)**

### **Prerequisites**
Ensure you have the following installed on your machine:
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **SQLite3** (for database management)

---

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

---

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

---

### **Frontend - React with Apollo Client**
The frontend is built using **React.js** and **Apollo Client** for GraphQL queries.

#### **Key Components**
- **`AddStudentForm.js`**: Handles adding new students by collecting input and sending a GraphQL mutation.
- **`StudentList.js`**: Displays students based on the selected department.
- **`DepartmentSelector.js`**: Retrieves a list of departments from the backend and allows users to select a department.

#### **GraphQL Integration in Frontend**
- The frontend connects to the backend GraphQL API via `ApolloClient` in `apolloClient.js`:
  ```javascript
  import { ApolloClient, InMemoryCache } from "@apollo/client";

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql", // Connects frontend to backend
    cache: new InMemoryCache(),
  });

  export default client;
  ```

---

## **3. Department Selector Component (`DepartmentSelector.js`)**
- Fetches departments from the backend.
- Displays them in a dropdown menu to filter students by department.

**GraphQL Query for Fetching Departments:**
```javascript
const GET_DEPARTMENTS = gql`
  query {
    departments {
      id
      name
    }
  }
`;
```

**Implementation Example:**
```javascript
const { loading, error, data } = useQuery(GET_DEPARTMENTS);
if (loading) return <p>Loading departments...</p>;
if (error) return <p>Error loading departments</p>;

return (
  <select onChange={(e) => setSelectedDepartment(e.target.value)}>
    <option value="">All Departments</option>
    {data.departments.map((dept) => (
      <option key={dept.id} value={dept.id}>
        {dept.name}
      </option>
    ))}
  </select>
);
```

💡 **If departments don’t load, check if the backend is running (`npm start` in `backend`).**

---

## **4. Student List Component (`StudentList.js`)**
- Fetches and displays students who belong to a selected department.
- Uses the `studentsByDepartment` GraphQL query to retrieve student data dynamically.

**GraphQL Query for Fetching Students by Department:**
```javascript
const GET_STUDENTS = gql`
query GetStudents($departmentId: ID!) {
  studentsByDepartment(departmentId: $departmentId) {
    id
    first_name
    last_name
    student_id
    address
  }
}
`;
```

**Implementation Example:**
```javascript
const { loading, error, data } = useQuery(GET_STUDENTS, {
  variables: { departmentId },
  skip: !departmentId,
});

if (!departmentId) return <p>Please select a department to view students.</p>;
if (loading) return <p>Loading students...</p>;
if (error) return <p>Error loading students.</p>;

return (
  <table border="1">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Student ID</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {data.studentsByDepartment.map((student) => (
        <tr key={student.id}>
          <td>{student.first_name}</td>
          <td>{student.last_name}</td>
          <td>{student.student_id}</td>
          <td>{student.address}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
```

---

## **5. Adding Students (`AddStudentForm.js`)**
- Allows users to add new students by filling in details and selecting a department.
- Uses the `addStudent` GraphQL mutation.

**GraphQL Mutation for Adding a Student:**
```javascript
const ADD_STUDENT = gql`
mutation AddStudent($firstName: String!, $lastName: String!, $studentId: ID!, $address: String!, $departmentId: ID!) {
  addStudent(firstName: $firstName, lastName: $lastName, studentId: $studentId, address: $address, departmentId: $departmentId) {
    id
    first_name
    last_name
    student_id
  }
}
`;
```

**Implementation Example:**
```javascript
const [addStudent] = useMutation(ADD_STUDENT);
const handleSubmit = (e) => {
  e.preventDefault();
  addStudent({ variables: form });
};
```

---

## **6. Troubleshooting**
### **Common Issues and Fixes**
#### **Backend Issues**
- **Backend not starting?**  
  Ensure SQLite is installed and `StudentsGQL_server.js` is correctly set up.

- **GraphQL Playground not loading?**  
  Manually test the backend at:
  ```
  http://localhost:4000/graphql
  ```

#### **Frontend Issues**
- **Frontend doesn’t start?**  
  Run:
  ```powershell
  npm install
  npm start
  ```

- **Departments are not loading?**  
  Ensure `apolloClient.js` points to the correct backend URL:
  ```javascript
  uri: "http://localhost:4000/graphql"
  ```

---

This guide should help you **set up and troubleshoot** the project locally. 



