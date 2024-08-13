import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import TaskForm from "./TaskForm";

const initialValues = {
    title: "",
    description: ""
};

function NewTask(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (values, submitProps) => {
        submitProps.setSubmitting(false);
        props.addNewTask(values);
        setShow(false);
        submitProps.resetForm();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        props.onSearch(searchQuery);
    };

    return (
        <>
            <div className="task-header d-flex justify-content-between align-items-center flex-wrap">
                <Button variant="primary" onClick={handleShow} className="mb-2" style={{ marginLeft: '58px' }}>
                    Add New Task
                </Button>
                <InputGroup className="search-container mb-2" style={{ width: 'auto' }}>
                    <Form.Control
                        type="text"
                        placeholder="Search by Title"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: '140px', marginRight: '5px', borderRadius: '5px' }}
                    />
                    <Button variant="btn btn-success" type="submit" onClick={handleSearchClick}
                        className="search-button" style={{ borderRadius: '5px', marginRight: '58px' }}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            <TaskForm
                taskState="New"
                show={show}
                handleClose={handleClose}
                initialValues={initialValues}
                onSubmit={onSubmit}
            />
        </>
    );
}

export default NewTask;

