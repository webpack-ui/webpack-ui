import React from 'react';
import { observer, inject } from 'mobx-react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoLight, docco, dark } from 'react-syntax-highlighter/dist/styles/hljs';
import { generate } from 'astring';
import styles from '../stylesheets/modules/DefaultStarter.module';

@inject('store')
@observer
class DefaultStarter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayFramework: true,
      displayLoader: false,
      displayPlugin: false,
      displaySavePage: false,
      checkedReact: false,
      checkedVue: false,
      checkedCSS: false,
      checkedSass: false,
      checkedLess: false,
      checkedStylus: false,
      checkedSVG: false,
      checkedPNG: false,
      formattedCode: '',
      customAST: null,
      ReactAST: null,
      CSSAST: null,
      SassAST: null,
      LessAST: null,
      StylusAST: null,
      svgAST: null,
      pngAST: null,
      numberOfRules: 0,
      moduleExist: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/AST/')
      .then((res) => res.json())
      .then((json) => {
        //turn AST back to string for display
        const formattedCode = generate(json.customAST, {
          comments: true,
        })
        this.setState({
          customAST: json.customAST,
          ReactAST: json.ReactAST,
          CSSAST: json.CSSAST,
          SassAST: json.SassAST,
          LessAST: json.LessAST,
          StylusAST: json.StylusAST,
          pngAST: json.pngAST,
          svgAST: json.svgAST,
          formattedCode,
        })
      })
  }

  handleChangeCheckboxReact = () => {
    let { checkedReact, ReactAST, numberOfRules, moduleExist } = this.state;
    let customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedReact) {
      // Add React AST 
      if (numberOfRules === 0) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(
          JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[0]))
        )
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el, i) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.unshift(
                  JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0]))
                )
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
      if (customASTPropertyKey.indexOf("resolve") === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[1])))
      }
      if (customASTPropertyKey.indexOf("devServer") === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(ReactAST.body[0].expression.right.properties[2])))
      }
    } else {
      let module_index = 0;
      let resolve_index = 0;
      let devServer_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        let tempCustomAST = [];
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes("js|jsx")) {
            tempCustomAST = [
              ...customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.slice(0, j),
              ...customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.slice(j + 1)
            ]
            numberOfRules -= 1;
          }
        }
        customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements = tempCustomAST;
      }
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "resolve") resolve_index = i
      }
      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0, resolve_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(resolve_index + 1)
      ]
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "devServer") devServer_index = i
      }

      customAST.body[customAST.body.length - 1].expression.right.properties = [
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(0, devServer_index),
        ...customAST.body[customAST.body.length - 1].expression.right.properties.slice(devServer_index + 1)
      ]
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({ checkedReact: !this.state.checkedReact, formattedCode, moduleExist, numberOfRules, customAST });
  }

  handleChangeCheckboxCSS = () => {
    let { checkedCSS, CSSAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedCSS) {
      if (customASTPropertyKey.indexOf(CSSAST.body[0].expression.right.properties[0].key.name) === -1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(CSSAST.body[0].expression.right.properties[0])))
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(CSSAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".css")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({ checkedCSS: !this.state.checkedCSS, formattedCode, numberOfRules, moduleExist, customAST });
  }

  handleChangeCheckboxSass = () => {
    let { checkedSass, SassAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedSass) {
      if (customASTPropertyKey.indexOf(SassAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(SassAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(SassAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".scss")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({
      checkedSass: !this.state.checkedSass,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  }

  handleChangeCheckboxLess = () => {
    let { checkedLess, LessAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedLess) {
      if (customASTPropertyKey.indexOf(LessAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(LessAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties;
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(LessAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
      formattedCode = generate(customAST, {
        comments: true,
      })
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".less")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({
      checkedLess: !this.state.checkedLess,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  }

  handleChangeCheckboxStylus = () => {
    let { checkedStylus, StylusAST, numberOfRules, moduleExist } = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
    if (!checkedStylus) {
      if (customASTPropertyKey.indexOf(StylusAST.body[0].expression.right.properties[0].key.name) === -1) {
        moduleExist = true;
        numberOfRules += 1;
        customAST.body[customAST.body.length - 1].expression.right.properties.push(JSON.parse(JSON.stringify(StylusAST.body[0].expression.right.properties[0])))
      } else {
        customAST.body[customAST.body.length - 1].expression.right.properties.forEach((el) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.push(JSON.parse(JSON.stringify(StylusAST.body[0].expression.right.properties[0].value.properties[0].value.elements[0])))
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }
    } else {
      let module_index = 0;
      for (let i = 0; i < customAST.body[customAST.body.length - 1].expression.right.properties.length; i += 1) {
        if (customAST.body[customAST.body.length - 1].expression.right.properties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        customAST.body[customAST.body.length - 1].expression.right.properties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties.length === 1) {
        for (let j = 0; j < customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(".styl")) {
            customAST.body[customAST.body.length - 1].expression.right.properties[module_index].value.properties[0].value.elements.splice(j, 1)
            numberOfRules -= 1;
          }
        }
      }
    }
    formattedCode = generate(customAST, {
      comments: true,
    })
    this.setState({
      checkedStylus: !this.state.checkedStylus,
      numberOfRules,
      moduleExist,
      customAST,
      formattedCode
    });
  }

  saveWebpackConfig = () => {
    const link = document.createElement('a');
    link.download = 'webpack.config.js';
    const blob = new Blob([this.state.formattedCode], { type: 'text/plain' });
    link.href = window.URL.createObjectURL(blob);
    link.click();
    this.doSetCustomConfigSaved();
  }

  render() {
    const { store } = this.props;

    const frameWorkQuestion =
      <div className={styles.questionContainer}>
        <div className={styles.question}>
          What type of project would you want?
      </div>
        <div className={styles.questionDescription}>
          No description provided
      </div>
        <label>
          <input type="checkbox" name="framework" value="react" checked={this.state.checkedReact} onChange={this.handleChangeCheckboxReact} />
          React
      </label>
        <label>
          <input type="checkbox" name="framework" value="vue" disabled={true} />
          Vue
      </label>
        <div className={styles.navigationContainer}>
          <button disabled={true}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button onClick={() => this.setState({ displayLoader: true, displayFramework: false })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>

    const LoaderMenu =
      <div className={styles.questionContainer}>
        <div className={styles.question}>
          What loaders would you want?
      </div>
        <div className={styles.questionDescription}>
          No description provided
      </div>
        <label>
          <input type="checkbox" name="framework" value="CSS" checked={this.state.checkedCSS} onChange={this.handleChangeCheckboxCSS} />
          css-loader
      </label>
        <label>
          <input type="checkbox" name="framework" value="SASS" checked={this.state.checkedSass} onChange={this.handleChangeCheckboxSass} />
          sass-loader
        </label>
        <label>
          <input type="checkbox" name="framework" value="LESS" checked={this.state.checkedLess} onChange={this.handleChangeCheckboxLess} />
          less-loader
        </label>
        <label>
          <input type="checkbox" name="framework" value="STYLUS" checked={this.state.checkedStylus} onChange={this.handleChangeCheckboxStylus} />
          stylus-loader
        </label>
        <div className={styles.navigationContainer}>
          <button onClick={() => this.setState({ displayLoader: false, displayFramework: true })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button onClick={() => this.setState({ displayLoader: false, displayPlugin: true })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>

    const PluginsMenu =
      <div className={styles.questionContainer}>
        <div className={styles.question}>
          What plugins would you want?
      </div>
        <div className={styles.questionDescription}>
          No description provided
      </div>
        <label>
          <input type="checkbox" name="framework" value="TerserWebpackPlugin" checked={this.state.checkedReact} onChange={this.handleChangeCheckboxReact} />
          TerserWebpackPlugin
      </label>
        <label>
          <input type="checkbox" name="framework" value="HTMLWebpackPlugin" />
          HTMLWebpackPlugin
      </label>
        <div className={styles.navigationContainer}>
          <button onClick={() => this.setState({ displayPlugin: false, displayLoader: true })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button onClick={() => this.setState({ displayPlugin: false, displaySavePage: true })}>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>

    const SaveMenu =
      <div className={styles.questionContainer}>
        <div className={styles.question}>
          Go Ahead and save your config!
      </div>
        <div style={{ marginTop: '405px' }} className={styles.navigationContainer}>
          <button onClick={() => this.setState({ displayLoader: true, displaySavePage: false })}>
            <FiChevronLeft className={styles.navIcon} />
          </button>
          <button>
            <FiChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <div onClick={() => { this.props.history.push("/selectStarterPack") }}>
            <FiChevronLeft className={styles.chevronLeft} />
          </div>
          <div className={styles.header}>Default Starter</div>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.lowerLeftContainer}>
            {this.state.displayFramework && frameWorkQuestion}
            {this.state.displayLoader && LoaderMenu}
            {this.state.displayPlugin && PluginsMenu}
            {this.state.displaySavePage && SaveMenu}
          </div>
          <div style={{ position: 'relative' }} className={styles.lowerRightContainer}>
            <SyntaxHighlighter language='javascript' style={dark} customStyle={{
              'borderRadius': '5px',
              'padding': '15px',
              'width': '570px',
              'height': '420px',
              'backgroundColor': '#2b3a42',
              'opacity': '0.95',
              'marginTop': '28px'
            }}>{this.state.formattedCode}</SyntaxHighlighter>
            {this.state.displaySavePage &&
              <button
                style={{ position: 'absolute', top: '417', left: '450' }}
                onClick={this.saveWebpackConfig}
              >
                Download
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultStarter;
