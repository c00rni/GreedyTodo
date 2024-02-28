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

function PriorityList({priorities, fetchPersonnes}) {

    const detelePersonne = async (id) => {
        await fetch(`http://localhost:5000/api/personnes/${id}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        }).then(response => response.json()).then(data => {
            fetchPersonnes()
        });
    }

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
                    {priorities ? priorities.map((priorities, index) => {
                        return (
                            <Tr key={priorities.personne_id}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    {priorities.fullname}
                                </Td>
                                <Td >
                                    <Flex>
                                        <Spacer />
                                        <DeleteButton id={priorities.personne_id} action={detelePersonne}/>
                                    </Flex>
                                </Td>
                            </Tr>
                        )
                    }): "You dont have any assign personn."}

                </Tbody>
            </Table>
        </TableContainer>
    </>
    );
  }

export default PriorityList;
