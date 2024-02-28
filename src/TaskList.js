import { Flex, Heading, Spacer} from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import DeleteButton from './DeleteButton';
import { useEffect } from "react";

function TaskList({tasks, fetchTasks}) {

    const deteleTask = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        }).then(response => response.json()).then(data => {
            fetchTasks()
        });
    }

    return (
    <>
        <TableContainer>
            <Heading>Task list</Heading>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Title</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {tasks ? tasks.map((task,index) => {

                            return (<Tr key={task.task_id}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    {task.title}
                                </Td>
                                <Td >
                                    <Flex>
                                        <Spacer />
                                        <DeleteButton id={task.task_id} action={deteleTask}/>
                                    </Flex>
                                </Td>
                            </Tr>)
                    }): "You dont have any task yet." }

                </Tbody>
            </Table>
        </TableContainer>
    </>
    );
  }

export default TaskList;
