import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import * as API from './Services/data';
import { Badge, Box, Button, Center, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

export function StudentCalification() {
    let params = useParams(); // para obtener el id de la matricula

    const [califications, setCalifications] = useState([]); // hock for view list of califications
     
    const [calification, setCalification] = useState([]); // hock for new calification

    useEffect(() => {
        API.getCalifications(params.matriculaID).then(setCalifications);
    });

    let total = 0;

    califications?.map(calification => (
        total = total + calification.nota * (calification.porcentaje/100)  
    ));

    function createCalification() {
        let descField = document.getElementById("descripcion");
        let notaField = document.getElementById("nota");
        let porcField = document.getElementById("porcentaje");
        
        // flag
        let validate = descField.value.trim() !== "" && notaField.value.trim() !== "" && porcField.value.trim() !== "";

        if (validate) {
            API.postCalification(calification,params.matriculaID).then(result => {
                if (result === "true") {
                    alert('Se creó correctamente');
                    // reset the inputs 
                    document.getElementById("descripcion").value = "";
                    document.getElementById("nota").value = "";
                    document.getElementById("porcentaje").value = "";

                } else {
                    alert('Ocurrió un error');
                }
            });
        }
        else {
            alert("Hay un valor nulo");
        }
    }

    function deleteCalification(id){
        API.deleteCalification(id).then(result => {
            if(result == "true"){
                Swal.fire({
                    icon: "succes",
                    title: "Eliminado",
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar"
                });
            }
        });
    }

    return (
        <>
            <Header />
            <Center>
                <Box m='60px'>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Descripcion</Th>
                                    <Th>Nota</Th>
                                    <Th>Ponderacion</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    califications?.map(calification => (
                                        <Tr key={calification.id}>
                                            <Td>{calification.descripcion}</Td>
                                            <Td>{calification.nota}</Td>
                                            <Td>{calification.porcentaje}%</Td>
                                            <Td onClick={() => deleteCalification(calification.id)} ><MdDeleteForever color="red" size={25} cursor='pointer'></MdDeleteForever></Td>
                                        </Tr>
                                    ))
                                }
                                <Tr>
                                    <Td>
                                        <Input   type='text' id='descripcion' placeholder='Descripcion' onChange={event => setCalification({ ...calification, descripcion: event.target.value })} />
                                    </Td>
                                    <Td>
                                        <Input   type='number' id='nota' placeholder='Nota' onChange={event => setCalification({ ...calification, nota: event.target.value })} />
                                    </Td>
                                    <Td>
                                        <Input   type='number' id='porcentaje' placeholder='Porcentaje' onChange={event => setCalification({ ...calification, porcentaje: event.target.value })} />
                                    </Td>
                                    <Td>
                                        <FaPlus id='nueva' onClick={() => createCalification()} size={25} cursor='pointer'></FaPlus>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>            
                </Box>
            </Center>
            <Center> 
                <Box mt='10px' fontSize='lg'>
                    Nota final:
                    <Badge variant='outline' colorScheme="green" ml={3}>
                        {total}
                    </Badge> 
                </Box>
            </Center>             
        </>
    )
}
