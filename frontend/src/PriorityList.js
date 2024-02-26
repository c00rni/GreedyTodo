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

function PriorityList() {
    return (
    <>
        <TableContainer>
            <Heading>Task list</Heading>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Priority Rank</Th>
                    <Th>Person Name</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>1</Td>
                    <Td>
                        Pouyanne
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
                    <Td>Morgan</Td>
                    <Td>
                        <Flex>
                            <Spacer />
                            <DeleteButton />
                        </Flex>
                    </Td>
                </Tr>
                <Tr>
                    <Td>3</Td>
                    <Td>Clautaire</Td>
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

export default PriorityList;
