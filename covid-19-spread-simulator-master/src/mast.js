import { mastCollision } from './collisions.js';
import {
  BALL_RADIUS,
  COLORS,
  MAST_PERIOD,
  RUN, 
  CSV_OUTPUT_VALUES
} from './options.js';

export class Mast {
  constructor({ x, y, id, sketch }) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.time = 0;
    this.ids = [];
    this.rpis = [];
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
      if (mastCollision({ dx, dy, mastRange: ((BALL_RADIUS +this.range)*(BALL_RADIUS +this.range))  })) {
        this.ids.forEach(element => {
          if (otherBall.id === element[0]) {
            newId = false;
            element[1]++
          }
        })
        if (newId) {
          this.ids.push([otherBall.id,0]);
        }

        let newRpi = true
        this.rpis.forEach(element => {
          if(otherBall.rpi === element[0]) {
            newRpi = false;
            element[1]++
          }
        })
        if(newRpi) {
          this.rpis.push([otherBall.rpi,0])          
        }
      }
    }
    //Update counters on screen
    RUN.masts[this.id] = this.getCounter()
    RUN.masts[this.id + "Rpi"] = this.getRpiCounter()
  }

  getCounter() {
    return this.ids.length
  }
  getRpiCounter() {
    return this.rpis.length
  }
  
  checkState(){
    this.time++;
    if(this.time>MAST_PERIOD){

      //Show data for density map before resetting
      RUN.density[this.id + "Dens"] = this.getCounter()
      RUN.density[this.id + "Corrected"] = this.correctedMastCount()
      RUN.density[this.id + "DensRpi"] = this.getRpiCounter()
      RUN.density[this.id + "Avg"] = this.getAverageDurationOfStay()
      // add values to output csv
      RUN.outputs[this.id + "Output"].push([
        this.getCounter(),
        this.correctedMastCount(),
        this.getRpiCounter(), 
        this.getAverageDurationOfStay()
      ])
      console.log(RUN.outputs[this.id + "Output"])

      //reset counts
      this.time=0;
      this.ids= [];
      this.rpis = [];
    }
  }

  getAverageDurationOfStay() {
    let sum = 0
    this.ids.forEach(element => {
      sum += element[1]
    }) 
    return Math.round(sum/this.ids.length)
  }

  correctedMastCount() {
    return Math.round(this.rpis.length/(1+(this.getAverageDurationOfStay()/MAST_PERIOD)))
  }

  render() {
    this.sketch.fill(COLORS['mast'])
    this.sketch.circle(this.x, this.y, 2*this.range);
  }
}