import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';


class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			md:"",
			upload: false,
			publish: false
		};

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

   createPost = () => {
   	alert(this.state.mdeValue);
   };
 
   render() {

		const { md, save, publish, upload } = this.state;
        
   	return (
			<div>

				<div className="tools">
					<Button size="sm" variant="link">Save</Button>
					<Button size="sm" variant="link" onClick={() => this.openModal("publish")}>Publish</Button>
					<Button size="sm" variant="link" onClick={() => this.openModal("upload")}>Upload Image</Button>
				</div>
			
				<div className="editor">
					<SimpleMDE 
					onChange={this.handleMd}
					value={md}
					/>
				</div>

				<Modal show={upload} onHide={() => this.closeModal("upload")} animation={false}>
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