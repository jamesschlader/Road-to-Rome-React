import React from "react";

export default () => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="container">
          <a className="brand-logo hide-on-med-and-down" href="/">
            Road To Rome
          </a>
          <ul id="nav-mobile" className="right">
            <li className="nav-item">
              <a href="/market">
                <i class="material-icons">shopping_cart</i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-equip" href="/ludus-magnus">
                <img
                  className="nav-equip"
                  src="/img/erics-images/nav-equipment.png"
                  alt="ludus-magnus"
                />
              </a>
            </li>
            <li className="nav-item">
              <a href="/accounts">
                <i className="material-icons">person</i>
              </a>
            </li>
            <li className="nav-item">
              <a className="modal-trigger" href="#instructions">
                <i className="material-icons">contact_support</i>
              </a>
            </li>
            <li className="nav-item">
              <a href="/">
                <i className="material-icons">home</i>
              </a>
            </li>
            <li className="nav-item">
              <a href="/logout" alt="logout">
                <i className="material-icons">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
