import { Input, VStack, InputRightElement, InputGroup, Button, HStack, AbsoluteCenter, Center} from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Logo from "./Logo";

function LoginPage() {

    const [show, setShow] = useState(false);
    const isSubmitting = false;

    const handleClick = (event) => {
        setShow(!show)
    }

    function validateName(value) {
        let error
        if (!value) {
          error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
          error = "Jeez! You're not a fan 😱"
        }
        return error
    }

    return (
    <>
        <AbsoluteCenter axis='both'>
            <VStack alignItems="start" gap={16}>
                <Logo size="6xl"/>
                <Center display="flex" w="100%">
                    <Formik
                    initialValues={{ username: '', password:'' }}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                        }, 1000)
                    }}
                    >
                        <Form >
                            <Field name='username' validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel>Username</FormLabel>
                                    <Input {...field} placeholder='Username' />
                                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='password' validate={validateName}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <HStack justifyContent="end" mt={5}>
                                <ChakraLink as={ReactRouterLink} to='/a/signup' textAlign="end">
                                    Sign up
                                </ChakraLink>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={isSubmitting}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </HStack>
                        </Form>
                    </Formik>
                </Center>

            </VStack>
        </AbsoluteCenter>
    </>
    );
  }

export default LoginPage;
