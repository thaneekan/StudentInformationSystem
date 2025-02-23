import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_DEPARTMENTS = gql`
  query {
    departments {
      id
      name
    }
  }
`;

const ADD_STUDENT = gql`
  mutation AddStudent(
    $firstName: String!,
    $lastName: String!,
    $studentId: ID!,
    $address: String!,
    $departmentId: ID!
  ) {
    addStudent(
      firstName: $firstName,
      lastName: $lastName,
      studentId: $studentId,
      address: $address,
      departmentId: $departmentId
    ) {
      id
      first_name
      last_name
      student_id
    }
  }
`;

const AddStudentForm = () => {
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    studentId: "",
    departmentId: "",
  });
  const [message, setMessage] = useState(null); // ✅ Message for success or failure
  const [addStudent, { error: mutationError }] = useMutation(ADD_STUDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting:", form);

    try {
      const { data } = await addStudent({
        variables: {
          ...form,
          studentId: String(form.studentId), // Ensure studentId is a string
          departmentId: String(form.departmentId), // Ensure departmentId is a string
        },
      });

      console.log("Student added successfully!", data);
      setMessage({ type: "success", text: "✅ Student added successfully!" });

      // ✅ Reset form fields after successful submission
      setForm({
        firstName: "",
        lastName: "",
        address: "",
        studentId: "",
        departmentId: "",
      });

    } catch (err) {
      console.error("Failed to add student:", err);
      setMessage({ type: "error", text: "❌ Failed to add student. Please try again." });
    }
  };

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error loading departments</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Student ID"
        value={form.studentId}
        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        required
      />

      {/* Independent Department Selection */}
      <select
        value={form.departmentId}
        onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
        required
      >
        <option value="">Select Department</option>
        {data?.departments?.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>

      <button type="submit">Add student</button>

      {/* ✅ Display Success or Error Message */}
      {message && <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>}
      
      {mutationError && <p style={{ color: "red" }}>❌ Error adding student.</p>}
    </form>
  );
};

export default AddStudentForm;
