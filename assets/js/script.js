document.addEventListener('DOMContentLoaded', function() {
  var terminalContainer = document.getElementById('terminal');
  var terminalText = document.getElementById('terminal-text');
  var videoBackground = document.getElementById('myVideo');
  var audioBackground = document.getElementById('myAudio');
  var blurredBox = document.getElementById('blurred-box');
  var closeButton = document.getElementById('close-button');

  // Initial terminal text content
  var terminalTextContent = [
      "Welcome clown🤡",
      "IP: Loading...",
      "System: Loading...",
      "Bio Loaded",
      "Press Enter To Continue",
  ];
  var currentIndex = 0;


  videoBackground.pause();
  audioBackground.pause();

  function typeWriter() {
      var line = currentIndex === 0 ? getAsciiArt() : terminalTextContent[currentIndex - 1];
      var i = 0;

      function typeChar() {
          if (i < line.length) {
              terminalText.textContent += line.charAt(i);
              i++;
              setTimeout(typeChar, 30);
          } else {
              terminalText.textContent += "\n";
              currentIndex++;
              if (currentIndex < terminalTextContent.length + 1) {
                  typeWriter();
              } else {
                  addEventListeners(); 
              }
          }
      }

      typeChar();
  }


  function handleInput() {
      terminalContainer.style.display = 'none';
      videoBackground.play();
      audioBackground.play();
      blurredBox.style.display = 'block';
      removeEventListeners();
  }


  function addEventListeners() {
      document.addEventListener('keydown', handleKeyPress);
      terminalContainer.addEventListener('click', handleInput); 
  }


  function removeEventListeners() {
      document.removeEventListener('keydown', handleKeyPress);
      terminalContainer.removeEventListener('click', handleInput);
  }


  function handleKeyPress(event) {
      if (event.key === 'Enter') {
          handleInput();
      }
  }


  closeButton.addEventListener('click', function() {
      handleInput();
  });


  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;
          terminalTextContent[1] = "IP: " + ipAddress;
          typeWriter();
      })
      .catch(error => {
          console.error('Error fetching IP address:', error);
          terminalTextContent[1] = "IP: Unable to fetch IP address";
          typeWriter();
      });

  var userAgent = navigator.userAgent;
  var systemInfo;
  
  function getOperatingSystem() {
      if (userAgent.match(/Windows/)) {
          return getWindowsVersion();
      } else if (userAgent.match(/Macintosh/)) {
          return getMacOSVersion();
      } else if (userAgent.match(/Linux/)) {
          return "Linux";
      } else if (userAgent.match(/Android/)) {
          return getAndroidVersion();
      } else if (userAgent.match(/iPhone|iPad|iPod/)) {
          return getiOSVersion();
      } else {
          return "Unknown";
      }
  }
  
  function getWindowsVersion() {
      var version = userAgent.match(/Windows NT ([\d.]+)/);
      if (version) {
          version = version[1];
          switch (version) {
              case "5.1":
                  return "Windows XP";
              case "6.0":
                  return "Windows Vista";
              case "6.1":
                  return "Windows 7";
              case "6.2":
                  return "Windows 8";
              case "6.3":
                  return "Windows 8.1";
              case "10.0":
                  return "Windows 10";
              case "10.0":
                  return "Windows 11";
              default:
                  return "Windows";
          }
      } else {
          return "Windows";
      }
  }
  
  function getMacOSVersion() {
      var version = userAgent.match(/Mac OS X ([\d_]+)/);
      if (version) {
          version = version[1].replace(/_/g, '.');
          return "macOS " + version;
      } else {
          return "macOS";
      }
  }
  
  function getAndroidVersion() {
      var version = userAgent.match(/Android ([\d.]+)/);
      if (version) {
          return "Android " + version[1];
      } else {
          return "Android";
      }
  }
  
  function getiOSVersion() {
      var version = userAgent.match(/OS ([\d_]+)/);
      if (version) {
          version = version[1].replace(/_/g, '.');
          return "iOS " + version;
      } else {
          return "iOS";
      }
  }
  
  var operatingSystem = getOperatingSystem();
  terminalTextContent[2] = "System: " + operatingSystem;

  function centerTerminal() {
      var terminalWidth = terminalContainer.offsetWidth;
      var terminalHeight = terminalContainer.offsetHeight;
      var centerX = (window.innerWidth - terminalWidth) / 2;
      var centerY = (window.innerHeight - terminalHeight) / 2;

      terminalContainer.style.position = 'absolute';
      terminalContainer.style.left = centerX + 'px';
      terminalContainer.style.top = centerY + 'px';
  }

  centerTerminal();
  window.addEventListener('resize', centerTerminal);

  terminalText.style.textAlign = 'center';

  function getAsciiArt() {
      return `
            
  `;
  }

  var audio = document.getElementById("myAudio");

  var maxVolume = 0.2;

  function limitVolume(volume) {
      if (volume > maxVolume) {
          audio.volume = maxVolume; 
      } else {
          audio.volume = volume;
      }
  }

  limitVolume(0.2);
}); 

