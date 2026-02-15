const hiragana = [
{char:"あ",romaji:"a"},{char:"い",romaji:"i"},{char:"う",romaji:"u"},
{char:"え",romaji:"e"},{char:"お",romaji:"o"},
{char:"か",romaji:"ka"},{char:"き",romaji:"ki"},{char:"く",romaji:"ku"},
{char:"け",romaji:"ke"},{char:"こ",romaji:"ko"},
{char:"さ",romaji:"sa"},{char:"し",romaji:"shi"},{char:"す",romaji:"su"},
{char:"せ",romaji:"se"},{char:"そ",romaji:"so"},
{char:"た",romaji:"ta"},{char:"ち",romaji:"chi"},{char:"つ",romaji:"tsu"},
{char:"て",romaji:"te"},{char:"と",romaji:"to"},
{char:"な",romaji:"na"},{char:"に",romaji:"ni"},{char:"ぬ",romaji:"nu"},
{char:"ね",romaji:"ne"},{char:"の",romaji:"no"},
{char:"は",romaji:"ha"},{char:"ひ",romaji:"hi"},{char:"ふ",romaji:"fu"},
{char:"へ",romaji:"he"},{char:"ほ",romaji:"ho"},
{char:"ま",romaji:"ma"},{char:"み",romaji:"mi"},{char:"む",romaji:"mu"},
{char:"め",romaji:"me"},{char:"も",romaji:"mo"},
{char:"や",romaji:"ya"},{char:"ゆ",romaji:"yu"},{char:"よ",romaji:"yo"},
{char:"ら",romaji:"ra"},{char:"り",romaji:"ri"},{char:"る",romaji:"ru"},
{char:"れ",romaji:"re"},{char:"ろ",romaji:"ro"},
{char:"わ",romaji:"wa"},{char:"を",romaji:"wo"},
{char:"ん",romaji:"n"}
];

let current;
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let level = Math.floor(score / 20) + 1;
let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let difficult = JSON.parse(localStorage.getItem("difficult")) || [];

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
updateStats();
updateReview();
}

function nextChar(){
const random = hiragana[Math.floor(Math.random()*hiragana.length)];
document.getElementById("learnChar").textContent=random.char;
document.getElementById("learnRomaji").textContent="Czytanie: "+random.romaji;
}

function newQuiz(){
current = hiragana[Math.floor(Math.random()*hiragana.length)];
document.getElementById("quizChar").textContent=current.char;
}

function checkAnswer(){
const input=document.getElementById("answer").value.toLowerCase();
if(input===current.romaji){
score++;
streak++;
document.getElementById("result").textContent="Dobrze!";
}else{
streak=0;
difficult.push(current);
document.getElementById("result").textContent="Źle! "+current.romaji;
}
localStorage.setItem("score",score);
localStorage.setItem("streak",streak);
localStorage.setItem("difficult",JSON.stringify(difficult));
document.getElementById("answer").value="";
updateLevel();
newQuiz();
}

function updateLevel(){
level=Math.floor(score/20)+1;
document.getElementById("levelInfo").textContent="Poziom: "+level;
const percent=(score%20)*5;
document.getElementById("expFill").style.width=percent+"%";
document.getElementById("expText").textContent="XP: "+score;
}

function updateStats(){
document.getElementById("statsText").textContent="Poprawne odpowiedzi: "+score;
document.getElementById("streakText").textContent="Streak: "+streak;
}

function updateReview(){
const container=document.getElementById("reviewList");
container.innerHTML="";
difficult.slice(-10).forEach(item=>{
const div=document.createElement("div");
div.textContent=item.char+" - "+item.romaji;
container.appendChild(div);
});
}

function resetProgress(){
localStorage.clear();
location.reload();
}

newQuiz();
updateLevel();
