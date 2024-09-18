import { Link, Navigate, useNavigate } from "react-router-dom"; // nos sirve para redireccionar con botones
import {Box, Flex, HStack, Image} from "@chakra-ui/react";
import scholImg from './assets/school.png';


export function Header(){
    const navigate = useNavigate();

    function LogOut(){
        sessionStorage.removeItem("usuario");
        navigate('/');
    }

    return(
        <>
            <Flex w='100%' h='70px' p='5px' align='center' justify='space-between' bgColor='#2b6cb0' color='white' >
                <HStack as='nav' spacing='10px' >
                    <Image src={scholImg} pl={5} w='60px'/>
                    <Link to={'/dashboard'}><Box pl='10px' mr='20px' cursor='pointer' _hover={{color:'gray.200'}}>Listado</Box></Link>
                    <Link to={'/student'}><Box mr='20px' cursor='pointer' _hover={{color:'gray.200'}}>Nuevo</Box></Link>
                </HStack>
                <HStack>
                    <Box mr='20px' cursor='pointer' _hover={{color:'gray.200'}} onClick={() => LogOut()} >
                        Cerrar sesion
                    </Box>
                </HStack>
            </Flex>
        </>
    )
}