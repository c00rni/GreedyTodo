import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast
} from "@chakra-ui/react";

function SignUpPage() {
    const toast = useToast()

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                username: "",
                password: "",
                secondPassword: ""
              }}
              onSubmit={async (values, { resetForm }) => {

                const userCreationPromise = fetch("http://localhost:5000/api/users", {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(values)
                }).then(response => {
                    if (response.status == 200){
                        toast({
                            title: 'User created.',
                            description: "We've created your account for you.",
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          });
                    }
                    else {
                        toast({
                            title: 'User not created.',
                            description: "The user could not be created.",
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          });
                    }
                });
                resetForm();
            }}
            >
              {({ handleSubmit, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field
                        as={Input}
                        name="username"
                        type="text"
                        variant="filled"
                      />
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="text"
                        variant="filled"
                        validate={(value) => {
                          let error;
                          if (value.length < 6) {
                            error = "Password must contain at least 6 characters";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.secondPassword && touched.secondPassword}>
                      <FormLabel htmlFor="secondPassword">Confirm password</FormLabel>
                      <Field
                        as={Input}
                        name="secondPassword"
                        type="text"
                        variant="filled"
                        validate={(value) => {
                          let error;
                          if (!(values.password.toLowerCase() === value.toLowerCase())) {
                            error = "The passwords aren't the same";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.secondPassword}</FormErrorMessage>
                    </FormControl>
                    <Button type="Sign up" colorScheme="teal" width="full">
                      Sign up
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
    );
}

export default SignUpPage;