import { Input, VStack, InputRightElement, InputGroup, Button, HStack, AbsoluteCenter, Center} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
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
    const [isSubmitting, setIsSumitting] = useState(false);
    const [completedForm, setCompletedForm] = useState(false);
    const [values, setValues] = useState({ username: '', password:'' })
    const isAuthenticated = localStorage.getItem("accessToken") ? true : false;
    const navigate = useNavigate();

    const handleClick = (event) => {
        setShow(!show)
    }

    const handleChange = (event) => {
        setValues(() => ({
            ...values,
            [event.target.name]: event.target.value
        }));
        if (values.password !== "" && values.username !== "") {
            setCompletedForm(true)
        }
        else {
            setCompletedForm(false)
        }
    }

    return (
    <>
        {isAuthenticated ?
        <AbsoluteCenter axis='both'>
        <VStack alignItems="start" gap={16}>
            <Logo size="6xl"/>
            <Center display="flex" w="100%">
                <Formik
                initialValues={values}
                onSubmit={async () => {
                    setIsSumitting(true)
                    await fetch("http://localhost:5000/api/login", {
                        mode: 'cors',
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(values)
                    }).then(response => response.json()).then(data => {
                        if (data.access_token){
                            localStorage.setItem("accessToken", data.access_token);
                            navigate("/mylist");
                        }
                    });
                    setIsSumitting(false)
                }}
                >
                    <Form >
                        <Field name='username'>
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.username}>
                                <FormLabel>Username</FormLabel>
                                <Input {...field} value={values.username} onChange={handleChange} placeholder='Username' />
                            </FormControl>
                            )}
                        </Field>
                        <Field name='password'>
                            {({ field, form }) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        {...field}
                                        value={values.password}
                                        onChange={handleChange}
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
                                isDisabled={completedForm ? false : true}
                                isLoading={isSubmitting}
                                type='submit'
                            >
                                Log in
                            </Button>
                        </HStack>
                    </Form>
                </Formik>
            </Center>

        </VStack>
    </AbsoluteCenter> : navigate("/mylist")
        }
    </>
    );
  }

export default LoginPage;
