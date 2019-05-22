import React from "react";

export default () => {
  return (
    <footer className="page-footer footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5>Thanks for playing Road to Rome!</h5>
            <p>Have a look at some of other cool Panda Warriors apps!</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5>Try other Panda Warriors apps:</h5>
            <ul>
              <li>
                <a href="https://yoso-app.herokuapp.com/" target="blank">
                  YOSO
                </a>
              </li>
              <li>
                <a
                  href="https://bryan-lee-git.github.io/group-project/"
                  target="blank"
                >
                  A1 Guitar Learner
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <p>© 2019 Copyright Panda Warriors Dev Group</p>
        </div>
      </div>
    </footer>
  );
};
