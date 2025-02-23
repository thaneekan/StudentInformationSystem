import React from "react";
import {useQuery, gql} from "@apollo/client";

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

const StudentList = ({departmentId}) => {
    const {loading, error, data} = useQuery(GET_STUDENTS,{
    variables: {departmentId},
    skip: !departmentId
    });

    if (!departmentId) return <p>Please select a department to view students.</p>
    if (loading) return <p>Loading students...</p>
    if (error) return <p>Error loading students.</p>
    if (!data || !data.studentsByDepartment) return <p>No students found.</p>;

    return(
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

};

export default StudentList;