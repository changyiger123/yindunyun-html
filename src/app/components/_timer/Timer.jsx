import React from 'react';
import { Button } from "antd";
let secondsToHms = (d) =>{
  d = parseInt(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor(d % 3600 / 60);
  let s = Math.floor(d % 3600 % 60);
  return (
    (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
  )
}

class Timer extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      sessionName:'work',
      timeLeft:25,
    }
  }
  toggleTimer(){
    let timeNumber = this.state.timeLeft;
    let secs = 60 * timeNumber;
    const self = this;
    function updateTime(){
      self.setState({
        timeLeft:secondsToHms(secs),
      });
      secs--;
    }
    setInterval(updateTime,1000);
  }
  render() {
    return (
      <Button size="large" onClick={this.toggleTimer.bind(this)}>获取验证码</Button>
    )
  }
}
export default Timer;