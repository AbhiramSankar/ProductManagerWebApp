import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

function UpdateMat() {

    const [data, setData] = useState([]);
    const [revision, setRevision] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");
    let user = JSON.parse(localStorage.getItem('user-info'))
    const params = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    useEffect(() => {
        fetchData();
    },[])

    async function fetchData() {
        let result = await fetch("http://localhost:8000/api/productmat/" + params.id);
        result = await result.json();
        setData(result)
        setRevision(result.revision)
        setDescription(result.description)
        setQuantity(result.quantity)
        setRate(result.rate)
    }


    async function update_prod(id) {
        const formData = new FormData();
        formData.append('revision', revision+1);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('rate', rate);
        formData.append('amount', (quantity*rate));
        formData.append('modified_by', user.name);
        let result = await fetch("http://localhost:8000/api/updateproductmat/" + id + "?_method=PUT", {
            method: 'POST',
            body: formData
        })
        alert("Product has been updated")
    }
    return (
        <div>
            <Header />
            <div>
            <h2 style={{marginTop:25}}>{t('AddUpMat.UpdateMat')}</h2>
                <div className="col-sm-6 offset-sm-3">
                <br/>
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Description')}</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} defaultValue={data.description} placeholder={t('AddUpMat.Description')} />
                    <br/>
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Quantity')}</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} defaultValue={data.quantity} placeholder={t('AddUpMat.Quantity')} />
                    <br/>
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Rate')}</p>
                    <input type="text" className='form-control' onChange={(e) => setRate(e.target.value)} defaultValue={data.rate} placeholder={t('AddUpMat.Rate')} />
                    <br/>
                    <button onClick={() => update_prod(data.id) && navigate('/material/' + data.product_id)} className='btn btn-primary'>{t('AddUpMat.UpdateMat')}</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateMat