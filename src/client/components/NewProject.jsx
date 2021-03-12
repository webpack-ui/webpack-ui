import React from 'react';
import { observer, inject } from 'mobx-react';
import { FiChevronLeft, FiUploadCloud, FiBox } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';
import styles from '../stylesheets/modules/NewProject.module';

@inject('store')
@observer
class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div
            aria-label="Go back"
            onClick={() => {
              this.props.history.push('/');
            }}
            role="button"
            tabIndex={0}>
            <FiChevronLeft className={styles.chevronLeft} />
          </div>
          <h1 className={styles.header}>New Project</h1>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.optionContainer}>
            <FiBox className={styles.optionIcon} />
            <div className={styles.description}>
              Get started quickly by choosing from a set of starter packs for your new project.
            </div>
            <button
              onClick={() => {
                this.props.history.push('/selectStarterPack');
              }}>
              Choose Pack
            </button>
          </div>
          <div className={styles.optionContainer}>
            <FiUploadCloud className={styles.optionIcon} />
            <div className={styles.description}>
              Already have a webpack configuration? Upload the .config file to get started immediately!
            </div>
            <button disabled={true}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewProject);
