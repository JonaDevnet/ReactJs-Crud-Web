import { Header } from "./Header";
import { useState } from "react";
import * as API from "./Services/data";
import { Center, Box, Heading, FormControl, Input, FormLabel, Select, Button } from "@chakra-ui/react";
import Swal from 'sweetalert2';

export function StudentNew(){

    const [student, setStudent] = useState({dni:'',nombre:'',direccion:'',edad:'',email:'',asignatura:'1'}); // vacio primero asg = 1 porsi no se selec any

    function handleSubmit(e){
        e.preventDefault();
        API.createStudent(student).then(result => { // lo que se recibe esta encapsulado en el result
            if (result=="true"){ 
                Swal.fire({
                    icon: "succes",
                    title: "Se creo con exito!",
                });
                document.getElementById("formulario").reset(); // reiniciamos el formulario
            }
            else{
                Swal.fire({
                    icon: "succes",
                    title: "No se pudo crear!",
                });
                document.getElementById("formulario").reset(); // reiniciamos el formulario
            }
        })
    }

    return(
        <>
            <Header/>
            <Center>
                <Box m={40} boxShadow={'xl'} w={'40%'} borderRadius={'5%'} >
                    <form id="formulario" onSubmit={handleSubmit}>
                        <fieldset>
                            <Box textAlign={'center'}>
                                <Heading>Nuevo estudiante</Heading>
                            </Box>
                            <Box p={20}>
                                <FormControl mt={3}>
                                    <FormLabel>DNI</FormLabel>
                                    <Input type="text" id="dni" required onChange={event => setStudent({...student,dni:event.target.value})} />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input type="text" id="nombre" required onChange={event => setStudent({...student,nombre:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Direccion</FormLabel>
                                    <Input type="text" id="direccion" required onChange={event => setStudent({...student,direccion:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Edad</FormLabel>
                                    <Input type="text" id="edad" required onChange={event => setStudent({...student,edad:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="text" id="email" required onChange={event => setStudent({...student,email:event.target.value})}/>
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Asignatura</FormLabel>
                                    <Select id="asignatura" onChange={event => setStudent({...student,asignatura:event.target.value})}>
                                        <option value='1'>Matematicas</option>
                                        <option value='2'>Informatica</option>
                                        <option value='3'>Ingles</option>
                                        <option value='4'>Literatura</option>
                                    </Select>
                                </FormControl>
                                <FormControl mt={5}>
                                    <Button type="submit" id='nuevo' size={'md'} borderColor={'teal'} mt={3} w={'100%'} align='center' justify='space-between' bgColor='#2b6cb0' color='white' _hover={{color:'#2b6cb0', bgColor:'white'}} >
                                        Nuevo
                                    </Button>
                                </FormControl>
                            </Box>                           
                        </fieldset>
                    </form>
                </Box>
            </Center>
            
        </>
    )
}