import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

function UpdateProd() {

    const [data, setData] = useState([]);
    const [revision, setRevision] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wasteper, setWastePer] = useState("");
    const [laborper, setLabourPer] = useState("");
    const [equipment, setEquipment] = useState("");
    const [otherper, setOtherPer] = useState("");
    const [marginper, setMarginper] = useState("");
    let user = JSON.parse(localStorage.getItem('user-info'))
    const params = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        let result = await fetch("http://localhost:8000/api/product/" + params.id);
        result = await result.json();
        setData(result)
        setRevision(result.revision)
        setName(result.name)
        setDescription(result.description)
        setQuantity(result.quantity)
        setWastePer(result.waste_percentage)
        setLabourPer(result.labour_percentage)
        setEquipment(result.equipment_cost)
        setOtherPer(result.other_percentage)
        setMarginper(result.margin_percentage)
    }

    async function update_prod(id) {
        const formData = new FormData();
        formData.append('revision', (revision + 1))
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('waste_percentage', wasteper);
        formData.append('labour_percentage', laborper);
        formData.append('equipment_cost', equipment);
        formData.append('other_percentage', otherper);
        formData.append('margin_percentage', marginper);
        formData.append('modified_by', user.name);
        let result = await fetch("http://localhost:8000/api/updateproduct/" + id + "?_method=PUT", {
            method: 'POST',
            body: formData
        })
        alert("Product has been updated")
    }
    return (
        <div>
            <Header />
            <div>
                <h2 style={{ marginTop: 25 }}>{t('AddUpProd.UpdateProd')}</h2>
                <div className="col-sm-6 offset-sm-3">
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Name')}</p>
                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} defaultValue={data.name} placeholder={t('AddUpProd.Name')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Description')}</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} defaultValue={data.description} placeholder={t('AddUpProd.Description')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Quantity')}</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} defaultValue={data.quantity} placeholder={t('AddUpProd.Quantity')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Waste%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setWastePer(e.target.value)} defaultValue={data.waste_percentage} placeholder={t('AddUpProd.Waste%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Labor%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setLabourPer(e.target.value)} defaultValue={data.labour_percentage} placeholder={t('AddUpProd.Labor%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Equip')}</p>
                    <input type="text" className='form-control' onChange={(e) => setEquipment(e.target.value)} defaultValue={data.equipment_cost} placeholder={t('AddUpProd.Equip')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Other%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setOtherPer(e.target.value)} defaultValue={data.other_percentage} placeholder={t('AddUpProd.Other%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Margin%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setMarginper(e.target.value)} defaultValue={data.margin_percentage} placeholder={t('AddUpProd.Margin%')} />
                    <br />
                    <button style={{ marginBottom: 15 }} onClick={() => update_prod(data.id) && navigate('/')} className='btn btn-primary'>{t('AddUpProd.UpdateProd')}</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProd