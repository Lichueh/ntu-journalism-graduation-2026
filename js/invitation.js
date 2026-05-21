(function () {
  'use strict';

  const body = document.body;
  const replayBtn = document.querySelector('.replay-btn');

  // Sequence milestones (ms from start)
  const TIMING = {
    opening:     4000,   // after envelope fully sunk + paper extracted
    sequenceEnd: 7400,   // when replay button appears
  };

  let timers = [];

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function play() {
    clearTimers();
    body.classList.remove('playing', 'opening');
    if (replayBtn) replayBtn.classList.remove('show');

    // force reflow so animations / transitions restart cleanly
    void body.offsetWidth;

    body.classList.add('playing');

    timers.push(setTimeout(() => body.classList.add('opening'), TIMING.opening));
    timers.push(setTimeout(() => {
      if (replayBtn) replayBtn.classList.add('show');
    }, TIMING.sequenceEnd));
  }

  window.addEventListener('load', () => {
    setTimeout(play, 100);
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', play);
  }
})();
