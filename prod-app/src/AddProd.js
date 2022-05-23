import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function AddProd() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wasteper, setWastePer] = useState("");
    const [laborper, setLabourPer] = useState("");
    const [equipment, setEquipment] = useState("");
    const [otherper, setOtherPer] = useState("");
    const [marginper, setMarginper] = useState("");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    
    async function add_prod() {

        if (name && description && quantity && wasteper && laborper && equipment && otherper && marginper) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('waste_percentage', wasteper);
            formData.append('labour_percentage', laborper);
            formData.append('equipment_cost', equipment);
            formData.append('other_percentage', otherper);
            formData.append('margin_percentage', marginper);
            let result = await fetch("http://localhost:8000/api/addproduct", {
                method: 'POST',
                body: formData
            })
            if (name && description && quantity)
                alert("Product has been added."+"Please fill the Materials in View.")
            navigate("/")
        }
        else{
            alert("All fields are mandatory.")
        }

    }


    return (
        <div>
            <Header />
            <div>
                <h2 style={{marginTop:25}}>{t('AddUpProd.AddProd')}</h2>
                <div className="col-sm-6 offset-sm-3">
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Name')}</p>
                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder={t('AddUpProd.Name')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Description')}</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder={t('AddUpProd.Description')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Quantity')}</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} placeholder={t('AddUpProd.Quantity')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Waste%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setWastePer(e.target.value)} placeholder={t('AddUpProd.Waste%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Labor%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setLabourPer(e.target.value)} placeholder={t('AddUpProd.Labor%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Equip')}</p>
                    <input type="text" className='form-control' onChange={(e) => setEquipment(e.target.value)} placeholder={t('AddUpProd.Equip')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Other%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setOtherPer(e.target.value)} placeholder={t('AddUpProd.Other%')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpProd.Margin%')}</p>
                    <input type="text" className='form-control' onChange={(e) => setMarginper(e.target.value)} placeholder={t('AddUpProd.Margin%')} />
                    <br />
                    <button style={{marginBottom: 15}} onClick={add_prod} className='btn btn-primary'>{t('AddUpProd.AddProd')}</button>
                </div>

            </div>
        </div>
    )
}

export default AddProd