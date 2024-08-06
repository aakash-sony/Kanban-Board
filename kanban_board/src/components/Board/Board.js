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
const taskData = [
];

export const BoardContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "ON_DROP":
            const droppedTask = action.payload;
            const updatedTasks = state.map((task) => {
                if (task.id === droppedTask.id) {
                    return droppedTask;
                }
                return task;
            });
            return updatedTasks;
        case "LOAD_DATA":
            return action.payload;
        case "ADD_NEW":
            return [...state, action.payload];
        case "ON_DELETE":
            return state.filter((task) => task.id !== action.payload);
        default:
            return state;
    }
}
function Board() {
    const [taskState, dispatch] = useReducer(reducer, taskData);
    const [stages, setStage] = useState(stagesData);

    useEffect(() => {
        dispatch({ type: "LOAD_DATA", payload: taskState });
    }, [taskState, stages]);

    const onDragStartHandler = (event, taskId, stageId) => {
        var data = {
            taskId: taskId,
            stageId: stageId
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(data));
        event.dataTransfer.effectAllowed = "move";
        //event.dataTransfer.setData("taskName", taskName);
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

    const onTaskContainerDropHandler = (event, droppedLaneId) => {
        // let fromLane: any = JSON.parse(event.dataTransfer.getData("laneId"));
        // swapStages(fromLane.laneId, droppedLaneId)
    };

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

    const onUpdatingTask = (dataFromChild) => {
        console.log(dataFromChild);
        dispatch({ type: "ON_DROP", payload: dataFromChild });
    };

    const onDeletingTask = (taskId) => {
        dispatch({ type: "ON_DELETE", payload: taskId });
    };

    const ContextData = {
        taskState,
        onDragStartHandler,
        onDragOverHandler,
        onDropHandler,
        onUpdatingTask,
        onDeletingTask,
        onTaskContainerDragStartHandler,
        onTaskContainerDropHandler,
        onTaskContainerDragOverHandler
    };

    return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col-12">
                    <NewTask addNewTask={onAddingNewTask} />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <BoardContext.Provider value={ContextData}>
                        <BoardLanes stages={stages}></BoardLanes>
                    </BoardContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default Board;
