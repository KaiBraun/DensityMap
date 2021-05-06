const DEFAULT_FILTERS = {
  death: false,
  stayHome: false
}

export const CANVAS_SIZE = {
  height: 880,
  width: 360
}

export const DESKTOP_CANVAS_SIZE = {
  height: 800,
  width: 800
}

export const BALL_RADIUS = 2
export const COLORS = {
  death: '#c50000',
  recovered: '#D88DBC',
  infected: '#5ABA4A',
  well: '#63C8F2',
  mast: '#000000'
}

export const STATES = {
  infected: 'infected',
  well: 'well',
  recovered: 'recovered',
  death: 'death'
}

export const COUNTERS = {
  ...STATES,
  'max-concurrent-infected': 'max-concurrent-infected'
}

export const STARTING_BALLS = {
  [STATES.infected]: 1,
  [STATES.well]: 999,
  [STATES.recovered]: 0,
  [STATES.death]: 0,
  'max-concurrent-infected': 0
}

export const MAST_COUNTERS = {
  mast1Counter: 'mast1Counter',
  mast2Counter: 'mast2Counter',
  mast3Counter: 'mast3Counter',
  mast4Counter: 'mast4Counter',
  mast1CounterRpi: 'mast1CounterRpi',
  mast2CounterRpi: 'mast2CounterRpi',
  mast3CounterRpi: 'mast3CounterRpi',
  mast4CounterRpi: 'mast4CounterRpi'
}

export const STARTING_MASTS = {
  [MAST_COUNTERS.mast1Counter]: 0,
  [MAST_COUNTERS.mast2Counter]: 0,
  [MAST_COUNTERS.mast3Counter]: 0,
  [MAST_COUNTERS.mast4Counter]: 0,
  [MAST_COUNTERS.mast1CounterRpi]: 0,
  [MAST_COUNTERS.mast2CounterRpi]: 0,
  [MAST_COUNTERS.mast3CounterRpi]: 0,
  [MAST_COUNTERS.mast4CounterRpi]: 0
}

export const DENSITY_COUNTERS = {
  mast1CounterDens: 'mast1CounterDens',
  mast2CounterDens: 'mast2CounterDens',
  mast3CounterDens: 'mast3CounterDens',
  mast4CounterDens: 'mast4CounterDens',
  mast1CounterCorrected: 'mast1CounterCorrected',
  mast2CounterCorrected: 'mast2CounterCorrected',
  mast3CounterCorrected: 'mast3CounterCorrected',
  mast4CounterCorrected: 'mast4CounterCorrected',
  mast1CounterDensRpi: 'mast1CounterDensRpi',
  mast2CounterDensRpi: 'mast2CounterDensRpi',
  mast3CounterDensRpi: 'mast3CounterDensRpi',
  mast4CounterDensRpi: 'mast4CounterDensRpi',
  mast1CounterAvg: 'mast1CounterAvg',
  mast2CounterAvg: 'mast2CounterAvg',
  mast3CounterAvg: 'mast3CounterAvg',
  mast4CounterAvg: 'mast4CounterAvg'
}
export const STARTING_DESNITY = {
  [DENSITY_COUNTERS.mast1CounterDens]: 0,
  [DENSITY_COUNTERS.mast2CounterDens]: 0,
  [DENSITY_COUNTERS.mast3CounterDens]: 0,
  [DENSITY_COUNTERS.mast4CounterDens]: 0,
  [DENSITY_COUNTERS.mast1CounterCorrected]: 0,
  [DENSITY_COUNTERS.mast2CounterCorrected]: 0,
  [DENSITY_COUNTERS.mast3CounterCorrected]: 0,
  [DENSITY_COUNTERS.mast4CounterCorrected]: 0,
  [DENSITY_COUNTERS.mast1CounterDensRpi]: 0,
  [DENSITY_COUNTERS.mast2CounterDensRpi]: 0,
  [DENSITY_COUNTERS.mast3CounterDensRpi]: 0,
  [DENSITY_COUNTERS.mast4CounterDensRpi]: 0,
  [DENSITY_COUNTERS.mast1CounterAvg]: 0,
  [DENSITY_COUNTERS.mast2CounterAvg]: 0,
  [DENSITY_COUNTERS.mast3CounterAvg]: 0,
  [DENSITY_COUNTERS.mast4CounterAvg]: 0
}

export const CSV_OUTPUT = {
  mast1CounterOutput: 'mast1CounterOutput',
  mast2CounterOutput: 'mast2CounterOutput',
  mast3CounterOutput: 'mast3CounterOutput',
  mast4CounterOutput: 'mast4CounterOutput'
}
export const CSV_OUTPUT_VALUES = {
  [CSV_OUTPUT.mast1CounterOutput]: [],
  [CSV_OUTPUT.mast2CounterOutput]: [], 
  [CSV_OUTPUT.mast3CounterOutput]: [],
  [CSV_OUTPUT.mast4CounterOutput]: []
}

export const RUN = {
  filters: { ...DEFAULT_FILTERS },
  results: { ...STARTING_BALLS },
  masts: { ...STARTING_MASTS},
  density: { ... STARTING_DESNITY},
  outputs: { ... CSV_OUTPUT_VALUES},
  tick: 0
}

export const download_csv = () => {
  var data = [
    RUN.outputs[CSV_OUTPUT.mast1CounterOutput],
    RUN.outputs[CSV_OUTPUT.mast2CounterOutput], 
    RUN.outputs[CSV_OUTPUT.mast3CounterOutput],
    RUN.outputs[CSV_OUTPUT.mast4CounterOutput]
  ]

  var csv = 'Name,Title\n';
  data.forEach(function(row) {
          csv += row.join(',');
          csv += "\n";
  });

  console.log(csv);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'people.csv';
  hiddenElement.click();
}



export const MORTALITY_PERCENTATGE = 5
export const SPEED = 0.1
export const TOTAL_TICKS = 1600
export const TICKS_TO_RECOVER = 500
export const MAST_PERIOD = 200
export const STATIC_PEOPLE_PERCENTATGE = 25

export const resetRun = () => {
  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
  download_csv()
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
