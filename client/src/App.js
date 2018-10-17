import React from 'react';

class App extends React.Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/stats');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {

    let answertext;
    if(this.state.response && this.state.response.lastGame === 'W') {
      answertext = <div className='text'>Yes</div>
    } else if(this.state.response.lastGame === 'L') {
      answertext = <div className='text'>No</div>
    } else {
      answertext = <div className='logo loading'><img src='/img/logo.svg' /></div>
    }

    return (
        <>
        {answertext}
        </>


    );

}
}

export default App
