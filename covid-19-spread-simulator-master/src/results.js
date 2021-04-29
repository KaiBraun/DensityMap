import {
  COLORS,
  RUN,
  TOTAL_TICKS,
  STATES,
  COUNTERS,
  MAST_COUNTERS,
  resetRun
} from './options.js'

import {
  graphElement,
  replayElement
} from './dom.js'

let graphPoint = 0
const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches

const domElements = Object.fromEntries(
  Object.keys(COUNTERS).map(state => {
    const el = document.getElementById(state)
    if (el) {
      el.parentNode.style = `color: ${COLORS[state]}`
    }
    return [state, document.getElementById(state)]
  })
)

const mastDomElements = Object.fromEntries(
  Object.keys(MAST_COUNTERS).map(mast => {
    const el = document.getElementById(mast)
    return [mast, document.getElementById(mast)]
  })
)

const updateGraph = () => {
  let y = 0
  const rects = Object.entries(RUN.results).map(([state, count]) => {
    const color = COLORS[state]
    if (count > 0) {
      const percentatge = count / 2000 * 50
      const rect = `<rect height="${percentatge}" y="${y}" width="1" fill="${color}"></rect>`
      y += percentatge
      return rect
    }
    return ''
  }).join('')

  const newGraphPoint = `<g transform="translate(${graphPoint},0)">${rects}</g>`
  graphPoint++
  graphElement.insertAdjacentHTML('beforeend', newGraphPoint)
}

const updateMasts = () => {
  Object.entries(mastDomElements).forEach(([mast,mastDomElement]) => {
    if(mastDomElement) {
      mastDomElement.innerText = RUN.masts[mast]
    }
  })
}

export const resetValues = (isDesktopNewValue = isDesktop) => {
  graphElement.innerHTML = ''
  replayElement.style.display = 'none'
  graphPoint = 0
  isDesktop = isDesktopNewValue
  resetRun()
}

export const updateCount = () => {
  if (RUN.tick < TOTAL_TICKS) {
    // calculate max concurrent infected
    if (RUN.results[STATES.infected] > RUN.results['max-concurrent-infected']) {
      RUN.results['max-concurrent-infected']++
    }

    Object.entries(domElements).forEach(([state, domElement]) => {
      if (domElement) {
        domElement.innerText = RUN.results[state]
      }
    })
    

    Object.entries(mastDomElements).forEach(([mast,mastDomElement]) => {
      if(mastDomElement) {
        mastDomElement.innerText = RUN.masts[mast]
      }
    })
    //updateMasts();

    if (isDesktop) {
      RUN.tick % 2 === 0 && updateGraph()
    } else {
      RUN.tick % 4 === 0 && updateGraph()
    }
  }

  if (RUN.tick === TOTAL_TICKS) {
    replayElement.style.display = 'flex'
  } else {
    RUN.tick++
  }
}
