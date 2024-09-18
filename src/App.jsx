import { Route, Routes } from "react-router-dom"; //importamos para utilizar las rutas
import { Login } from "./Login"; // login para ser llamado desde la ruta /
import { Dashboard } from "./Dashboard";
import { StudentNew } from "./StudentNew";
import { StudentEdit } from "./StudentEdit";
import { StudentCalification } from "./StudentCalification";


function App(){
    return(
        <>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/student" element={<StudentNew/>} />
            <Route path="/student/:studentId" element={<StudentEdit/>}/> 
            <Route path="/student/calification/:matriculaID" element={<StudentCalification/>}/>
          </Routes>
        </>
    )
}
export default App;