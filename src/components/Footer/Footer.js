import * as React from "react";
import { Link } from "gatsby";

// Styles.
import "./Footer.css";

// Components.
import Button from "../Button";
import Constraint from "../Constraint";

// Constants.
import {
  PATH_HOW_TO_DONATE,
  PATH_HOW_TO_VOLUNTEER,
  ICON_DONATE,
  ICON_VOLUNTEER,
  TEXT_WANT_TO_DONATE,
  TEXT_WANT_TO_VOLUNTEER,
} from "../../constants/Footer";

// SVGs.
import SuUkrainaWhite from "../../images/logos/su-ukraina--secondary.svg";
import Adapt from "../../images/logos/adapt.svg";
import LaisvesTv from "../../images/logos/laisves-tv.svg";
import Shift4 from "../../images/logos/shift4.svg";

const Footer = () => {
  return (
    <footer className="Footer">
      <Constraint>
        <div className="Footer__cta-section">
          <div className="Footer__cta-section-title">
            Kiekvienas veiksmas svarbus
          </div>
          <div className="Footer__cta-section-actions">
            <Button
              to={PATH_HOW_TO_DONATE}
              icon={ICON_DONATE}
              color={`secondary`}
              position={`left`}
            >
              {TEXT_WANT_TO_DONATE}
            </Button>
            <Button
              to={PATH_HOW_TO_VOLUNTEER}
              icon={ICON_VOLUNTEER}
              color={`secondary`}
              position={`left`}
            >
              {TEXT_WANT_TO_VOLUNTEER}
            </Button>
          </div>
        </div>
        <div className="Footer__menus">
          <p>
            <img
              className="Footer__logo"
              src={SuUkrainaWhite}
              alt="SuUkraina.lt"
              height="40"
              width="235"
            />
          </p>
          <p>
            <nav className="Footer__nav" aria-label="Poraštės navigacija">
              <ul className="Footer__menu">
                <li>
                  <Link to="/apie-mus/">Apie mus</Link>
                </li>
                <li>
                  <Link to="/privatumo-politika/">Privatumo politika</Link>
                </li>
              </ul>
            </nav>
          </p>
        </div>
        <div className="Footer__credits">
          <p className="Footer__slogan">
            2022 | <span title="Героям слава!">Слава Україні!</span>
          </p>
          <p className="Footer__partners">
            <span className="Footer__partners-intro">Puslapį koordinuoja:</span>
            {` `}
            <a
              href="https://adaptagency.com/adapt-lithuania"
              rel="noopener"
              target="_blank"
            >
              <img src={Adapt} alt="Adapt LT logo" width="93" height="15" />
            </a>
            {` `}
            <a href="https://laisves.tv" rel="noopener" target="_blank">
              <img
                src={LaisvesTv}
                alt="Laisvės TV logo"
                width="49"
                height="49"
              />
            </a>
          </p>
        </div>
      </Constraint>
    </footer>
  );
};

export default Footer;
