import React from "react";

export default class App extends React.Component {
  state = {
    highestFreqWord: ""
  };

  getHighestFreqWord = async () => {
    var response = await fetch("/api/getHighestFreqWord");
    var resJSON = await response.json();
    // console.log(word.word);
    this.setState({ highestFreqWord: resJSON.word });
  };

  render() {
    return (
      <div>
        <div>
          <span>Highest Frequency Word: </span>
          <span>{this.state.highestFreqWord}</span>
        </div>
        <input
          type="button"
          onClick={this.getHighestFreqWord}
          value="Get Highest FreqWord"
        />
      </div>
    );
  }
}
