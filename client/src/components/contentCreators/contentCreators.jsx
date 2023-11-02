import './contentCreators.scss';
//import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Pfp from '../../assets/images/pfp.png';

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
                                <td>{row.firstname} {row.lastname}</td>
                                <td>
                                    <div className={`badge-circle ${row.badge_color}`}>
                                        <div className="circle-content white">
                                            <img className="badge-img" src={row.badge_img} alt={row.badge_name} />
                                        </div>
                                    </div>   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContentCreators;