import { Heading, Spacer, ButtonGroup, Flex, Select, Textarea, Input, Button } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { Field, Form, Formik, } from 'formik';
import { object, string} from 'yup';

function CreateTask({cancel, priorities, fetchTasks}) {

    const cancelCreation = () => {
        cancel()
    }

    return (
      <Formik
        initialValues={{ title: '', description: '', priority: ''}}
        validationSchema = {object({
          title: string().required("Required"),
          description: string(),
          priority: string().optional()
      })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await fetch("http://localhost:5000/api/tasks", {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
              },
              body: JSON.stringify(values)
          }).then(response => response.json()).then(() => {
              fetchTasks()
          });
          setSubmitting(false);
          resetForm();
      }}
      >
        {(props) => (
          <Form>
            <Heading>Add a task</Heading>
            <Field name='title'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.title}>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder='Title of the task' />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='description'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} placeholder='Description of the task' />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='priority'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.priority && form.touched.priority}>
                  <FormLabel>Priority</FormLabel>
                    <Select {...field} placeholder='Select priority'>
                        {priorities.map((priority) => <option key={priority.personne_id} value={priority.fullname}>{priority.fullname}</option>)}
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
                    Create
                    </Button>
                </ButtonGroup>
            </Flex>
          </Form>
        )}
      </Formik>
    )
  }

export default CreateTask;
