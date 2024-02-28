import { useState } from "react";
import Header from "./Header";
import { Flex, Center, TabPanels, TabPanel, TabList, Tab, Tabs, Button} from '@chakra-ui/react'
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import CreatePriority from "./CreatePriority";
import PriorityList from "./PriorityList";
import { useEffect } from "react";

function LandingPage() {

    const [isAddingTask, setIsAddingTask] = useState(false)
    const [isAddingPriority, setIsAddingPriority] = useState(false)
    const [personnes, setPersonnes] = useState([])
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        setIsAddingPriority(false)
        setIsAddingTask(!isAddingTask)
    }

    const addPriority = () => {
        setIsAddingTask(false)
        setIsAddingPriority(!isAddingPriority)
    }

    const fetchTasks = async () => {
        await fetch("http://localhost:5000/api/tasks", {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        }).then(response => response.json()).then(data => {
            setTasks(data["tasks"])
        });
    }

    const fetchPersonnes = async () => {
        await fetch("http://localhost:5000/api/personnes", {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        }).then(response => response.json()).then(data => {
            setPersonnes(data["personnes"])
        });
    }

    useEffect (() => {
        fetchPersonnes()
    }, []);

    useEffect (() => {
        fetchTasks()
    }, []);

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
                            {!isAddingTask ? <Button mb={4} onClick={addTask} colorScheme='teal'>Add task</Button> : <CreateTask priorities={personnes} fetchTasks={fetchTasks} cancel={addTask}/>}
                            <TaskList tasks={tasks} fetchTasks={fetchTasks}/>
                        </TabPanel>
                        <TabPanel>
                            {!isAddingPriority ? <Button mb={4} onClick={addPriority} colorScheme='teal'>Add priority</Button> : <CreatePriority fetchPersonnes={fetchPersonnes} cancel={addPriority}/>}
                            <PriorityList priorities={personnes} fetchPersonnes={fetchPersonnes}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>
        </Flex>
    </>
    );
  }

export default LandingPage;
