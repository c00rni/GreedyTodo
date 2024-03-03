import { Flex, Spacer, Box, Button, ButtonGroup, Container} from '@chakra-ui/react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    }

    return (
    <>
        <Container maxW="container.xl">
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <Box p='2'>
                        <Logo size="4xl"/>
                    </Box>
                    <Spacer />
                    <ButtonGroup gap='2'>
                        <Button onClick={logout} colorScheme='red'>Log out</Button>
                    </ButtonGroup>
            </Flex>
        </Container>
    </>
    );
  }

export default Header;
