const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Function to initialize SQLite database
async function initializeDB() {
    return await open({
        filename: "./studentsinfo.sqlite",
        driver: sqlite3.Database,
    });
}

// GraphQL Schema
const typeDefs = gql`
    type Department {
        id: ID!
        name: String!
        address: String!
    }

    type Student {
        id: ID!
        first_name: String!
        last_name: String!
        student_id: String!
        address: String!
        department: Department!
    }

    type Query {
        studentsByDepartment(departmentId: ID!): [Student]
        departments: [Department]
    }

    type Mutation {
        addStudent(
            firstName: String!
            lastName: String!
            studentId: ID!
            address: String!
            departmentId: ID!
        ): Student
    }
`;

// Resolvers
const resolvers = {
    Query: {
        studentsByDepartment: async (_, { departmentId }, { db }) => {
            if (!db) throw new Error("Database connection not established.");
            console.log(`Fetching students for department ID: ${departmentId}`);
            
            const students = await db.all(
                `SELECT * FROM students WHERE department_id = ?`,
                [departmentId]
            );

            console.log(`Fetched ${students.length} students.`);
            return students;
        },
        departments: async (_, __, { db }) => {
            if (!db) throw new Error("Database connection not established.");
            return await db.all(`SELECT * FROM departments`);
        }
    },

    Mutation: {
        addStudent: async (_, { firstName, lastName, studentId, address, departmentId }, { db }) => {
            if (!db) throw new Error("Database connection not established.");
            try {
                console.log("Adding student:", { firstName, lastName, studentId, address, departmentId });

                await db.run(
                    `INSERT INTO students (first_name, last_name, student_id, address, department_id)
                     VALUES (?, ?, ?, ?, ?)`,
                    [firstName, lastName, studentId, address, departmentId]
                );

                console.log("Student successfully inserted into database!");

                // Fetch the newly added student
                const newStudent = await db.get(
                    `SELECT * FROM students WHERE student_id = ?`,
                    [studentId]
                );

                console.log("New student:", newStudent);
                return newStudent;
            } catch (error) {
                console.error("Database Error:", error);
                throw new Error("Failed to add student");
            }
        }
    },

    Student: {
        department: async (student, _, { db }) => {
            if (!db) throw new Error("Database connection not established.");
            return await db.get(`SELECT * FROM departments WHERE id = ?`, [student.department_id]);
        },
    },
};

// Initialize Apollo Server
async function startServer() {
    const app = express();
    const db = await initializeDB(); // Ensure the database is initialized before running the server
    console.log("✅ Database connected!");

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: () => ({ db }) // Pass the database instance to resolvers
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log("🚀 Server ready at http://localhost:4000/graphql")
    );
}

startServer();
