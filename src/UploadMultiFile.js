import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class UploadMultiFile extends React.Component {
  handleChange = event => {
    const { mutate } = this.props;
    const { validity, files } = event.target;
    if (validity.valid) {
      mutate({
        variables: { files }
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
        <p>多文件上传</p>
        <input type="file" multiple required onChange={this.handleChange} />
      </div>
    );
  }
}

export default graphql(gql`
  mutation($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
      filename
      mimetype
      path
    }
  }
`)(UploadMultiFile);
