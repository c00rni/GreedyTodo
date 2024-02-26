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

function TaskList() {
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
                <Tr>
                    <Td>1</Td>
                    <Td>
                        Make Pouyanne proud
                    </Td>
                    <Td >
                        <Flex>
                            <Spacer />
                            <DeleteButton />
                        </Flex>
                    </Td>
                </Tr>
                <Tr>
                    <Td>2</Td>
                    <Td>FInish Morgan assigment</Td>
                    <Td>
                        <Flex>
                            <Spacer />
                            <DeleteButton />
                        </Flex>
                    </Td>
                </Tr>
                <Tr>
                    <Td>3</Td>
                    <Td>Finish france PLT</Td>
                    <Td>
                        <Flex>
                            <Spacer />
                            <DeleteButton />
                        </Flex>
                    </Td>
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </>
    );
  }

export default TaskList;
