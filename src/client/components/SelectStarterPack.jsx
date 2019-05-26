import React from 'react';
import { observer, inject } from 'mobx-react';
import { FiChevronLeft } from "react-icons/fi";
import { withRouter } from "react-router-dom";
import styles from '../stylesheets/modules/SelectStarterPack.module';

@inject('store')
@observer
class SelectStarterPack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div onClick={()=>{this.props.history.push("/newProject")}}>
            <FiChevronLeft className={styles.chevronLeft}/>
          </div>
          <div className={styles.header}>Select Starter Pack</div>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.lowerLeftContainer}>
            <div className={styles.lowerLeftTopContainer}>
              <button className={styles.optionContainer} disabled={true}>
                <div className={styles.optionHeader}>
                  Quick Start
                </div>
                <div className={styles.description}>
                  Get started in one click with the recommended settings.
                </div>
              </button>
              <button className={styles.optionContainer} onClick={()=>{this.props.history.push("/defaultStarter")}}>
                <div className={styles.optionHeader}>
                  Basic
                </div>
                <div className={styles.description}>
                  Create a project with the default starter pack.
                </div>
              </button>
              <button className={styles.optionContainer} disabled={true}>
                <div className={styles.optionHeader}>
                  Advanced
                </div>
                <div className={styles.description}>
                  Customized your webpack configuration with loaders, plugins etc.
                </div>
              </button>
            </div>
          </div>
          <div className={styles.lowerRightContainer}>
            <div className={styles.searchContainer}>
              <div>
                  Search starter packs...
              </div>
              <hr />
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default withRouter(SelectStarterPack);
