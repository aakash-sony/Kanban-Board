import React, { useState, useEffect, useReducer, createContext } from "react";
import NewTask from "./NewTask/NewTask";
import BoardLanes from "./BoardLanes";
import "./Board.css";

const stagesData = [
    { name: "To Do", id: 1 },
    { name: "In Progress", id: 2 },
    { name: "Peer Review", id: 3 },
    { name: "Done", id: 4 },
];

const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

export const BoardContext = createContext({});

function reducer(state, action) {
    let updatedTasks;
    switch (action.type) {
        case "ON_DROP":
            const droppedTask = action.payload;
            updatedTasks = state.map((task) => {
                if (task.id === droppedTask.id) {
                    return droppedTask;
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        case "LOAD_DATA":
            return action.payload;
        case "ADD_NEW":
            updatedTasks = [...state, action.payload];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        default:
            return state;
    }
}

function Board() {
    const [taskState, dispatch] = useReducer(reducer, initialTasks);
    const [stages, setStage] = useState(stagesData);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            dispatch({ type: "LOAD_DATA", payload: savedTasks });
        }
    }, []);

    const onDragStartHandler = (event, taskId, stageId) => {
        var data = { taskId: taskId, stageId: stageId };
        event.dataTransfer.setData("text/plain", JSON.stringify(data));
        event.dataTransfer.effectAllowed = "move";
    };

    const onTaskContainerDragStartHandler = (event, laneId) => {
        let fromBox = JSON.stringify({ laneId: laneId });
        event.dataTransfer.setData("laneId", fromBox);
    };

    const onTaskContainerDragOverHandler = (event) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
        }
    };

    const onTaskContainerDropHandler = (event, laneId) => { };

    const onDragOverHandler = (event) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
        }
    };

    const onDropHandler = (event, droppedStageId) => {
        let droppedData = event.dataTransfer.getData("text/plain");
        droppedData = JSON.parse(droppedData);
        const filterTask = taskState.filter((x) => x.id === droppedData.taskId);
        filterTask[0].stage = droppedStageId;
        dispatch({ type: "ON_DROP", payload: filterTask[0] });
    };

    const onAddingNewTask = (dataFromChild) => {
        dataFromChild.stage = 1;
        dataFromChild.id = taskState.length + 1;
        dispatch({ type: "ADD_NEW", payload: dataFromChild });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredTasks = taskState.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ContextData = {
        taskState,
        onDragStartHandler,
        onDragOverHandler,
        onDropHandler,
        onTaskContainerDragStartHandler,
        onTaskContainerDropHandler,
        onTaskContainerDragOverHandler
    };

    return (
        <div className="container-fluid pt-">
            <div className="row">
                <div className="col-12">
                    <NewTask addNewTask={onAddingNewTask} handleSearch={handleSearch} searchQuery={searchQuery} />
                </div>
            </div>
            <hr />
            <div className="row-12">
                <div className="col-12">
                    <BoardContext.Provider value={ContextData}>
                        <BoardLanes stages={stages} tasks={filteredTasks}></BoardLanes>
                    </BoardContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default Board;
