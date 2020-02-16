import React from 'react';
import Table from 'react-bootstrap/Table';

class Dashboard extends React.Component {
 
      render() {    
        
        return (
            <div>
                <Table bordered hover>
                    <thead>
                        <tr>
                        <th>Ttitle</th>
                        <th>Create Data</th>
                        <th>Status</th>
                        <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Fish Curry</td>
                        <td>12/24/2020</td>
                        <td>Published</td>
                        <td>Fish, Curry, Thai</td>
                        </tr>
                        <tr>
                        <td>Fish Curry</td>
                        <td>12/24/2020</td>
                        <td>Published</td>
                        <td>Fish, Curry, Thai</td>
                        </tr>
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default Dashboard;