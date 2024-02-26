import { Heading, Spacer, ButtonGroup, Flex, Input, Button } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { Field, Form, Formik, } from 'formik';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

function CreatePriority({cancel}) {
    function validateName(value) {
      let error
      if (!value) {
        error = 'Name is required'
      } else if (value.toLowerCase() !== 'naruto') {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }

    const cancelCreation = () =>{
        cancel()
    }

    return (
      <Formik
        initialValues={{ fullName: '', priorityRank: 0}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Heading>Create priority</Heading>
            <Field name='fullName' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                  <FormLabel>Full Name</FormLabel>
                  <Input {...field} placeholder='Name of the priority' />
                  <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='priority' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.priority && form.touched.priority}>
                    <FormLabel>Priority</FormLabel>
                    <NumberInput {...field}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                  <FormErrorMessage>{form.errors.priority}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justifySelf="end">
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='red' mt={4} onClick={cancelCreation}>Cancel</Button>
                    <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                    >
                    Create priority
                    </Button>
                </ButtonGroup>
            </Flex>
          </Form>
        )}
      </Formik>
    )
  }

export default CreatePriority;
