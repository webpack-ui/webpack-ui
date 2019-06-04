import React from 'react';
import { observer, inject } from 'mobx-react';
import WhiteCardConfigWelcome from './WhiteCardConfigWelcome';
import WhiteCardConfigBuildConfig from './WhiteCardConfigBuildConfig';
import styles from '../../stylesheets/modules/tab3/configGeneration.module';
import { generate } from 'astring';


@inject('store')
@observer
class ConfigGeneration extends React.Component {
  // _isMounted = false;

  constructor() {
    super();
    this.state = {
      checked: {
        react: false,
        css: false,
        sass: false,
        less: false,
        stylus: false,
        svg: false,
        png: false
      },
      ast: {
        react: null,
        css: null,
        sass: null,
        less: null,
        stylus: null,
        svg: null,
        png: null,
        custom: null
      },
      isFrameWorkSelected: false,
      rootCustomDirectory: '',
      formattedCode: '',
      numberOfRules: 0,
      moduleExist: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/AST/')
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        //turn AST back to string for display
        const formattedCode = generate(json.customAST, {
          comments: true,
        })
        this.setState({
          ast: {
            react: json.ReactAST,
            custom: json.customAST,
            css: json.CSSAST,
            sass: json.SassAST,
            less: json.LessAST,
            stylus: json.StylusAST,
            png: json.pngAST,
            svg: json.svgAST,
          },
          formattedCode,
        })
      })
  }

  handleChangeCheckbox = (name, extention) => {
    let { ast, checked, numberOfRules, moduleExist } = this.state;
    let customAST = JSON.parse(JSON.stringify(ast.custom));
    let formattedCode;
    const AST = ast[name];
    const customASTProperties = customAST.body[customAST.body.length - 1].expression.right.properties;
    const customASTPropertyKey = [];


    customASTProperties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)
    })
  
    if (!checked[name]) {
      // Add required AST 
      if (numberOfRules === 0) {
        customASTProperties.push(
          JSON.parse(JSON.stringify(AST.body[0].expression.right.properties[0]))
        )
        moduleExist = true;
        numberOfRules += 1;
      } else {
        customASTProperties.forEach((el, i) => {
          if (el.key.name === "module") {
            let moduleArr = el.value.properties
            moduleArr.forEach((moduleEl) => {
              if (moduleEl.key.name === "rules") {
                moduleEl.value.elements.unshift(
                  JSON.parse(JSON.stringify(AST.body[0].expression.right.properties[0].value.properties[0].value.elements[0]))
                )
              }
            })
          }
        })
        moduleExist = true;
        numberOfRules += 1;
      }

      if (name === "react") {
        if (customASTPropertyKey.indexOf("resolve") === -1) {
          customASTProperties.push(JSON.parse(JSON.stringify(AST.body[0].expression.right.properties[1])))
        }
        if (customASTPropertyKey.indexOf("devServer") === -1) {
          customASTProperties.push(JSON.parse(JSON.stringify(AST.body[0].expression.right.properties[2])))
        }
      }

    } else {
      let module_index = 0;
      let resolve_index = 0;
      let devServer_index = 0;
      for (let i = 0; i < customASTProperties.length; i += 1) {
        if (customASTProperties[i].key.name === "module") module_index = i
      }
      if (numberOfRules === 1 && customASTProperties[module_index].value.properties.length === 1) {
        customASTProperties.splice(module_index, 1)
        numberOfRules -= 1;
      } else if (numberOfRules > 1 && customASTProperties[module_index].value.properties.length === 1) {
        let tempCustomAST = [];
        for (let j = 0; j < customASTProperties[module_index].value.properties[0].value.elements.length; j += 1) {
          if (customASTProperties[module_index].value.properties[0].value.elements[j].properties[0].value.raw.includes(extention)) {
            tempCustomAST = [
              ...customASTProperties[module_index].value.properties[0].value.elements.slice(0, j),
              ...customASTProperties[module_index].value.properties[0].value.elements.slice(j + 1)
            ]
            numberOfRules -= 1;
          }
        }
        customASTProperties[module_index].value.properties[0].value.elements = tempCustomAST;
      }
      if (name === "react") {
        for (let i = 0; i < customASTProperties.length; i += 1) {
          if (customASTProperties[i].key.name === "resolve") resolve_index = i
        }
        customASTProperties = [
          ...customASTProperties.slice(0, resolve_index),
          ...customASTProperties.slice(resolve_index + 1)
        ]
        for (let i = 0; i < customASTProperties.length; i += 1) {
          if (customASTProperties[i].key.name === "devServer") devServer_index = i
        }
  
        customASTProperties = [
          ...customASTProperties.slice(0, devServer_index),
          ...customASTProperties.slice(devServer_index + 1)
        ]
      }
    }

    formattedCode = generate(customAST, {
      comments: true,
    });

    this.setState( state => {
      let checked = {...state.checked}, ast = {...state.ast};
      checked[name] = !state.checked[name];
      ast.custom = customAST;

      return {
        checked,
        ast,
        formattedCode,
        numberOfRules,
        moduleExist
      }
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

  doSetCustomConfigSaved() {
    this.props.store.setCustomConfigSavedTrue()
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.mainContainerHome}>
        <div>
          <WhiteCardConfigWelcome
            isFrameWorkSelected={this.state.isFrameWorkSelected}
          />
          <WhiteCardConfigBuildConfig
            handleChangeCheckboxReact={ () => {this.handleChangeCheckbox("react", "js|jsx")}}
            handleChangeCheckboxCSS={() => {this.handleChangeCheckbox("css", ".css")}}
            handleChangeCheckboxSass={() => {this.handleChangeCheckbox("scss", ".scss")}}
            handleChangeCheckboxLess={() => {this.handleChangeCheckbox("less", ".less")}}
            handleChangeCheckboxStylus={() => {this.handleChangeCheckbox("stylus", ".styl")}}
            handleChangeCheckboxSVG={() => {this.handleChangeCheckbox("svg", ".svg")}}
            handleChangeCheckboxPNG={() => {this.handleChangeCheckbox("png", ".png")}}
            saveWebpackConfig={this.saveWebpackConfig}
            formattedCode={this.state.formattedCode}
            checkedReact={this.state.checked.react}
            checkedCSS={this.state.checked.css}
            checkedSass={this.state.checked.sass}
            checkedLess={this.state.checked.less}
            checkedStylus={this.state.checked.stylus}
            checkedSVG={this.state.checked.svg}
            checkedPNG={this.state.checked.png}
            isCustomConfigSaved={this.props.store.isCustomConfigSaved}
          />
        </div>
      </div>
    );
  }
}

export default ConfigGeneration;
