import { useState } from "react";
import Header from "./Header";
import { Flex, Center, TabPanels, TabPanel, TabList, Tab, Tabs, Button} from '@chakra-ui/react'
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import CreatePriority from "./CreatePriority";
import PriorityList from "./PriorityList";

function LandingPage() {

    const [isAddingTask, setIsAddingTask] = useState(false)
    const [isAddingPriority, setIsAddingPriority] = useState(false)

    const addTask = () => {
        setIsAddingPriority(false)
        setIsAddingTask(!isAddingTask)
    }

    const addPriority = () => {
        setIsAddingTask(false)
        setIsAddingPriority(!isAddingPriority)
    }

    return (
    <>
        <Header/>
        <Flex justifyContent="space-around">
            <Center maxW="900px" mt={50} w="100%">
                <Tabs isFitted variant='enclosed'  w="100%">
                    <TabList mb='1em'>
                        <Tab>Todo List</Tab>
                        <Tab>Priority list</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {!isAddingTask ? <Button mb={4} onClick={addTask} colorScheme='teal'>Add task</Button> : <CreateTask cancel={addTask}/>}
                            <TaskList />
                        </TabPanel>
                        <TabPanel>
                            {!isAddingPriority ? <Button mb={4} onClick={addPriority} colorScheme='teal'>Add priority</Button> : <CreatePriority cancel={addPriority}/>}
                            <PriorityList />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>
        </Flex>
    </>
    );
  }

export default LandingPage;
