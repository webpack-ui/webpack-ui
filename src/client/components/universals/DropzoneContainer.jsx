import * as React from 'react';
import Dropzone from 'react-dropzone'
import styles from '../../stylesheets/modules/universals/DropzoneContainer.module';

export default class DropzoneContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  //TODO: refactor to use async/await   

  render() {
    return (
      <Dropzone onDrop={this.props.onDropFunction}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={{'outline': 'none'}}>
              <input {...getInputProps()} />
              <div className={styles.dropzone}>{this.props.text}</div>
            </div>
          </section>
        )}
      </Dropzone>
    )
  }
}