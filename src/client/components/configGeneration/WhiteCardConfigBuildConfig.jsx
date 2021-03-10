import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '../universals/Button';
import { FaCheck } from 'react-icons/fa';
import styles from '../../stylesheets/modules/tab3/WhiteCardConfigBuildConfig.module';

const WhiteCardTabThreeBuildConfig = (props) => {
  const radioStyles = [styles.pretty, styles['p-default'], styles['p-round'], styles['p-smooth']].join(' ');
  const radioStylesState = [styles.state, styles['p-primary']].join(' ');

  return (
    <div className={styles.whiteCard}>
      <div className={styles.tabTwoThreeHeading} >Select your features</div>
      <div className={styles.tabThreeSelectionCodeContainer}>
        <div className={styles.tabThreeSelectionContainer}>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedReact} onChange={props.handleChangeCheckboxReact} />
                <div className={radioStylesState}>
                  <label>React </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedCSS} onChange={props.handleChangeCheckboxCSS} />
                <div className={radioStylesState}>
                  <label>CSS </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedSass} onChange={props.handleChangeCheckboxSass} />
                <div className={radioStylesState}>
                  <label>Sass </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedLess} onChange={props.handleChangeCheckboxLess} />
                <div className={radioStylesState}>
                  <label>Less </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedStylus} onChange={props.handleChangeCheckboxStylus} />
                <div className={radioStylesState}>
                  <label>Stylus </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedSVG} onChange={props.handleChangeCheckboxSVG} />
                <div className={radioStylesState}>
                  <label>SVG </label><br />
                </div>
              </div>
            </div>
            <div className={styles.checkBoxPadding}>
              <div className={radioStyles}>
                <input className={styles.tabTwoCheckbox} type="checkbox" checked={props.checkedPNG} onChange={props.handleChangeCheckboxPNG} />
                <div className={radioStylesState}>
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
          'opacity': '0.7',
          'marginTop': '-28px'
        }}>{props.formattedCode}</SyntaxHighlighter>
      </div>
      <Button
        classes="btn stats"
        idName="configButton"
        func={props.saveWebpackConfig}
        textContent="Save Webpack Config File" />
      {props.isCustomConfigSaved &&
        <div className={styles.tabThreeRowFlexContainer}>
          <FaCheck className={styles.greenCheck} />
          <div id={styles.webpackConfigSaveText}>
            webpack.config.js saved
          </div>
        </div>}
    </div>
  );
}

export default WhiteCardTabThreeBuildConfig;