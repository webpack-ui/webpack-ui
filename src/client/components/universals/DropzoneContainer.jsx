import * as React from 'react';
import Dropzone from 'react-dropzone'
import styles from '../../stylesheets/modules/universals/DropzoneContainer.module';
import { FiFileText } from "react-icons/fi";

export default class DropzoneContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  //TODO: refactor to use async/await   


  render() {
    const iconStyle = {
      fontSize: '30px',
      color: '#465e69'
    };
    return (
      <Dropzone onDrop={this.props.onDropFunction}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={{'outline': 'none'}}>
              <input {...getInputProps()} />
              <div className={styles.dropzone}>
              <FiFileText style={iconStyle} />
              {this.props.text}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    )
  }
}