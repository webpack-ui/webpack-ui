import * as React from 'react';
import Button from '../universals/Button';
import { FaCheck } from "react-icons/fa";
import Spinner from '../universals/Spinner';
import StatsDropZone from './StatsDropZone';
import styles from '../../stylesheets/modules/home/home.module';

class WhiteCardStatsJSON extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.whiteCard}>
        <div id="stats-file-selector">
          <div className={styles.tabOne_Heading2}>Load Webpack Stats File</div>
          <StatsDropZone onDropFunction={this.props.onDropFunction} />
          {/* <Button
          classes="btn stats"
          func={props.getWebpackStats}
          textContent="Load Stats File"
          condition={props.isStatsFileGenerated && !props.isOriginalStatsGenerated}
        /> */}

          {/* {props.isStatsFileGenerated && !props.isOriginalStatsGenerated &&
          <Spinner />
        } */}
        </div>
      </div>
    );
  }
}

export default WhiteCardStatsJSON;