import React, {useState} from "react";
import * as APi from './Services/data'; // importamos todos los archivos
import imgLogin from './assets/key.png';
import { useNavigate } from "react-router-dom"; 
import { Box, Center, FormControl, FormLabel, Heading, Input, Image } from "@chakra-ui/react";
import Swal from 'sweetalert2';

export function Login(){
    const [teacher, setTeacher] = useState({usuario:'',password:''}) // establecemos los estados de los campos como '' o vacio
    const navigate = useNavigate(); // hock para la navegacion hacia la ruta 

    async function handleSubmit(e){ // controlador de eventos asincronicos
        e.preventDefault(); // previene el envio del formulario al hacer click
        const respuesta = await APi.login(teacher.usuario,teacher.password);
        if(respuesta.length != 0)
        {
            sessionStorage.setItem("usuario",respuesta); // guardamos el usuario
            navigate('/dashboard'); // redirigimos al dashboard
        }
        else 
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo registrar",
                footer: "Revise los campos!"
            });
        }
    }

    return(
        <>
            <form id="formulario" onSubmit={handleSubmit}>
                <fieldset>
                    <Center>
                        <Image mt={5} src={imgLogin} boxSize='13rem' pt={5}/*w='150px' h='150px'*/ />
                    </Center>
                    
                    <Center>
                        <Box m="2px" borderRadius="md" boxShadow="dark-lg" width="30%" p="5px">
                            <Box textAlign='center' pt='5px' >
                                <Heading>
                                    Iniciar sesión
                                </Heading>
                            </Box>
                            <Box p="20px">
                                <FormControl mt="3px">
                                    <FormLabel>Nombre</FormLabel>
                                    <Input type="text" required onChange={event => setTeacher({...teacher,usuario:event.target.value})}/>
                                </FormControl>
                                <FormControl mt="3px">
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input type="password" required onChange={event => setTeacher({...teacher,password:event.target.value})}/>
                                </FormControl>
                                <FormControl mt="3px" pt='5px'>
                                    <Input type="submit" mt="3px" borderRadius="md" borderColor="blue" value="Login"/>
                                </FormControl>
                            </Box>
                            
                        </Box>
                    </Center>               
                </fieldset>
            </form>
        </>
    )
}