// Pobranie elementu blurred-box
// Pobranie elementu blurred-box
const blurredBox = document.getElementById('blurred-box');

// Funkcja obsługująca efekt przechylenia
function handleMouseMove(event) {
  const screenWidth = window.innerWidth; // Szerokość ekranu
  const screenHeight = window.innerHeight; // Wysokość ekranu
  const mouseX = event.clientX; // Pozycja kursora na osi X
  const mouseY = event.clientY; // Pozycja kursora na osi Y

  // Normalizacja pozycji kursora (wartości -1 do 1)
  const normalizedX = (mouseX / screenWidth) * 2 - 1; // -1 (lewa) do 1 (prawa)
  const normalizedY = (mouseY / screenHeight) * 2 - 1; // -1 (góra) do 1 (dół)

  // Maksymalne przechylenie
  const maxTilt = 15; // W stopniach

  // Oblicz przechylenie na podstawie pozycji kursora
  const tiltX = normalizedY * maxTilt * -1; // Góra/dół
  const tiltY = normalizedX * maxTilt; // Lewo/prawo

  // Ustaw transformację elementu
  blurredBox.style.transform = `
    translate(-50%, -50%)
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg)
  `;
}

// Funkcja resetująca efekt
function resetTilt() {
  blurredBox.style.transform = 'translate(-50%, -50%)';
}

// Dodanie nasłuchiwania na zdarzenia
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseleave', resetTilt);


  
  
  document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.getElementById('animated-text');
    const typingTexts = ["soon bio website like guns.lol/ez-bio by me"];
    let typingIndex = 0; 
    let charIndex = 0; 
    let isDeleting = false;

    function typeEffect() {
        const currentText = typingTexts[typingIndex]; 
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true; 
            setTimeout(typeEffect, 300)
        }
        else if (isDeleting && charIndex === 0) {
            isDeleting = false; 
            typingIndex = (typingIndex + 1) % typingTexts.length; 
            setTimeout(typeEffect, 300)
        }
        else {
            setTimeout(typeEffect, isDeleting ? 100 : 150);
        }
    }
    typeEffect();
});

function createSnowflake() {
    const snowContainer = document.getElementById('snow-container'); // Kontener śniegu
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Losowe parametry śnieżynki
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // Czas opadania 2-5 sekund
    snowflake.style.opacity = Math.random();
    snowflake.style.width = snowflake.style.height = Math.random() * 10 + 5 + 'px'; // Rozmiar 5-15px

    // Dodanie śnieżynki do kontenera
    snowContainer.appendChild(snowflake);

    // Usunięcie śnieżynki po zakończeniu animacji
    setTimeout(() => {
        snowflake.remove();
    }, 5000); // Usunięcie po 5 sekundach
}

// Tworzenie śnieżynki co 200ms
setInterval(createSnowflake, 200);

// Pobranie elementów
const audioElement = document.getElementById('myAudio');
const volumeSlider = document.getElementById('volume-slider');

// Ustawienie początkowej głośności na 50% (czyli suwak pokazuje 50%)
audioElement.volume = 0.1 / 2; // Ograniczenie do 50%

// Obsługa zmiany głośności
volumeSlider.addEventListener('input', (event) => {
  const sliderValue = event.target.value; // Wartość z suwaka (od 0 do 1)
  audioElement.volume = sliderValue / 2; // Ustawienie rzeczywistej głośności (maksymalnie 50%)
});


