import React from 'react';
import { Button, Modal, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { API } from 'aws-amplify';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';


class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			md:"",
			title:"",
			upload: false,
			publish: false
		};
		this.getPost = this.getPost.bind(this);
		this.handleMd = this.handleMd.bind(this);
	}

	getPost = async () => {

		try {
			if (this.props.location.state.uuid) {
				const data = await API.get('hugo', '/posts/'+this.props.location.state.uuid);
				this.setState({
					title: data.title,
					md: data.md
				});
				console.log(data.title)
			} else {
				console.log('new post')
			}
		} catch (err) {
            alert(err);
		}
	}

   closeModal = modal => {
   	this.setState({ [modal]: false })
   }

	openModal = modal => {
		this.setState({ [modal]: true })
	}

   handleMd = value => {
      this.setState({ md: value });
		console.log(value)
   };

   handleTitle = event => {
	this.setState({ title: event.target.value });
	  console.log(event.target.value)
 };

   createPost = () => {
   	alert(this.state.mdeValue);
   };

   componentDidMount() { 
		this.getPost();
	}; 
 
   render() {
        
   		return (
			<div className="editor">
				<Row>
					<Col>
						<InputGroup size="sm" className="mb-3">
							<InputGroup.Prepend>
							<InputGroup.Text id="title">Title</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								defaultValue={this.state.title}
								onChange={this.handleTitle}

							/>
						</InputGroup>
					</Col>
					<Col>
						<div className="tools">
							<Button size="sm" variant="link">Save</Button>
							<Button size="sm" variant="link" onClick={() => this.openModal("upload")}>Upload Image</Button>
						</div>
					</Col>
				</Row>
			
				<div className="editor">
					<SimpleMDE 
					onChange={this.handleMd}
					value={this.state.md}
					/>
				</div>

				<Modal show={this.upload} onHide={() => this.closeModal("upload")} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>Upload an image to S3</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button size="sm" variant="success">
							Save Changes
						</Button>
					</Modal.Footer>
					</Modal>

			</div>
      )
   }
}

export default Editor;