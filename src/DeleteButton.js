import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function DeleteButton() {
    return (
    <>
        <IconButton colorScheme='teal' aria-label='Delete task' icon={<DeleteIcon />}/>
    </>
    );
  }

export default DeleteButton;
