import { useParams } from "react-router-dom"
import { Header } from "./Header";
import { useEffect, useState } from "react";
import * as API from './Services/data';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Center, FormControl, FormLabel, Heading, Input, Button} from "@chakra-ui/react";
import Swal from 'sweetalert2';

export function StudentEdit(){

    let params = useParams(); // obtenemos el id del parametro pasado
    // hock para el student a editar
    const [student,setStudent] = useState([]); // una lista porque es un json
    const navigate = useNavigate();

    useEffect (() => {
        API.getStudentDetails(params.studentId).then(setStudent);
    },[]) // esto sirve para que solo se actualice una vez el contenido

    function handleSubmit(e){
        e.preventDefault();
        API.editStudent(student).then(result => {
            if(result == "true"){
                Swal.fire({
                    icon: "succes",
                    title: "Se edito el alumno",
                });
                document.getElementById("formulario").reset();
                navigate('/dashboard');
            }
            else{
                Swal.fire({
                    icon: "succes",
                    title: "No se pudo editar :/",
                });
                document.getElementById("formulario").reset();
            }
        })
    }

    return(
        <>
            <Header/>
            <Center>
                <Box p={20} w={'50%'}>
                    <form id="formulario" onSubmit={handleSubmit} >
                        <fieldset>                         
                            <Box textAlign={'center'}>
                                <Heading>Editar alumno</Heading>
                            </Box>
                            <FormControl mt={3}>
                                    <FormLabel>DNI</FormLabel>
                                    <Input  type='text' id='dni' required disabled value={student.dni} />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input type='text' id='nombre' required value={student.nombre} onChange={event => setStudent({...student,nombre:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Direccion</FormLabel>
                                    <Input type='text' id='direccion' required value={student.direccion} onChange={event => setStudent({...student,direccion:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Edad</FormLabel>
                                    <Input type='number' id='edad' required value={student.edad} onChange={event => setStudent({...student,edad:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Email</FormLabel>
                                    <Input  type='text' id='email' required value={student.email} onChange={event => setStudent({...student,email:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={5}>
                                    <Button type='submit' id='editar' size={'md'} borderColor={'teal'} mt={3} w={'100%'} align='center' justify='space-between' bgColor='#2b6cb0' color='white' _hover={{color:'#2b6cb0', bgColor:'white'}} >
                                        Editar
                                    </Button>
                                </FormControl>
                        </fieldset>
                    </form> 
                </Box>   
            </Center>
            
        </>
    )
}