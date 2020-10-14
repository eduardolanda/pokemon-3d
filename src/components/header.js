import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>POKEMON.</div>
        <nav>
          <ul>
            <li className='btn'>
              <a href='/'>CATCH Em!</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
