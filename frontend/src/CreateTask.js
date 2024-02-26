import { Heading, Spacer, ButtonGroup, Flex, Select, Textarea, Input, Button } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { Field, Form, Formik, } from 'formik';

function CreateTask({cancel}) {
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
        initialValues={{ title: '', description: '', priority: null}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Heading>Add a task</Heading>
            <Field name='title' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.tilte}>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder='Title of the task' />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='description' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} placeholder='Description of the task' />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='priority' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.priority && form.touched.priority}>
                  <FormLabel>Priority</FormLabel>
                    <Select placeholder='Select priority'>
                        <option value='person 1'>Personne 1</option>
                        <option value='person 2'>Personne 2</option>
                        <option value='person 3'>Personne 3</option>
                    </Select>
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
                    Submit
                    </Button>
                </ButtonGroup>
            </Flex>
          </Form>
        )}
      </Formik>
    )
  }

export default CreateTask;
