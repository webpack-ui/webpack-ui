import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoLight } from 'react-syntax-highlighter/dist/styles/hljs';
import styles from '../../stylesheets/modules/tab3/WhiteCardConfigBuildConfig.module';


const WhiteCardTabThreeBuildConfig = (props) => {
  return (
    <div className={styles.whiteCard}>
      <div className={styles.tabTwoThreeHeading} >Select your features</div>
      <div className={styles.tabThreeSelectionCodeContainer}>
        <div className="tabThreeSelectionContainer">
          <div className={styles.checkboxContainer}>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedReact} onChange={props.handleChangeCheckboxReact} />
                <div className="state p-primary">
                  <label>React </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedCSS} onChange={props.handleChangeCheckboxCSS} />
                <div className="state p-primary">
                  <label>CSS </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedSass} onChange={props.handleChangeCheckboxSass} />
                <div className="state p-primary">
                  <label>Sass </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedLess} onChange={props.handleChangeCheckboxLess} />
                <div className="state p-primary">
                  <label>Less </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedStylus} onChange={props.handleChangeCheckboxStylus} />
                <div className="state p-primary">
                  <label>Stylus </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedSVG} onChange={props.handleChangeCheckboxSVG} />
                <div className="state p-primary">
                  <label>SVG </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className="pretty p-default p-round p-smooth">
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedPNG} onChange={props.handleChangeCheckboxPNG} />
                <div className="state p-primary">
                  <label>PNG </label><br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabThreeCodeContainer"></div>
        <SyntaxHighlighter language='javascript' style={paraisoLight} customStyle={{
          'borderRadius': '5px',
          'padding': '15px',
          'width': '500px',
          'height': '500px',
          'background': 'white',
          'opacity': '0.7'
        }}>{props.formattedCode}</SyntaxHighlighter>
      </div>
        {/* <Button
          classes="btn stats"
          func={props.selectGenerateWebConfigRoot}
          textContent="Create Webpack Config File" /> */}
      {/* {props.customConfigSaved && props.isRootSelected &&
        <div className="tabThreeRowFlexContainer">
          < FaCheck className="greenCheck" />
          <div id="webpackConfigSaveText">
            webpack.config.js saved
          </div>
        </div> */}
      
    </div>
  );
}

export default WhiteCardTabThreeBuildConfig;