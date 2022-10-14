import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { marked } from "marked";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: ""
    }
  }

  // Learned from this post, https://stackoverflow.com/a/42928796
  componentDidMount() {
    const textPath = require("./text.md");

    fetch(textPath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          markdown: text
        })
      })
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }

  render() {
    const styleContainer = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "column wrap",
    };
    const styleRow = {
      flexFlow: "row wrap"
    };
    const styleCol = {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      margin: "30px"
    };
    const styleBadge = { 
      width: "60px"
    };
    const styleInput = {
      border: "1px solid silver",
      backgroundColor: "white",
      borderRadius: "5px",
      padding: "10px"
    }
    const styleOutput = {
      width: "72%",
      border: "1px solid silver",
      backgroundColor: "#DCDCDC",
      borderRadius: "5px",
      padding: "10px"
    };
    return (
      <div className="App">
        <Container fluid style={styleContainer}>
          <Row style={styleRow}>
            <h1 className="text-center text-primary">Markdown Previewer</h1>
            <Col style={styleCol}>
              <Badge bg="secondary" style={styleBadge}>Input</Badge>
              {/* Input field, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols */}
              <label htmlFor="editor">
                <textarea 
                  id="editor" 
                  placeholder="Enter text" 
                  rows="10" cols="45" wrap="hard"
                  style={styleInput}
                  value={this.state.markdown}
                  onChange={(e) => {this.updateMarkdown(e.target.value)}}
                >
                </textarea>
              </label>
            </Col>
            <Col  style={styleCol}>
              <Badge bg="primary" style={styleBadge}>Output</Badge>
              {/* Output field */}
              <div
                style={styleOutput} 
                id="preview"
                dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
              >
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

