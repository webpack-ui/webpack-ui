import * as React from 'react';
import DropzoneContainer from '../universals/DropzoneContainer';
import styles from '../../stylesheets/modules/home/home.module';

class WhiteCardConfigMod extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.whiteCard}>
        <div id="stats-file-selector">
          <div className={styles.tabOne_Heading2}>Load Webpack Config File</div>
          <DropzoneContainer 
            onDropFunction={this.props.onDropFunction}
            text="Upload webpack.config" />
        </div>
      </div>
    );
  }
}

export default WhiteCardConfigMod;