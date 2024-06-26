const urlSt = "http://api.voicerss.org/?key=";
const apiKey = 'abe36672d92945aa80e54976f5a8efc3';
//get data from JSON
async function getData() {
  try {
    const response = await fetch('scrapeOutput.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Fetch error:', error);
  }
}
//whloe function
document.addEventListener('DOMContentLoaded', function() {

  getData()
    .then(data => {
      //get list of languages and show drop-down menu
      const langDrpDwn = document.getElementById("lang-dropdown");
      Object.keys(data).forEach((el, index) => {
        const langOption = document.createElement("option");
        langOption.className = "langOpt";
        langOption.textContent = el;
        langDrpDwn.appendChild(langOption);
      });
      //Get language selection as a variable for url
      let languageChoice;
      let voiceDrpDwn;
      let voiceChoice = '';
      langDrpDwn.addEventListener("change", function() {
        x = langDrpDwn.options[langDrpDwn.selectedIndex].value;
        languageChoice = '&hl=' + ((Object.values(data[x].LanguageCode)).join(''));
        //Get list of voices of the language and show drop-down menu
        voiceDrpDwn = document.getElementById("voice-dropdown")
        voiceDrpDwn.innerHTML = "<option>Voice</option>";
        Object.values(data[x].Voice.Female).forEach((el) => {
          voiceOption = document.createElement("option");
          voiceOption.className = "VoiOpt";
          voiceOption.textContent = ["Female :" + el];
          voiceDrpDwn.appendChild(voiceOption);
        })
        Object.values(data[x].Voice.Male).forEach((el) => {
          voiceOption = document.createElement("option");
          voiceOption.className = "VoiOpt";
          voiceOption.textContent = ["Male :" + el];
          voiceDrpDwn.appendChild(voiceOption);
        })
        //Get voice selection as a variable for url
        voiceDrpDwn.addEventListener("change", (event) => {
          x = event.target.value
          if (x === '' || x === 'Voice') {
            voiceChoice = ''
          } else
            voiceChoice = ('&v=' + x.substring(x.indexOf(':') + 1, x.length));
          return voiceChoice;
        })
      });
      //Get text content
      const inputArea = document.getElementById("text-input");
      let textInput;
      inputArea.addEventListener("input", (event) => {
        textInput = '&src=' + encodeURIComponent(event.target.value);
        return textInput;
      })
      //fetch whole api link with variables by clicking submit-btn
      const speakBtn = document.getElementById("submit-btn");
      speakBtn.addEventListener("click", function() {
        let newUrl = `${urlSt}${apiKey}${languageChoice}${voiceChoice}${textInput}`;
        console.log(newUrl);
        // create audio element, show as hidden + auto play attribute + delete after   play
        const audioContainer = document.getElementById("audio-container")
        audioContainer.innerHTML = '';
        x = document.createElement("AUDIO");
        x.autoplay = true;
        x.src = newUrl;
        audioContainer.appendChild(x)
      });
    })
    .catch(err => { console.error('Error reading or parsing JSON:', err); });
});