const button = document.querySelector('.button');
const upgradeButtons = document.querySelectorAll('.upgrade-btn');
const pointsDisplay = document.getElementById('points');
const clickPointsDisplay = document.getElementById('click-points');
const autoPointsDisplay = document.getElementById('auto-points');
const upgrade1CostDisplay = document.getElementById('upgrade1-cost');
const upgrade2CostDisplay = document.getElementById('upgrade2-cost');
const upgrade1BoughtDisplay = document.getElementById('upgrade1-bought');
const upgrade2BoughtDisplay = document.getElementById('upgrade2-bought');
const messageDisplay = document.getElementById('message');
const heart = document.getElementById('heart');
const slash = document.getElementById('slash');
const mob = document.querySelector('.mob');
// wtf 2 floor?
const floorElement = document.getElementById('floor');
const h1Element = document.getElementById('floor');
const totalpointsElement = document.getElementById('totalpoints');
const totalpointsDisplay = document.getElementById('totalpoints');

let totalpoints = 0;
let points = 0;
let clickMultiplier = 1;
let autoClickMultiplier = 1;
let autoPointsPerSecond = 0;
let upgrade1Cost = 10;
let upgrade2Cost = 100;
let upgrade1Bought = 0;
let upgrade2Bought = 0;
let floor2 = false;
let interval = 1000;
let token = 1000;
let token1Bought = 0;
let token2Bought = 0;
let token3Bought = 0;
let tokenboost1 = 0;
let tokenboost2 = 0;
let tokenboost3 = 0;


// pour les token
const tokenDisplay = document.getElementById('token')
const token1BoughtDisplay = document.getElementById('token1-bought');
const token2BoughtDisplay = document.getElementById('token2-bought');
const token3BoughtDisplay = document.getElementById('token3-bought');
// tokenclick multiplier
const tokenclickdisplay = document.getElementById('tokenclick')
let tokenclick = 1
const tokenautoclickdisplay = document.getElementById('tokenautoclick')
let tokenautoclick = 1
//token boost affichage
const tokenboost1Display = document.getElementById('tokenboost1');
const tokenboost2Display = document.getElementById('tokenboost2');
const tokenboost3Display = document.getElementById('tokenboost3');

//affichage des boost de token
function updatetokenboost() {
  const totalpointsDisplay = document.getElementById('totalpoints');
  totalpointsDisplay.textContent = totalpoints;
}




// totale des points
function updatetotalpoints() {
  const totalpointsDisplay = document.getElementById('totalpoints');
  totalpointsDisplay.textContent = totalpoints;
}

// click + bonus du click + token bonus
button.addEventListener('click', () => {
  points += clickMultiplier*tokenclick;
  totalpoints += clickMultiplier*tokenclick;
  pointsDisplay.textContent = points;
  totalpointsDisplay.textContent = totalpoints;
  showHeart();
  showslash();
});

// upgrade du click et upgrade du click par second
upgradeButtons.forEach((upgradeButton) => {
  upgradeButton.addEventListener('click', () => {
    if (upgradeButton.id === 'upgrade1') {
      if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        clickMultiplier++;
        upgrade1Cost *= 1.5;
        upgrade1Cost = Math.round(upgrade1Cost)
        upgrade1CostDisplay.textContent = upgrade1Cost;
        upgrade1Bought++;
        upgrade1BoughtDisplay.textContent = upgrade1Bought;
      } else {
        showMessage("Not enough points to purchase Upgrade 1");
      }
    } else if (upgradeButton.id === 'upgrade2') {
      if (points >= upgrade2Cost) {
        points -= upgrade2Cost;
        autoPointsPerSecond++;
        upgrade2Cost *= 1.5;
        upgrade2Cost = Math.round(upgrade2Cost)
        upgrade2CostDisplay.textContent = upgrade2Cost;
        upgrade2Bought++;
        upgrade2BoughtDisplay.textContent = upgrade2Bought;
      } else {
        showMessage("Not enough points to purchase Upgrade 2");
      }
    }
    pointsDisplay.textContent = points;
    clickPointsDisplay.textContent = clickMultiplier*tokenclick;
    autoPointsDisplay.textContent = autoPointsPerSecond*tokenautoclick;
  });
});

// je crois l'interval du autopoint
setInterval(() => {
  points += autoPointsPerSecond;
  totalpoints += autoPointsPerSecond;
  pointsDisplay.textContent = points;
  totalpointsDisplay.textContent = totalpoints;
}, interval);

// je crois les message d'erreurs
function showMessage(message) {
  messageDisplay.textContent = message;
  setTimeout(() => {
    messageDisplay.textContent = "";
  }, 2000);
}


