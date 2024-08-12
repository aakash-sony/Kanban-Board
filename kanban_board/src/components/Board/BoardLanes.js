import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "./Board";
import Lane from "./Lane";

function BoardLanes(props) {
    const {
        onDragOverHandler,
        onDropHandler,
        onTaskContainerDragStartHandler,
        onTaskContainerDropHandler,
        onTaskContainerDragOverHandler,
    } = useContext(BoardContext);
    const [divWidth, setDivWidth] = useState(0);

    useEffect(() => {
        const totalWidth = props.stages.length * 292 + (props.stages.length - 1) * 20;
        setDivWidth(totalWidth);
    }, [props.stages.length]);

    useEffect(() => {
        console.log(props.tasks, 'props.tasks');
    }, [props.tasks])

    return (
        <div className="column-wrapper d-flex justify-content-center">
            <div style={{ width: divWidth, display: 'flex', margin: '0 auto' }}>
                {props.stages.map((stage, index) => (
                    <div
                        key={index}
                        className="card-column"
                        onDragStart={(event) =>
                            onTaskContainerDragStartHandler(event, stage.id)
                        }
                        onDragOver={(event) => onTaskContainerDragOverHandler(event)}
                        onDrop={(event) => onTaskContainerDropHandler(event, stage.id)}
                        style={{ marginRight: index !== props.stages.length - 1 ? '20px' : '0' }}
                    >
                        <div id="task-card" className="card bg-light">
                            <div className="card-header stage-header">
                                <h6 className="card-title py-2" style={{ fontSize: '18px' }}>
                                    {stage.name}
                                </h6>
                            </div>
                            <div
                                className="card-body"
                                onDrop={(event) => onDropHandler(event, stage.id)}
                                onDragOver={(event) => onDragOverHandler(event)}
                            >
                                <Lane stage={stage} tasks={props.tasks.filter(task => task.stage === stage.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardLanes;
