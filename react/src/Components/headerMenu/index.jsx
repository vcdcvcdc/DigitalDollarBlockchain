import React from 'react';

const HeaderMenu = () => {

    return (
        <ul id="menu">
            <li>
                <button
                    id="button"
                    onClick={() => {
                        const menu = document.getElementById("menu");
                        menu.classList.toggle("show");
                    }}
                >
                    <span className="border"></span>
                    <div className="roulette"></div>
                </button>
                <ul>
                    <li>
                        <a href="#finance">Finance</a>
                    </li>
                    <li>
                        <a href="#mission">Mission</a>
                    </li>
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#commitment">Commitment</a>
                    </li>
                    <li>
                        <a href="#tokens">Tokens</a>
                    </li>
                    <li>
                        <a href="#login">Login/Register</a>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default HeaderMenu;





