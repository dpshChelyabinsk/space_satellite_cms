import React, {useEffect, useState} from 'react';
import classes from "./styles/NavHeader.module.css";
import { NavLink } from "react-router-dom";
import MainLogo from "../../Logotypes/MainLogo/MainLogo";

const NavHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {

        if (menuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        // Cleanup function
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={classes.container}>
            <div className={classes.navBurger} onClick={toggleMenu}>
                <span className={classes.burgerLine}></span>
                <span className={classes.burgerLine}></span>
                <span className={classes.burgerLine}></span>
            </div>
            <ul className={`${classes.navLane} ${menuOpen ? classes.navOpen : classes.navClose}`}>
                <li>
                    <NavLink
                        to="/satellite"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Отследить спутник
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/events"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Мероприятия
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        <MainLogo />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/gallery"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Галерея
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/news"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Новости
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? `${classes.navItem} ${classes.active}` : classes.navItem
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        О нас
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavHeader;
