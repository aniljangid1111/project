import React from 'react'

export default function FormData({ userInfo, setUserInfo }) {

    const deleteData = (i) => {
        if (confirm("Are you sure to Delete your Data!!")) {
            userInfo.splice(i, 1)
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            const getData = localStorage.getItem('user_info');
            const user = JSON.parse(getData);
            setUserInfo(user)
        }
    }



    return (
        <>
            <div className="table-container">
                <h2>User Data</h2>
                <table id="data-table" border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody id="fetch-data">

                        {
                            userInfo.length > 0
                            ?
                            userInfo.map((v, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{v.name}</td>
                                        <td>{v.email}</td>
                                        <td>{v.mobileNo}</td>
                                        <td>{v.country}</td>
                                        <td>{v.state}</td>
                                        <td><button onClick={deleteData}>Delete</button></td>
                                    </tr>
                                )
                            })

                            :

                            <tr id='noData'>
                                <td colSpan={7}>No Record Found...</td>
                            </tr>

                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
