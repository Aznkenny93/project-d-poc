import React from "react";
import Webcam from "react-webcam";
import "../App.css";
import { LayersManager } from "react-layers-manager";
import indicator from "../assets/indicator.png";

class TimedWebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: "", message: "", capture: false };
  }

  //set 1 second timerout for webcam start-up
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ capture: true });
      }.bind(this),
      1000
    );
  }

  // capture photo every time capture == true
  componentDidUpdate() {
    if (this.state.capture == true) {
      this.capture();
    }
  }
  componentWillUnmount() {}

  setRef = webcam => {
    this.webcam = webcam;
  };

  //Capture photo and send request, stop calling capture
  capture = () => {
    const imageSource = this.webcam.getScreenshot();
    this.setState(
      {
        image: imageSource,
       capture: false
      },
      () => this.send_request()
    );
  };

  //send post request to backend, after response set capture == true
  send_request = () => {
    console.log(this.state.image);
    fetch("http://localhost:5000/check/image", {
      method: "POST",
      body: JSON.stringify({
        id: "djdjdj",
        image_string: this.state.image.slice(23)
      }),
      headers: { "Content-Type": "application/json" }
    }).then(
      result => {
        this.setState({
          message: result,
          capture: true
        });
      },
      error => {
        this.setState({
          message: error,
          capture: true
        });
      }
    );
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <>
        <div>
          <LayersManager>
            <div style={{ zIndex: 1, position: "absolute" }} id="webcam">
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                height="720"
                width="1280"
              />
              <img
                id="indicator"
                style={{ zIndex: 2, position: "absolute", top: 1 }}
                src={indicator}
              />
            </div>
          </LayersManager>
        </div>
        <div id="text">{this.state.image}</div>
      </>
    );
  }
}
export default TimedWebcamCapture;
