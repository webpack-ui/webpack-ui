import React from 'react';
import { observer, inject } from 'mobx-react';
import HomeHeadingBox from './HomeHeadingBox';
import WhiteCardWelcome from './WhiteCardWelcome';
// import WhiteCardPackageJSON from './WhiteCardPackageJSON';
// import WhiteCardWebpackConfig from './WhiteCardWebpackConfig';
// import WhiteCardStatsJSON from './WhiteCardStatsJSON';
import D3ChartContainerCard from './D3ChartContainerCard';
// import ModalHome from './ModalHome';
import styles from '../../stylesheets/modules/home/home.module';

@inject('store')
@observer
class Home extends React.Component {
  state = {
    isPackageSelected: false,
    width: 550,
    height: 550,
    listOfConfigs: [],
    totalSizeTemp: '',
    initialBuildSize: 0,
    totalNodeCount: 0,
    totalAssets: 0,
    totalChunks: 0,
    isModalDisplayed: false,
    data: {
      "name": "A1",
      "children": [
        {
          "name": "B1",
          "children": [
            {
              "name": "C1",
              "value": 220
            },
            {
              "name": "C2",
              "value": 300
            },
            {
              "name": "C3",
              "children": [
                {
                  "name": "D1",
                  "children": [
                    {
                      "name": "E1",
                      "value": 1000
                    },
                    {
                      "name": "E2",
                      "value": 100
                    }
                  ]
                },
                {
                  "name": "D2",
                  "value": 40
                }
              ]
            }
          ]
        },
        {
          "name": "B2",
          "value": 200
        }
      ]
    }
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainerHome}>
        <div className={!store.isWelcomeCardDisplayed ? `${styles.chartStatsHeadingBoxes}` : `${styles.displayOff}`}>
          <div className={styles.boxContainer}>

            <HomeHeadingBox
              textContent="Total Size"
              displayDataString={store.totalSizeTemp}
            />

            <div className={styles.boxLine}></div>

            <HomeHeadingBox
              textContent="Chunks"
              displayData={store.totalChunks}
            />

            <div className={styles.boxLine}></div>

            <HomeHeadingBox
              textContent="Modules"
              displayData={store.totalNodeCount}
            />

            <div className={styles.boxLine}></div>

            <HomeHeadingBox
              textContent="Assets"
              displayData={store.totalAssets}
            />

          </div>
        </div>

        <WhiteCardWelcome
          isWelcomeCardDisplayed={store.isWelcomeCardDisplayed}
          isPackageSelected={store.isPackageSelected}
        />

        {/*{!store.isPackageSelected &&
          <WhiteCardPackageJSON
            isPackageSelected={store.isPackageSelected}
            getPackageJson={this.getPackageJson}
          />
        }

        {this.props.store.isConfigSelectionDisplayed && store.isPackageSelected &&
          <WhiteCardWebpackConfig
            getWebpackConfig={this.getWebpackConfig}
            listOfConfigs={this.state.listOfConfigs}
          />
        }

        {this.state.isModalDisplayed ? (
          <ModalHome
            onClose={this.handleCloseModal}
            isModalDisplayed={this.state.isModalDisplayed}
          >
            Attention:
            </ModalHome>
        ) : null}

        {store.isPackageSelected && !this.props.store.isConfigSelectionDisplayed && this.props.store.isLoadStatsDisplayed &&

          <WhiteCardStatsJSON
            isStatsFileGenerated={store.isStatsFileGenerated}
            getWebpackStats={this.getWebpackStats}
            generateStatsFile={this.generateStatsFile}
            isOriginalStatsGenerated={store.isOriginalStatsGenerated}
          />
        }

        <D3ChartContainerCard
          isChartCardDisplayed={store.isChartCardDisplayed}
          isSunburstDisplayed={store.isSunburstDisplayed}
          width={this.state.width}
          height={this.state.height}
          isTreemapDisplayed={store.isTreemapDisplayed}
          isTreemapZoomDisplayed={store.isTreemapZoomDisplayed}
          isSunburstZoomDisplayed={store.isSunburstZoomDisplayed}
      /> */}
      </div>
    );
  }
}

export default Home;
