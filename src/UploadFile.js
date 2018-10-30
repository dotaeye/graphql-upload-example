import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
// import uploadsQuery from "./queries/uploads";

class UploadFile extends React.Component {
  handleChange = event => {
    const { mutate } = this.props;
    const {
      validity,
      files: [file]
    } = event.target;
    if (validity.valid) {
      mutate({
        variables: { file }
      });
    }
  };
  render() {
    return (
      <div
        style={{
          margin: "20px 0",
          padding: 10,
          backgroundColor: "#eee"
        }}
      >
        <p>单文件上传</p>
        <input type="file" required onChange={this.handleChange} />
      </div>
    );
  }
}

export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      path
    }
  }
`)(UploadFile);
