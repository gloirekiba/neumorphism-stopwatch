const $ = document.getElementById.bind(document);

const stopwatchData = $("stopwatch-data");
const hours = $("hours"),
  minutes = $("minutes"),
  seconds = $("seconds"),
  thirds = $("thirds");

const stopwatchTours = $("stopwatch-tours");
const toggleBtn = $("toggle");

const data = {
  hr: parseInt(hours.textContent) || 0,
  min: parseInt(minutes.textContent) || 0,
  sec: parseInt(seconds.textContent) || 0,
  trd: parseInt(thirds.textContent) || 0,
};

/*
 * Update the timer text content
 */
function update(element, data) {
  element.textContent = data >= 10 ? data : "0" + data;
}

/*
 * Set a new interval to run the timer
 */
let interval;
function run() {
  interval = setInterval(() => {
    update(thirds, ++data.trd);

    if (data.trd === 100) {
      data.trd = 0;
      update(thirds, 0);
      update(seconds, ++data.sec);
    }

    if (data.sec === 60) {
      data.sec = 0;
      update(seconds, 0);
      update(minutes, ++data.min);
    }

    if (data.min === 60) {
      data.min = 0;
      update(minutes, 0);
      update(hours, ++data.hr);
    }
  }, 10);

  stopwatchData.classList.remove("blink");
}

/*
 * Create
 */

function tours() {
  const tour = Object.values(data);

  const div = document.createElement("div");
  const spans = [document.createElement("span"), document.createElement("span")];

  spans[0].innerHTML = `<strong>#${stopwatchTours.children.length + 1}</strong>`;

  spans[1].innerHTML = `${tour[0] ? tour[0] + "&nbsp;" : ""}  ${tour[1]} &nbsp; ${tour[2]}.${
    tour[3]
  }`;

  spans.forEach((span) => {
    div.appendChild(span);
  });

  stopwatchTours.appendChild(div);
  stopwatchTours.scrollTop = stopwatchTours.scrollHeight - 150;
}

/*
 * Remove the interval ton pause the timer
 */
function pause() {
  clearInterval(interval);
  stopwatchData.classList.add("blink");
}

/*
 * Toggle timer state, (pause if running | run if paused)
 */
let isRunning = false;
function toggle() {
  isRunning = isRunning ? false : true;
  isRunning ? run() : pause();

  toggleBtn.classList.toggle("stopwatch__btn--active");
}

function reset() {
  location.reload();
}
