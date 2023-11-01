import { Link } from 'react-router-dom';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";  

function TravelerTable() {

    const { data: traData } = useQuery(
        ["traData"],
        async () => {
            const response = await makeRequest.get(`/admin/travD`);
            return response.data;
        }
    );

  return(
    <div className="table">
        <div className="user_table">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th className='icon'>Profile</th>
                </tr>
                {traData && traData.map((row) => (
                    <tr key={row.id}>
                        <td>{row.firstname}</td>
                        <td>{row.contact_no}</td>
                        <td>{row.email}</td>
                        <td className='icon'>
                            <Link to='/userprofile?id=user_id' className='link'>
                                <span class="material-icons">
                                    visibility
                                </span>
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    </div>
  );
}

export default TravelerTable;