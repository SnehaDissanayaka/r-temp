import './contentCreators.scss';
//import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Pfp from '../../assets/images/pfp.jpg';

function ContentCreators() {
    const { data: conCreTable } = useQuery(
        ["conCreTData"],
        async () => {
            const response = await makeRequest.get(`/admin/conCreT`);
            return response.data;
        }
    );  

    return(
        <div className='creators-main'>
            <div className="creator_table">
                <table>
                    <tbody>
                        {conCreTable && conCreTable.map((row) => (
                            <tr key={row.user_id}>
                                <td>
                                    <img className="pfp" src= { Pfp } alt="loading error" />
                                </td>
                                <td>{row.firstname}</td>
                                <td>{row.badge_img}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContentCreators;