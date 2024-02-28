import { Heading, Spacer, ButtonGroup, Flex, Input, Button } from "@chakra-ui/react"
import { object, string, number } from 'yup';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea
  } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

function CreatePriority({cancel, fetchPersonnes}) {

    const cancelCreation = () =>{
        cancel()
    }

    return (
      <Formik
        initialValues={{ fullName: '', description: '', priorityRank: 0}}
        validationSchema = {object({
          fullName: string().required("Required"),
          description: string().optional(),
          priorityRank: number().required("Required").integer()
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values))
          await fetch("http://localhost:5000/api/personnes", {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
              },
              body: JSON.stringify(values)
          }).then(response => response.json()).then(() => {
              fetchPersonnes()
          });
          setSubmitting(false);
          resetForm();
      }}
      >
        {(props) => (
          <Form>
            <Heading>Create priority</Heading>
            <Field name='fullName'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                  <FormLabel>Full Name</FormLabel>
                  <Input {...field} placeholder='Name of the priority' />
                  <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
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
            <Field name='priorityRank'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.priorityRank && form.touched.priorityRank}>
                    <FormLabel>Priority</FormLabel>
                    <NumberInput {...field} defaultValue={1} onChange={(val) => form.setFieldValue(field.name, parseInt(val))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                  <FormErrorMessage>{form.errors.priorityRank}</FormErrorMessage>
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
