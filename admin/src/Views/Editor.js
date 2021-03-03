import React, { useState,useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Row, Col, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import { Storage } from 'aws-amplify';

Storage.configure({
  level: 'public',
  customPrefix: {
      public: 'hugo/'
  }
})

const Editor = () => {

  const { file } = useParams();
  const [fileName, setFileName] = useState(file);
  const [markdown, setMarkdown] = useState('');

  const getFile = async () => {
    try {
      const data = await Storage.get(`content/posts/${file}`, { download: true });
      setMarkdown(data.Body.toString())
    } catch (err) {
      console.log(err)
    }
  }

  const saveFile = async () => {
    try {
      const data = await Storage.put(`content/posts/${file}`, markdown, {
        level: 'public',
        contentType: 'text/plain'
      });
      alert('file saved')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFile()
  },[])
 
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
        autoFocus={false}
        height={600}
      />

    </div>
  );
}

export default Editor;
