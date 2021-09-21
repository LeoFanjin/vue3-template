export const initClock = () => {
  let dom = document.getElementById('clock');
  let ctx = dom.getContext('2d');
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let r = width / 2;

  function drawBackground() {
    ctx.save();
    ctx.translate(r, r); //重置canvas画布原点
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.arc(0, 0, r - 4, 0, 2 * Math.PI, false); //弧度  360°  弧度 是 2 * Math.PI
    ctx.stroke();

    let hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    hourNumbers.forEach(function (number, i) {
      let rad = ((2 * Math.PI) / 12) * i;
      let x = Math.cos(rad) * (r - 22);
      let y = Math.sin(rad) * (r - 22);
      ctx.fillText(number, x, y);
    });

    for (let i = 0; i < 60; i++) {
      let rad = ((2 * Math.PI) / 60) * i;
      let x = Math.cos(rad) * (r - 11);
      let y = Math.sin(rad) * (r - 11);
      ctx.beginPath();
      if (i % 5 == 0) {
        ctx.fillStyle = '#000';
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
      } else {
        ctx.fillStyle = '#ccc';
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
      }
      ctx.fill();
    }
  }

  function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    let rad = ((2 * Math.PI) / 12) * hour;
    let mrad = ((2 * Math.PI) / 12 / 60) * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    let rad = ((2 * Math.PI) / 60) * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r + 23);
    ctx.stroke();
    ctx.restore();
  }

  function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    let rad = ((2 * Math.PI) / 60) * second;
    ctx.rotate(rad);
    ctx.fillStyle = '#c14543';
    ctx.moveTo(-2, 20);
    ctx.lineTo(2, 20);
    ctx.lineTo(1, -r + 18);
    ctx.lineTo(-1, -r + 18);
    ctx.fill();
    ctx.restore();
  }

  function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  setInterval(function () {
    second++;
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 60) {
      minute = 0;
      hour++;
    }
    if (hour == 13) {
      hour = 1;
    }
    draw(hour, minute, second);
  }, 1000);

  function draw(hour, minute, second) {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
  }
  draw(hour, minute, second);
};
