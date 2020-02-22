import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';


class Dashboard extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
            data:[],
            isLoading: true
        }
    };

    getItems = async () => {
        this.setState({data:[], isLoading:true});
        try {
            const data = await API.get('hugo', '/posts');
            this.setState({data:data, isLoading:false});
            if (data.length === 0 ) {
                this.setState({noData:true});
            }
        } catch (err) {
            alert(err);
        }
    };

    componentDidMount() { 
        this.getItems();
    }; 
 
    render() {
        
        const { data } = this.state;

        const tableBody = (
            <tbody  ref={this.tableBody} >
            {data.map(i => (
                <tr key={i.uuid}>
                    <td>{i.name}</td>
                    <td>{i.excerpt}</td>
                    <td>{i.date}</td>
                    <td className="td-center">
                        <Link to= {{ pathname:"/edit", state:{ uuid:i.uuid} }}>
                           -->
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        )
        
        return (
             <div>
                <div className="dash">
                    <Table borderless size="sm">
                        <thead>
                            <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        { tableBody }
                    </Table>
                </div>
            </div>
        )
    }

}

export default Dashboard;