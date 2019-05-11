import * as React from 'react';
import styles from '../../stylesheets/modules/home/home.module';
import { FaCheck } from "react-icons/fa";


const D3ChartContainerCard = (props) => {
  return (
    <div className={props.isChartCardDisplayed ? `${styles.whiteCard}` : `${styles.whiteCardOff}`}>
      <div className="smallerMainContainer">
        <div id="graphsContainer">
          <div className={props.isSunburstDisplayed ? `${styles.d3DisplayOn}` : `${styles.d3DisplayOff}`}>
            <div id="chart">
              <div id="sequence"></div>
              <div id="explanation">
                <span id="filename"></span><br />
                <span id="percentage"></span><br />
                <div>
                  <span id="filesize"></span> <br />
                </div>
              </div>
              <div className={styles.chartSVGContainer}>
                <svg width={props.width} height={props.height} className="sunburst" />
              </div>
              <div>
                  <span id="issuerPath"></span> <br />
              </div>
            </div>
          </div>

          <div className={props.isTreemapDisplayed ? `${styles.d3DisplayOn}` : `${styles.d3DisplayOff}`}>
            <div id="sequenceTreeMap"></div>
            <div id="explanationTree">
              <div id="ancestors"></div>
              <span id="treemapText"></span>
              <span id="filenameTree"></span><br />
              <span id="percentageTree"></span><br />
              <div>
                <span id="filesizeTree"></span> <br />
              </div>
            </div>
            <div style={{ paddingTop: '30px' }} id="chartTreeMap">
              <div className={styles.chartSVGContainer}>
                <svg width='650px' height={props.height} id="treemap" />
              </div>
            </div>
          </div>

          <div className={props.isTreemapZoomDisplayed ? `${styles.d3DisplayOn}` : `${styles.d3DisplayOff}`}>
            <div id="explanationTreeZoom">
              <div id="ancestorsZoom"></div>
              <span id="treemapTextZoom"></span>
              <span id="filenameTreeZoom"></span><br />
              <span id="percentageTreeZoom"></span><br />
              <div>
                <span id="filesizeTreeZoom"></span> <br />
              </div>
            </div>
            <div id="sequenceTreeMapZoom"></div>
            <div className={styles.chartSVGContainer}>
              <div className={styles.zoomTreemapColumnContainer}>
                <div className={styles.up}>&larr; UP</div>
                <div style={{ paddingTop: '10px' }} className={styles.feature} id="chartTreeMapZoom">
                  <svg width={props.width} height={props.height} id="treemapZoom" />
                </div>
              </div>
            </div>
          </div>

          <div id="zoomContainer" className={props.isSunburstZoomDisplayed ? `${styles.d3DisplayOn}` : `${styles.d3DisplayOff}`}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default D3ChartContainerCard;