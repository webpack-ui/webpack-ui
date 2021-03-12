import React from 'react';
import { observer, inject } from 'mobx-react';
import hero from '../../assets/images/hero.png';
import styles from '../../stylesheets/modules/home/home.module';
import { withRouter } from 'react-router-dom';

@inject('store')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.header}>Dashboard</h1>
        <div className={styles.lowerContainer}>
          <div className={styles.leftContainer}>
            <img className={styles.hero} src={hero} alt='' />
            <div className={styles.header2}>No Project Found</div>
            <div className={styles.welcomeMessage}>
              We guess this is your first time! Create a project now to get started!
            </div>
            <button
              onClick={() => {
                this.props.history.push('/newProject');
              }}>
              + &nbsp;Create Project
            </button>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.noActivity}>No Activity here. Create a project to get started</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
