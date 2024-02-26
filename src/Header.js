import { Flex, Spacer, Box, Button, ButtonGroup, Container} from '@chakra-ui/react';
import Logo from './Logo';

function Header() {
    return (
    <>
        <Container maxW="container.xl">
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <Box p='2'>
                        <Logo size="4xl"/>
                    </Box>
                    <Spacer />
                    <ButtonGroup gap='2'>
                        <Button colorScheme='red'>Log out</Button>
                    </ButtonGroup>
            </Flex>
        </Container>
    </>
    );
  }

export default Header;
