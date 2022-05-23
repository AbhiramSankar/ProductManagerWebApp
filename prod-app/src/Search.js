import Header from './Header'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';


function Search() {

    const [searchData, setSearchData] = useState([]);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    async function deleteOp(id) {
        let result = await fetch("http://localhost:8000/api/deleteproduct/" + id, {
            method: 'DELETE'
        })
        result = await result.json();
    }


    function updateOp(id) {
        navigate('/update/' + id)
    }

    async function search(key) {
        let result = await fetch("http://localhost:8000/api/searchproduct/" + key);
        result = await result.json();
        setSearchData(result)
    }

    function material(id) {
        navigate('/material/' + id)
    }

    return (
        <div>
            <Header />
            <div>
            <h2 style={{marginTop:25}}>{t('BoQ.Search')}</h2>
                <div className="col-sm-4 offset-sm-4">
                    <input type="text" onChange={(e) => search(e.target.value)} placeholder={t('BoQ.Search')} className="form-control" />
                </div>
                <br />
                <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>{t('BoQ.ID')}</th>
                            <th>{t('BoQ.Name')}</th>
                            <th>{t('BoQ.Description')}</th>
                            <th>{t('BoQ.PCost')}</th>
                            <th>{t('BoQ.Quantity')}</th>
                            <th>{t('BoQ.Actions')}</th>
                            <th>{t('BoQ.TCost')}</th>
                        </tr>
                        </thead>
                        {
                            searchData.map((item) =>
                            <tbody>
                                {
                                item.deleted == 0?
                                <>
                                <tr>
                                
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.sub_total}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <div>
                                        <Button style={{marginBottom: 5}} onClick={() => material(item.id)} variant="primary">{t('BoQ.View')}</Button>{" "}
                                        <Button style={{marginBottom: 5}} onClick={() => updateOp(item.id)} variant="warning">{t('BoQ.Update')}</Button>{" "}
                                        <Button style={{marginBottom: 5}} onClick={() => deleteOp(item.id)} variant="danger">{t('BoQ.Delete')}</Button></div>
                                </td>
                                <td>{item.amount}</td>
                            </tr>
                                </>:<></>
                                }
                                </tbody>

                            )
                        }
                    </Table>
                </div>

            </div>
        </div>
    )
}

export default Search