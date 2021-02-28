
import React from "react";
import MDEditor from '@uiw/react-md-editor';


function App() {
  
  const [value, setValue] = React.useState("**Hello world!!!**");

  return (
    <div>
      <div className="container">
        <MDEditor
          value={value}
          onChange={setValue}
        />
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
  
}

export default App;
