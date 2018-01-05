var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');
var _ = require('lodash');

const Particle = require('./particle').view;

var Events = {};

var SnakeBody = React.createClass({
  propTypes: {},

  componentDidMount: function () {
    this.interval = setInterval(this.moveSnake, 150);
  },

  componentWillMount () {
    this.state = {
      score: 0,
      dir: 1,
      food: {
        x: parseInt(Math.random() * 282),
        y: parseInt(Math.random() * 282)
      },
      particles: [{
        x: 12,
        y: 12,
        dir: 4
      }]
    };
    document.addEventListener("keydown", this.handleKeyPressed);
  },

  componentWillUnmount () {
    document.removeEventListener("keydown", this.handleKeyPressed);
    clearInterval(this.interval);
  },

  updateCoordinateAccordingToDirection: function (iDirection, x, y, factor) {
    if (iDirection === 1) {
      x += factor;
    } else if (iDirection === 2) {
      y -= factor;
    } else if (iDirection === 3) {
      x -= factor;
    } else if (iDirection === 4) {
      y += factor;
    }
    return {
      x: x,
      y: y
    };
  },

  getOppositeDirection: function (iDirection) {
    if (iDirection === 1) return 3;
    else if (iDirection === 2) return 4;
    else if (iDirection === 3) return 1;
    else if (iDirection === 4) return 2;
  },

  hasSnakeEatenItself: function () {
    let oState = this.state;
    let aSnake = oState.particles;
    let iSnakeLength = aSnake.length;
    let oHead = aSnake[iSnakeLength - 1];
    for (let i = 0; i < iSnakeLength - 1; i++) {
      if (aSnake[i].x === oHead.x && aSnake[i].y === oHead.y) {
        return true;
      }
    }
    return false;
  },

  moveSnake: function () {
    let oState = this.state;
    let oNewParticle = {};
    let aParticles = this.state.particles;
    let iLengthParticles = aParticles.length;
    let iNewScore = oState.score;

    if ((aParticles[iLengthParticles - 1].x >= 12 && aParticles[iLengthParticles - 1].x < 282) &&
        (aParticles[iLengthParticles - 1].y >= 12 && aParticles[iLengthParticles - 1].y < 282) &&
        !this.hasSnakeEatenItself()) {
      let iPrevDir = -1;
      for (let i = iLengthParticles - 1; i >= 0; i--) {
        if (iPrevDir === -1) {
          iPrevDir = aParticles[i].dir;
          aParticles[i].dir = oState.dir;
          if (oState.dir === 1) {
            aParticles[i].x += 12;
          } else if (oState.dir === 2) {
            aParticles[i].y -= 12;
          } else if (oState.dir === 3) {
            aParticles[i].x -= 12;
          } else if (oState.dir === 4) {
            aParticles[i].y += 12;
          }
        } else {
          let z = aParticles[i].dir;
          aParticles[i].dir = iPrevDir;
          let oUpdatedCoords = this.updateCoordinateAccordingToDirection(aParticles[i].dir, aParticles[i].x, aParticles[i].y, 12);
          aParticles[i].x = oUpdatedCoords.x;
          aParticles[i].y = oUpdatedCoords.y;
          iPrevDir = z;
        }
      }

      let iSnakeHeadX = aParticles[iLengthParticles - 1].x;
      let iSnakeHeadY = aParticles[iLengthParticles - 1].y;
      if ((iSnakeHeadX + 10 > oState.food.x && iSnakeHeadX < (oState.food.x + 10)) &&
          (iSnakeHeadY + 10 > oState.food.y && iSnakeHeadY < (oState.food.y + 10))) {

        oNewParticle = this.updateCoordinateAccordingToDirection(iPrevDir, aParticles[iLengthParticles - 1].x, aParticles[iLengthParticles - 1].y, 12);
        oNewParticle.dir = iPrevDir;
        oNewParticle.color = "aliceblue";
        iNewScore++;

        aParticles.push(oNewParticle);
        this.setState({
          food: {
            x: parseInt(Math.random() * 282),
            y: parseInt(Math.random() * 282)
          }
        });
      }

      this.setState({
        particles: aParticles,
        score: iNewScore
      });
    } else {
      if (confirm("!! GAME OVER !!\nDo you Want to RESTART?")) {
        this.setState({
          score: 0,
          dir: 1,
          food: {
            x: parseInt(Math.random() * 282),
            y: parseInt(Math.random() * 282)
          },
          particles: [{
            x: 12,
            y: 12,
            dir: 4
          }]
        });
      } else {
        clearInterval(this.interval);
      }
    }
  },

  handleKeyPressed: function (oEvent) {
    let oState = this.state;
    let iKeyCode = oEvent.keyCode;

    if (iKeyCode === 40) {
      //Down Arrow
      oState.dir = 4;
    } else if (iKeyCode === 39) {
      //Right Arrow
      oState.dir = 1;
    } else if (iKeyCode === 38) {
      //Up Arrow
      oState.dir = 2;
    } else if (iKeyCode === 37) {
      //Left Arrow
      oState.dir = 3;
    }

    // this.setState({
    //   particles: aParticles,
    // });
  },

  render: function () {
    let aParticles = [];
    let oState = this.state;

    _.forEach(this.state.particles, function (oParticle) {
      aParticles.push(<Particle x={oParticle.x}
                                y={oParticle.y}/>);
    });

    return (
        <div className="game">
          <h1>SCORE: {oState.score}</h1>
          <div className="snakeBody" onKeyDown={this.handleKeyPressed}>
            {aParticles}
            <Particle x={oState.food.x} y={oState.food.y} backgroundColor={"blue"}/>
          </div>
        </div>);
  }
});

exports.view = SnakeBody;
exports.event = Events;