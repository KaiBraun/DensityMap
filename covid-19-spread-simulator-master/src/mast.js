import { mastCollision } from './collisions.js';
import {
  BALL_RADIUS,
  COLORS
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
    for (let i = this.id + 1; i < others.length; i++) {
      const otherBall = others[i]
      const { state, x, y } = otherBall
      const dx = x - this.x
      const dy = y - this.y

      const newId = true;
      if (mastCollision({ dx, dy, mastRange: BALL_RADIUS * 20 })) {

        this.ids.forEach(element => {
          if (otherBall.id == element) {
            newId = false;
          }
        });
        if (newId) {
          this.counter++
          this.ids.push(this.id);
        }
      }
    }
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