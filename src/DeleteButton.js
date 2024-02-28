import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function DeleteButton({id, action}) {

    const handlClick = () => {
      action(id)
    }

    return (
    <>
        <IconButton onClick={handlClick} colorScheme='teal' aria-label='Delete task' icon={<DeleteIcon />}/>
    </>
    );
  }

export default DeleteButton;
