import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    function logOut() {
        localStorage.clear()
        navigate('/login')

    }
    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>{t('Header.PM')}</Navbar.Brand>
                    <Nav className="me-auto navbar_wrapper">
                        {localStorage.getItem('user-info') && user.name ?
                            <>
                                <NavLink className="navops" to='/'>{t('Header.Home')}</NavLink>
                                <NavLink className="navops" to='/search'>{t('Header.Search')}</NavLink>
                            </> :
                            <>
                                <NavLink className="navops" to='/login'>{t('Header.Login')}</NavLink>
                                <NavLink className="navops" to='/register'>{t('Header.Register')}</NavLink>
                            </>
                        }
                    </Nav>
                    {localStorage.getItem('user-info') && user.name?
                        <Nav>
                            <NavDropdown title={user.name}>
                                <NavDropdown.Item onClick={logOut}>{t('Header.Logout')}</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default Header