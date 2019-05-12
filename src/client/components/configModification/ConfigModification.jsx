import * as React from 'react';
import styles from '../../stylesheets/modules/configModification/configModification.module';
import WhiteCardConfigModWelcome from './WhiteCardConfigModWelcome';
import WhiteCardConfigMod from './WhiteCardConfigMod';
import ConfigModificationInterface from './ConfigModificationInterface';
// import { timingSafeEqual } from 'crypto';
import { generate } from "astring";
const acorn = require("acorn");


export default class ConfigModification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checkedMomentLocale : false,
      formattedCode: '',
      customAST:{},
      momentLocaleAST: {},
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/mod/')
      .then((res) => res.json())
      .then((json) => {  
        console.log(json)
        this.setState({
          momentLocaleAST: json.momentLocaleAST,
        })
      })
  }

  onDropFunction = (acceptedFiles) => {
    let that = this
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = function () {
      // Do whatever you want with the file contents
      let content = reader.result;
      const customAST = acorn.parse(content, {
        ecmaVersion: 6,
        locations: true,
      });
      console.log(customAST)
      console.log(that.state.momentLocaleAST)

      that.setState({formattedCode: content, customAST})
    }
    acceptedFiles.forEach(file => reader.readAsText(file))
  }


  saveWebpackConfig = () => {
      const link = document.createElement('a');
      link.download = 'webpack.config.js';
      const blob = new Blob([this.state.formattedCode], { type: 'text/plain' });
      link.href = window.URL.createObjectURL(blob);
      link.click();
      this.doSetCustomConfigSaved();
  }


  handleChangeCheckboxMomentLocale = () => {
    let { checkedMomentLocale, momentLocaleAST} = this.state
    const customAST = JSON.parse(JSON.stringify(this.state.customAST));
    let formattedCode;
    const customASTPropertyKey = [];
    let webpackObjEntries;
    for (let index in customAST.body) {
      if (customAST.body[index].type === "ExpressionStatement") 
        webpackObjEntries = customAST.body[index].expression.right
    }
    webpackObjEntries.properties.forEach((el) => {
      customASTPropertyKey.push(el.key.name)    
    })
    if (!checkedMomentLocale) {
        customAST.body.push(JSON.parse(JSON.stringify(momentLocaleAST.body[0])))

      if (customASTPropertyKey.indexOf(momentLocaleAST.body[1].expression.right.properties[0].key.name) === -1) {
        webpackObjEntries.properties.unshift(JSON.parse(JSON.stringify(momentLocaleAST.body[1].expression.right.properties[0])))
      } else {
        webpackObjEntries.properties.forEach((el) => {
          if (el.key.name === "plugins") {
            el.value.elements.unshift(JSON.parse(JSON.stringify(momentLocaleAST.body[1].expression.right.properties[0].value.elements[0])))
          }
        })
      }
    } else {
      //remove the const statement for moment locale
      customAST.body.forEach((el, index) => {
        if (el.declarations) {
            console.log(el)
          if (el.declarations[0].id.name === "MomentLocalesPlugin") {
            customAST.body.splice(index, 1);
          }  
        }
      })

      webpackObjEntries.properties.forEach((el) => {
        if (el.key.name === "plugins") {
          for (let j = 0; j < el.value.elements.length; j += 1) {
            if (el.value.elements[j].callee) {
              if (el.value.elements[j].callee.name === "MomentLocalesPlugin") {
                el.value.elements.splice(j, 1)
              }
            }
          }
        }
      })
    }
    formattedCode = generate(customAST, {
        comments: true,
    })

    this.setState({checkedMomentLocale: !this.state.checkedMomentLocale, formattedCode, customAST})
  }
  
  render() {
    return (
      <div className={styles.mainContainerHome}>
          <WhiteCardConfigModWelcome />
          { !this.state.formattedCode && <WhiteCardConfigMod onDropFunction={this.onDropFunction} />}
          { this.state.formattedCode && <ConfigModificationInterface 
            checkedMomentLocale={this.state.checkedMomentLocale} 
            formattedCode={this.state.formattedCode}
            handleChangeCheckboxMomentLocale={this.handleChangeCheckboxMomentLocale}
            saveWebpackConfig={this.saveWebpackConfig}
          />}
      </div>
    );
  }
}