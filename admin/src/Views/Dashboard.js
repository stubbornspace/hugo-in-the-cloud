import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

/**
 * get file list
 * delete file (modal) > confirm > delete >refresh
 */

const files = [
  {
    Key: "Super-Fried-Chicken.md",
    LastModified: "12-2-2017",
  },
  {
    Key: "Fish-and-chips.md",
    LastModified: "12-2-2017",
  },
  {
    Key: "Bang-Bang-Chicken.md",
    LastModified: "12-2-2017",
  }
];

function Dashboard() {

  function deleteFile() {
    alert('del')
  }
  const fileList = files.map((f) =>
    <ListGroup.Item key={f.Key}>
      <Row>
        <Col>{f.Key}</Col>
        <Col className="tools">
          <span>{f.LastModified}</span> |
          <Link to={"/editor/"+f.Key}><FontAwesomeIcon size="sm" icon={faEdit} /></Link>
          |
          <a href="deleteFile" className="del" onClick={deleteFile}><FontAwesomeIcon size="sm" icon={faTrashAlt} /></a>
        </Col>
      </Row>
    </ListGroup.Item>
  );

  return (
    <div>
      <ListGroup>
        {fileList}

      </ListGroup>



    </div>
  );
}

export default Dashboard;
