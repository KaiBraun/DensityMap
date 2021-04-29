import { mastCollision } from './collisions.js';
import {
  BALL_RADIUS,
  COLORS,
  MAST_PERIOD
} from './options.js';

export class Mast {
  constructor({ x, y, id, sketch }) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.time = 0;
    this.ids = [];
    this.range = BALL_RADIUS * 20;
    this.sketch = sketch
  }


  mastCollisions({ others }) {
    for (let i = 0; i < others.length; i++) {
      const otherBall = others[i]
      const { state, x, y } = otherBall
      const dx = x - this.x
      const dy = y - this.y

      let newId = true;
      if (mastCollision({ dx, dy, mastRange: BALL_RADIUS * 20 })) {
        this.ids.forEach(element => {
          if (otherBall.id === element) {
            newId = false;
          }
        })
        if (newId) {
          this.ids.push(otherBall.id);
        }
      }
    }
  }

  getCounter() {
    return this.ids.length
  }
  
  checkState(){
    this.time++;
    if(this.time>MAST_PERIOD){
      this.time=0;
      this.ids= [];
    }
  }
  render() {
    this.sketch.fill(COLORS['mast'])
    this.sketch.circle(this.x, this.y, this.range);
    this.sketch.ellipse(this.x, this.y, this.range, this.range)
  }
}