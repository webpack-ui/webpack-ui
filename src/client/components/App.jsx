import * as React from 'react';
import { Route, BrowserRouter as Router, Link, Switch, withRouter } from 'react-router-dom';
import Home from './home/Home';
import ConfigGeneration from './configGeneration/ConfigGeneration';
import ConfigModification from './configModification/ConfigModification';
import { FaHome } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { IoLogoBuffer } from "react-icons/io";
import { observer, inject } from 'mobx-react';

import styles from '../stylesheets/modules/app.module';

@inject('store')
@observer
class Nav extends React.Component {

  doSetDisplaySunburst = () => {
    this.props.store.setDisplaySunburst();
  }

  doSetDisplaySunburstZoom = () => {
    this.props.store.setDisplaySunburstZoom();
    console.log(this.props.store.isSunburstZoomDisplayed)
  }
  doSetDisplayTreemap = () => {
    this.props.store.setDisplayTreemap();
  }
  doSetDisplayTreemapZoom = () => {
    this.props.store.setDisplayTreemapZoom();
  }

  doSetChartNavClassOn = () => {
    this.props.store.setChartNavClassOn();
  }

  doSetChartNavClassOff = () => {
    this.props.store.setChartNavClassOff();
  }

  doSetHomeSelected = () => {
    this.props.store.setHomeSelected();
  }

  doSetConfigModificationSelected = () => {
    this.props.store.setConfigModificationSelected();
  }

  doSetConfigGenerationSelected = () => {
    this.props.store.setConfigGenerationSelected();
  }

  render() {
    const iconStyle = {
      fontSize: '22px',
      paddingRight: '10px'
    };
    const { store } = this.props;
    return (
      <nav className={styles.Nav}>
        <div id={styles.logoContainer}>
          Webpack UI
        </div>
        <div className={styles.Nav__container}>
          <ul className={styles.Nav__item_wrapper}>
            <li className={styles.Nav__item} onClick={this.doSetChartNavClassOn}>
              <Link
                className={store.isHomeSelected ? `${styles.Nav__link} ${styles.selected}` : `${styles.Nav__link}`}
                to="/"
                onClick={this.doSetHomeSelected}
              >
                <FaHome style={iconStyle} />
                Home
              </Link>
            </li>

            {store.isChartCardDisplayed && <ul className={store.isChartNavDisplayed ? `${styles.chartNav} ${styles.selected}` : `${styles.chartNavOff}`} style={{ listStyleType: 'none' }}>
              <li
                className={store.isSunburstSelected ? `${styles.chartNavLinks} ${styles.chartNavLinkSelected}` : `${styles.chartNavLinks}`}
                onClick={this.doSetDisplaySunburst}
              >
                Sunburst
              </li>
              {/* <li
                className={store.isSunburstZoomSelected ? `${styles.chartNavLinks} ${styles.chartNavLinkSelected}` : `${styles.chartNavLinks}`}
                onClick={this.doSetDisplaySunburstZoom}
              >
                Zoomable Sunburst
              </li> */}
              <li
                className={store.isTreemapSelected ? `${styles.chartNavLinks} ${styles.chartNavLinkSelected}` : `${styles.chartNavLinks}`}
                onClick={this.doSetDisplayTreemap}
              >
                Treemap
              </li>
              {/*<li
                className={store.isTreemapZoomSelected ? `${styles.chartNavLinks} ${styles.chartNavLinkSelected}` : `${styles.chartNavLinks}`}
                onClick={this.doSetDisplayTreemapZoom}
              >
                Zoomable Treemap
              </li>*/}
            </ul>}
            <li className={store.isChartCardDisplayed ? `${styles.Nav__item}` : `${styles.Nav__itemPre}`} onClick={this.doSetChartNavClassOff}>
              <Link
                className={store.isConfigModificationSelected ? `${styles.Nav__link} ${styles.selected}` : `${styles.Nav__link}`}
                to="/modification"
                onClick={this.doSetConfigModificationSelected}
              >
                <FaCube style={iconStyle} />
                Config Modification
              </Link>
            </li>
            <li className={store.isChartCardDisplayed ? `${styles.Nav__item}` : `${styles.Nav__itemPre}`} onClick={this.doSetChartNavClassOff}>
              <Link
                className={store.isConfigGenerationSelected ? `${styles.Nav__link} ${styles.selected}` : `${styles.Nav__link}`}
                to="/configeneration"
                onClick={this.doSetConfigGenerationSelected}
              >
                <IoLogoBuffer style={iconStyle} />
                Webpack Config
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default class App extends React.Component {
  render() {
    let { store } = this.props
    return (
      <Router>
        <div className={styles.fullAppContainer}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/modification" component={ConfigModification} />
            <Route exact path="/configeneration" component={ConfigGeneration} />
          </Switch>
        </div>
      </Router>
    )
  }
}
