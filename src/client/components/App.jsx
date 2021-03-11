import * as React from 'react';
import { Route, BrowserRouter as Router, Link, Switch, withRouter, NavLink } from 'react-router-dom';
import Home from './home/Home';
import NewProject from './NewProject';
import SelectStarterPack from './SelectStarterPack';
import DefaultStarter from './DefaultStarter';

import logo from '../assets/images/logo-on-dark-bg.png';
import { observer, inject } from 'mobx-react';

import styles from '../stylesheets/modules/app.module';

@inject('store')
@observer
class Nav extends React.Component {

  render() {

    const { store } = this.props;
    return (
      <nav className={styles.Nav}>
        <div className={styles.NavItemContainer}>
          <NavLink to="/" activeClassName="is-active" exact={true}>
            <img alt="Webpack logo" className={styles.logo}src={logo} />
          </NavLink>
          <button>
            <span>+</span> New Project
          </button>
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
          <main className={styles.mainContainer}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/newProject" component={NewProject} />
              <Route exact path="/selectStarterPack" component={SelectStarterPack} />
              <Route exact path="/defaultStarter" component={DefaultStarter} />
              {/* <Route exact path="/configeneration" component={ConfigGeneration} /> */}
            </Switch>
          </main>
          <footer className={styles.footer}>
            <div>Developed by Webpack.js.org</div>
            <div>© 2019</div>
          </footer>
        </div>
      </Router>
    )
  }
}
