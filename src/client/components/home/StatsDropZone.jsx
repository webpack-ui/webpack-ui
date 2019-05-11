import * as React from 'react';
import Dropzone from 'react-dropzone'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class StatsDropzone extends React.Component{
    constructor(props){
        super(props)
    }
  //TODO: refactor to use asyn/await   

  render() {
  return (
    <Dropzone onDrop={this.props.onDropFunction}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
}