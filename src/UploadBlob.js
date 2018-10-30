import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class UploadBlob extends Component {
  state = {
    name: "",
    content: ""
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = event => {
    event.preventDefault();

    const file = new Blob([this.state.content], { type: "text/plain" });
    file.name = `${this.state.name}.txt`;

    this.props.mutate({
      variables: { file }
    });
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
        <p>blob 文件上传</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="name"
              placeholder="Name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />{" "}
            .txt
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Content"
              required
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>

          <button>Upload</button>
        </form>
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
`)(UploadBlob);