// les slash qui apparraisent 
button.addEventListener('click', () => {
  const mobRect = mob.getBoundingClientRect();

  const mobWidth = mobRect.width;
  const mobHeight = mobRect.height;
  const mobTop = mobRect.top;
  const mobLeft = mobRect.left;

  const randomX = Math.random() * mobWidth + mobLeft - window.scrollX;

  // Adjust the Y position to be higher
  const offsetY = 50; // Adjust this value to raise or lower the slash position
  const randomY = Math.random() * mobHeight + mobTop - window.scrollY - offsetY;

  // Position the slash effect
  slash.style.left = `${randomX}px`;
  slash.style.top = `${randomY}px`;
  slash.style.display = 'block'; // Show the slash

  // Hide the slash after a short duration
  setTimeout(() => {
    slash.style.display = 'none'; // Hide the slash
  }, 300); // Adjust this duration as needed


  
  // +2 point 1er palier
  if (totalpoints >= 100 && !floor2) {
    clickMultiplier += 2;
    floor2 = true; // Set the flag to true after doubling the points
    h1Element.style.backgroundColor = 'yellow';
    floorElement.textContent = 'Floor 2';
    clickPointsDisplay.textContent = clickMultiplier
  }

  // affiche les points gagné
  updatePoints();
  updatetotalpoints();
}); //obligé de fermé l'accolade ici va savoir pourquoi sinon le shop ouvre pas le code marche c'est tout ce qui compte


// affiche les points gagné
function updatePoints() {
  const pointsElement = document.getElementById('points');
  pointsElement.textContent = points.tofixed(1);
}

// le timer button + change de couleur

document.addEventListener('DOMContentLoaded', () => {
  const startTimerButton = document.querySelector('.start-timer-button');
  const timerDisplay = document.querySelector('.timer');
  const cancelButton = document.querySelector('.cancel-button');
  const body = document.querySelector('body');
  let timerRunning = false;
  let timerInterval;

  startTimerButton.addEventListener('click', () => {
    if (!timerRunning) {
      const timerDuration = 30; // 30 seconds
      let timeLeft = timerDuration;

      timerRunning = true;
      timerDisplay.style.display = 'block';
      cancelButton.style.display = 'inline';
      timerDisplay.textContent = 'Time left: ' + timeLeft + 's';

      // Change background color to red
      body.style.backgroundImage = 'url("https://wallpapercave.com/wp/wp8082884.jpg")';

      timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = 'Time left: ' + timeLeft + 's';

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = 'Time\'s up!';
          timerRunning = false;

          // Reset background color to default (or any other color)
          document.body.style.backgroundColor = '';
        }
      }, 1000);
    }
  });

//bouton cancel du boss
  cancelButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerDisplay.style.display = 'none';
    cancelButton.style.display = 'none';
    timerDisplay.textContent = 'Time left:';

    // Reset background color to default (or any other color)
    body.style.backgroundImage = '';
  });
});

//token shop
const shopButton = document.querySelector('.shop-button');
const shop = document.querySelector('.shop');

shopButton.addEventListener('click', () => {
  if (shop.style.display === 'none') {
    shop.style.display = 'block';
    shopButton.textContent = 'Close Shop';
  } else {
    shop.style.display = 'none';
    shopButton.textContent = 'Open Shop';
  }
});

// totale des points
function updatetoken() {
  const tokenDisplay = document.getElementById('token');
  tokenDisplay.textContent = token;
};

updatetoken();

// token upgrade
upgradeButtons.forEach((upgradeButton) => {
  upgradeButton.addEventListener('click', () => {
    if (upgradeButton.id === 'permanentUpgrade1') {
      if (token >= 5) {
        token -= 5;
        interval -= 100;
        token1Bought++;
        token1BoughtDisplay.textContent = token1Bought;
        tokenboost1 += 0.1;
        tokenboost1Display.textContent = tokenboost1;
        updatetoken();
        setInterval();
      } else {
        showMessage("Not enough token to purchase this");
      }
    } else if (upgradeButton.id === 'permanentUpgrade2') {
      if (token >= 20) {
        tokenclick += 0.25;
        clickMultiplier = Math.ceil(clickMultiplier);
        token -= 20;
        token2Bought++;
        tokenboost2 += 25;
        token2BoughtDisplay.textContent = token2Bought
        tokenboost2Display.textContent = tokenboost2
        updatetoken();
      } else {
        showMessage("Not enough token to purchase this");
      }
    } else if (upgradeButton.id === 'permanentUpgrade3') {
      if (token >= 30) {
        token -= 30;
        tokenautoclick += 0.1;
        token3Bought++;
        tokenboost3 += 10;
        token3BoughtDisplay.textContent = token3Bought
        tokenboost3Display.textContent = tokenboost3
        updatetoken();
      } else {
        showMessage("Not enough token to purchase this");
      }
    }pointsDisplay.textContent = points;
    clickPointsDisplay.textContent = clickMultiplier*tokenclick;
    autoPointsDisplay.textContent = autoPointsPerSecond*tokenautoclick;
  });
});

const arrondiSuperieur = Math.ceil(nombre);
console.log(arrondiSuperieur);