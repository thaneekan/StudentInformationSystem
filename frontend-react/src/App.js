import React, {useState} from "react";
import DepartmentSelector from "./components/DepartmentSelector";
import StudentList from "./components/StudentList";
import AddStudentForm from "./components/AddStudentForm";

const App = () => {
const [selectedDepartment, setSelectedDepartment]=useState(null);

return (
  <div>
    <h1>Student Information System</h1>
    {/*Select a department*/}
    <DepartmentSelector onSelect={setSelectedDepartment}/>

    {/*Show students only if a department is selected*/}
    {selectedDepartment&& (
      <StudentList departmentId={selectedDepartment}/>
    )}

    {/*Show students only if a department is selected*/}
    <AddStudentForm/>


  </div>
);
};

export default App;