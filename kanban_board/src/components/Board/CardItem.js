import React, { useState, useContext } from "react";
import { BoardContext } from "./Board";
import { Card } from "react-bootstrap";
import TaskForm from "./NewTask/TaskForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const initialEditedValues = {
    title: "",
    description: "",
}

function CardItem(props) {
    const [show, setShow] = useState(false);
    const [editedValues, setFormValues] = useState(initialEditedValues);
    const { taskState, onDeletingTask, onUpdatingTask } = useContext(BoardContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clickHandler = (type) => {
        if (type === "edit") {
            var formValues = taskState.find((task) => {
                return task.id === props.task.id;
            });
            setFormValues(formValues);
            handleShow();
        } else if (type === "delete") {
            onDeletingTask(props.task.id);
        }
    };

    const handleUpdate = (values, submitProps) => {
        submitProps.setSubmitting(false);
        onUpdatingTask(values);
        setShow(false);
        submitProps.resetForm();
    };

    return (
        <>
            <TaskForm
                editedValues={editedValues}
                taskState="Update"
                show={show}
                handleClose={handleClose}
                onSubmit={handleUpdate}
            />
            <Card key={props.task.id} className="card-task">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        {props.task.title}
                        <div className="card-task-option">
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="mx-2"
                                onClick={() => clickHandler("edit")}
                                style={{ cursor: 'pointer', width: '16px' }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="mx-2"
                                onClick={() => clickHandler("delete")}
                                style={{ cursor: 'pointer', width: '14px' }}
                            />
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {props.task.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardItem;

