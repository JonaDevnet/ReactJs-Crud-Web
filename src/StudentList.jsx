import { useEffect, useState } from "react";
import * as API from './Services/data';
import { Link } from "react-router-dom";
import {Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import { FaRegEdit, FaStickyNote } from "react-icons/fa";
import { BsFillStickyFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

export function StudentList(){

    const [students, useStudents] = useState([]); // [] por que es un array

    let user = sessionStorage.getItem("usuario"); // capturamos el usuario del login

    useEffect ( () => {  // useEffect ( () => { #bloque de codigo })
        API.getStudent(user).then(useStudents); // resivimos al array de estudiantes y actualizamos el estado
    })

    function deleteStudent(id){
        API.deleteStudent(id).then(result => {
            if (result == 'true'){
                Swal.fire({
                    icon: "succes",
                    title: "Eliminado",
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar :/ ",
                });
            }
        })
    }

    return(
        <>
        <Box m='50px'>
            <TableContainer>
                    <Table size='md' variant='striped' colorScheme="gray" >
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>DNI</Th>
                                <Th>Nombre</Th>
                                <Th>Direccion</Th>
                                <Th>Edad</Th>
                                <Th>Email</Th>
                                <Th>Asignatura</Th>
                                <Th></Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                students?.map(student => (
                                    <Tr key={student.id}>                                   
                                        <Td>{student.id}</Td>
                                        <Td>{student.dni}</Td>
                                        <Td>{student.nombre}</Td>
                                        <Td>{student.direccion}</Td>
                                        <Td>{student.edad}</Td>
                                        <Td>{student.email}</Td>
                                        <Td>{student.asignatura}</Td>
                                        <Td><Link to={'/student/'+ student.id}><FaRegEdit size={25} /></Link></Td>
                                        <Td><Link to={'/student/calification/'+student.matriculaId}><BsFillStickyFill size={20}/></Link></Td>
                                        <Td onClick={() => deleteStudent(student.id)}><MdDeleteForever color="red" size={25} cursor='pointer'/></Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}