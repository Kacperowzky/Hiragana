const hiragana = [
{char:"あ", romaji:"a"},
{char:"い", romaji:"i"},
{char:"う", romaji:"u"},
{char:"え", romaji:"e"},
{char:"お", romaji:"o"},
{char:"か", romaji:"ka"},
{char:"き", romaji:"ki"},
{char:"く", romaji:"ku"},
{char:"け", romaji:"ke"},
{char:"こ", romaji:"ko"}
];

let learnIndex = 0;
let quizIndex = 0;
let score = 0;

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function nextChar() {
    const item = hiragana[learnIndex];
    document.getElementById("learnChar").textContent = item.char;
    document.getElementById("learnRomaji").textContent = "Czytanie: " + item.romaji;

    learnIndex++;
    if (learnIndex >= hiragana.length) learnIndex = 0;
}

function loadQuiz() {
    const item = hiragana[quizIndex];
    document.getElementById("quizChar").textContent = item.char;
}

function checkAnswer() {
    const input = document.getElementById("answer").value.toLowerCase();
    const correct = hiragana[quizIndex].romaji;

    if (input === correct) {
        document.getElementById("result").textContent = "Dobrze!";
        score++;
    } else {
        document.getElementById("result").textContent = "Źle! Poprawnie: " + correct;
    }

    quizIndex++;
    document.getElementById("answer").value = "";

    if (quizIndex >= hiragana.length) {
        quizIndex = 0;
    }

    updateProgress();
    loadQuiz();
    updateStats();
}

function updateProgress() {
    const percent = (quizIndex / hiragana.length) * 100;
    document.getElementById("progress").style.width = percent + "%";
}

function updateStats() {
    document.getElementById("scoreText").textContent =
        "Poprawne odpowiedzi: " + score;
}

loadQuiz();
nextChar();
