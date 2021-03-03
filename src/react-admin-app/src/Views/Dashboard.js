import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Storage } from 'aws-amplify';

Storage.configure({
  level: 'public',
  customPrefix: {
      public: 'hugo/'
  }
})
/**
 * get file list
 * delete file (modal) > confirm > delete >refresh
 */
const deleteFile = () => {
  alert('del')
}

const Dashboard = () => {

  const [files, setFiles] = useState([])

  const getFiles = async () => {
    try {
      const data = await Storage.list('content/posts/');
      data.forEach(obj => {
        obj.key = obj.key.split('/').pop()
      })
      setFiles(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFiles()
  },[])

  const fileList = files.map((file) =>
    <ListGroup.Item key={file.eTag}>
      <Row>
        <Col>{file.key}</Col>
        <Col className="tools">
          <Link to={"/editor/" + file.key}><FontAwesomeIcon size="sm" icon={faEdit} /></Link>
          |
          <a href="/" className="del" onClick={deleteFile}><FontAwesomeIcon size="sm" icon={faTrashAlt} /></a>
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
