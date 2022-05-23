import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import Header from './Header'

function Register() {

    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleClick(lang) {
        i18n.changeLanguage(lang);
    }

    async function SignUp() {
        let item = { name, email, password };

        let result = await fetch("http://localhost:8000/api/register",
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            }
        );
        if(name && email && password){
            result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate('/login');
        }
        else{
            alert('All fields are Mandatory.')
        }

    }
    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">

                <h2 style={{marginTop:25}}>{t('Register.Register')}</h2>
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('Register.Username')}</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder={t('Register.Username')} />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('Register.Email')}</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder={t('Register.Email')} />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('Register.Password')}</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder={t('Register.Password')} />
                <br />
                <button onClick={SignUp} className="btn btn-primary"> {t('Register.signUp')} </button>
            </div>

            <div style={{ position:'absolute', bottom: 0, marginBottom: 25  }} className="offset-sm-9">
                <DropdownButton
                    key={'up'}
                    drop={'up'}
                    size='sm'
                    variant="secondary"
                    title={t('Language')}
                >
                    <Dropdown.Header>{t('setLanguange')}</Dropdown.Header>
                    <Dropdown.Item onClick={() => handleClick('en')}>English</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleClick('ar')}>عربي</Dropdown.Item>
                </DropdownButton>

            </div>

        </div>
    )
}

export default Register