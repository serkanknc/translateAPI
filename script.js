const fromLang = document.getElementById("from-lang");
const toLang = document.getElementById("to-lang");
const btnTranslate = document.getElementById("btnTranslate");
const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

for (let lang in languages){
    let option = `
        <option value ="${lang}">${languages[lang]}</option> 
    `;
    fromLang.insertAdjacentHTML("beforeend",option);
    toLang.insertAdjacentHTML("beforeend",option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

btnTranslate.addEventListener("click",() =>{
    let text = fromText.value;
    let fLang = fromLang.value;
    let tLang = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fLang}|${tLang}`;

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            toText.value =data.responseData.translatedText;
        });
});

exchange.addEventListener("click", ()=>{
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value= text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});

for(let icon of icons){
    icon.addEventListener("click",(e)=>{
        if (e.target.classList.contains("fa-copy")) {
            if(e.target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            } else{
                navigator.clipboard.writeText(toText.value);
            }
        } else{
            let utterance;
            if(e.target.id =="from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    })
}
