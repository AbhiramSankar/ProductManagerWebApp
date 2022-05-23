import Header from './Header'
import { useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function AddMat() {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const { t, i18n } = useTranslation();

    async function add_mat() {
        if (description && quantity && rate) {
            const formData = new FormData();
            formData.append('product_id', params.id);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('rate', rate);
            formData.append('amount', (quantity * rate));
            let result = await fetch("http://localhost:8000/api/addproductmat", {
                method: 'POST',
                body: formData
            })
            alert("Material has been added")
            navigate("/material/" + params.id)
        }
        else {
            alert("All fields are mandatory.")
        }
    }



    return (
        <div>
            <Header />
            <div>
                <h2 style={{marginTop:25}}>{t('AddUpMat.AddMat')}</h2>
                <div className="col-sm-6 offset-sm-3">
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Description')}</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder={t('AddUpMat.Description')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Quantity')}</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} placeholder={t('AddUpMat.Quantity')} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('AddUpMat.Rate')}</p>
                    <input type="text" className='form-control' onChange={(e) => setRate(e.target.value)} placeholder={t('AddUpMat.Rate')}/>
                    <br />
                    <button onClick={add_mat} className='btn btn-primary'>{t('AddUpMat.AddMat')}</button>
                </div>

            </div>
        </div>
    )
}

export default AddMat