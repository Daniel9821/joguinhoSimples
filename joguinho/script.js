const boneco = document.querySelector('.boneco');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32 || 30) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          boneco.style.bottom = position + 'px';
        }
      }, 30);
    } else {
      // Subindo
      position += 20;
      boneco.style.bottom = position + 'px';
    }
  }, 30);
}

function createMuro() {
  const muro = document.createElement('div');
  let muroPosition = 1000;
  let randomTime = Math.random() * 5000;

  if (isGameOver) return;

  muro.classList.add('muro');
  background.appendChild(muro);
  muro.style.left = muroPosition + 'px';

  let leftTimer = setInterval(() => {
    if (muroPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(muro);
    } else if (muroPosition > 0 && muroPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over"> Game Over *-*</h1>';
    } else {
      muroPosition -= 10;
      muro.style.left = muroPosition + 'px';
    }
  }, 20);

  setTimeout(createMuro, randomTime);
}

createMuro();
document.addEventListener('keyup', handleKeyUp);