import { Card } from "react-bootstrap";

function CardItem(props) {
    return (
        <>
            <Card key={props.task.id} className="card-task">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center" style={{ fontSize: '14px', lineHeight: '1.1em' }}>
                        Test-000{props.task.id}
                    </Card.Title>
                    <Card.Title className="d-flex justify-content-between align-items-center" style={{ fontSize: '16px', lineHeight: '1.1em' }}>
                        {props.task.title}
                    </Card.Title>
                    <Card.Text className="card-text" style={{ fontSize: '14px', lineHeight: '1.1em' }}>
                        {props.task.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardItem;

