import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import Header from './Header'

function Login() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])

    function handleClick(lang) {
        i18n.changeLanguage(lang);
    }

    async function login() {
        let item = { name, password };

        let result = await fetch("http://localhost:8000/api/login",
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            }
        );
        if ("Error: Username or Password is incorrect") {
            navigate('/login');

        }
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        let user = JSON.parse(localStorage.getItem('user-info'))
        if (user.name || user.password) {
            navigate('/');
        }
        else {
            navigate('/login');
            alert('Username or Password is Incorrect')
            localStorage.clear()
        }
    }
    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h2 style={{marginTop:25}}>{t('Login.Login')}</h2>
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('Login.Username')}</p>
                <input type="text" placeholder={t('Login.Username')} onChange={(e) => setName(e.target.value)} className="form-control" />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>{t('Login.Password')}</p>
                <input type="password" placeholder={t('Login.Password')} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={login} className="btn btn-primary">{t('Login.Login')}</button>
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

export default Login