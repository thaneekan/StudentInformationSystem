import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_DEPARTMENTS = gql`
  query {
    departments {
      id
      name
    }
  }
`;

const DepartmentSelector = ({ onSelect }) => {
  const { loading, error, data } = useQuery(GET_DEPARTMENTS);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error loading departments</p>;

  const handleSelection = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelect(selectedDepartment); // Pass the selected department ID to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.departments.map((dept) => (
        <div key={dept.id}>
          <input
            type="radio"
            id={`dept-${dept.id}`}
            name="department"
            value={dept.id}
            checked={selectedDepartment === dept.id}
            onChange={handleSelection}
          />
          <label htmlFor={`dept-${dept.id}`}>{dept.name}</label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DepartmentSelector;
