import React from 'react';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';


function handleEditorChange({text}) {    
    console.log(text)
  }

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getMarkdown = this.getMarkdown.bind(this);
      }

      getMarkdown = () => {
        if (this.mdEditor) {
          alert(this.mdEditor.getMdValue());
        }
      };
 
      render() { 
        
        return (
            <div>
                <button onClick={this.getMarkdown}>Save</button>

                <MdEditor
                    value=""
                    onChange={handleEditorChange}
                />
            

            </div>
        )
    }

}

export default Dashboard;