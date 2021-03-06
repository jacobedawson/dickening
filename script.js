document.addEventListener('DOMContentLoaded', () => {
  const price = document.querySelector('.price');
  const short = document.querySelector('.short');
  const chance = document.querySelector('.chance');
	fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
		.then(res => res.json())
		.then(i => {
      price.innerHTML = (i[0].price_usd).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      short.innerHTML = (1000000 - i[0].price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      chance.innerHTML = ((1000000 - i[0].price_usd).toFixed(2).slice(0,2));
		})
		.catch(err => console.log(err));
});

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

const deadline = '2020-11-29'
initializeClock('clockdiv', deadline);