import {
    BALL_RADIUS,
    COLORS,
    MORTALITY_PERCENTATGE,
    TICKS_TO_RECOVER,
    RUN,
    SPEED,
    STATES
  } from './options.js'
  import { checkCollision, calculateChangeDirection } from './collisions.js'

  export class mast {
      constructor({x,y,sketch}) {
        this.x = x;
        this.y = y;
        
      }
  }