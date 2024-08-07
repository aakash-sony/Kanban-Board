import React, { useState, useContext } from "react";
import { BoardContext } from "./Board";
import { Card } from "react-bootstrap";
import TaskForm from "./NewTask/TaskForm";

function CardItem(props) {
    return (
        <>
            <Card key={props.task.id} className="card-task">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        {props.task.title}
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

