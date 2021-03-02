import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Row, Col, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';

/**
 * get file body
 * save file
 */

const data = {
  Body:'foo  foo'

}

function Editor() {

  const { file } = useParams();
  const [fileName, setFileName] = useState(data.Key);
  const [markdown, setMarkdown] = useState(data.Body);

  
  const saveFile = () => {
    console.log(fileName)
  }
 
  return (
    <div>

      <Row className="mb-3">
        <Col sm={9}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>File Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl defaultValue={file} onChange={e => setFileName(e.target.value)} />
          </InputGroup>
        </Col>
        <Col className="tools" sm={3}>
          <ButtonGroup>
            <Button variant="link"><Link to="/">cancel</Link></Button>
            <Button onClick={saveFile} variant="link">save</Button>
          </ButtonGroup>
        </Col>
      </Row>
    
      <MDEditor
        value={markdown}
        onChange={setMarkdown}
      />

    </div>
  );
}

export default Editor;
