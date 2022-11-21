// interval timer
let timer;
// miliseconds times
let miliseconds = 0;
// holds # correct scores
let score = 0;
// holds user performance score
let performanceScore = 0;
// hold the current page #
let page = 0;
// hold question
let question = 0;
// hold callnumbers
let callNumbers = [];
// hold question index
let headQuestion = {};

const showStartPage = () => {
    stopTimer();
    miliseconds = 0;
    const temp = document.getElementById("start-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("finding");

    clon.getElementById("BtnStartGame").onclick = (event) => {
        showGamePage();
    };

    bod.innerHTML = "";
    bod.appendChild(clon);
}

const showGamePage = async () => {
    const temp = document.getElementById("game-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("finding");

    page = 0;
    score = 0;
    question = 0;

    bod.innerHTML = "";
    bod.appendChild(clon);

    await displayNext();

    // start timer
    startTimer();
}

const showSuccessPage = () => {
    stopTimer();
    const temp = document.getElementById("success-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("finding");

    bod.innerHTML = "";
    bod.appendChild(clon);

    document.getElementById("BtnSubmitScore").onclick = async (event) => {
        await submitScore();
    }

    document.getElementById("BtnStartGame").onclick = () => {
        showStartPage();
    }

    // set performance score
    performanceScore = parseInt(((score * score) / 12) * (10000 / miliseconds) * 100);

    // display time
    const milis = document.getElementById("miliseconds");
    const seconds = document.getElementById("seconds");
    const minutes = document.getElementById("minutes");

    milis.innerHTML = pad(miliseconds % 100);
    seconds.innerHTML = pad(parseInt(miliseconds / 100, 10) % 60);
    minutes.innerHTML = pad(parseInt(miliseconds / 6000, 10));

    // display number of correct answers
    const correctScoresElem = document.getElementById("NumCorrect");
    const performanceScoreElem = document.getElementById("Score");

    correctScoresElem.innerHTML = `You got <b>${score}/12</b> answers correct`;
    performanceScoreElem.innerHTML = `${performanceScore}`;

    //----------Resize confetti----------
    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    //------------Click confetti------------
    window.addEventListener('click', function () {
        initConfetti();
    });

    // confetti logic. code extracted from https://www.codehim.com/animation-effects/javascript-confetti-explosion-effect/
    let canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let cx = ctx.canvas.width / 2;
    let cy = ctx.canvas.height / 2;

    let confetti = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 3;
    const drag = 0.075;
    const colors = [
        { front: 'red', back: 'darkred' },
        { front: 'green', back: 'darkgreen' },
        { front: 'blue', back: 'darkblue' },
        { front: 'yellow', back: 'darkyellow' },
        { front: 'orange', back: 'darkorange' },
        { front: 'pink', back: 'darkpink' },
        { front: 'purple', back: 'darkpurple' },
        { front: 'turquoise', back: 'darkturquoise' }];


    //-----------Functions--------------
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cx = ctx.canvas.width / 2;
        cy = ctx.canvas.height / 2;
    };

    const randomRange = (min, max) => Math.random() * (max - min) + min;

    const initConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                color: colors[Math.floor(randomRange(0, colors.length))],
                dimensions: {
                    x: randomRange(10, 20),
                    y: randomRange(10, 30)
                },

                position: {
                    x: randomRange(0, canvas.width),
                    y: canvas.height - 1
                },

                rotation: randomRange(0, 2 * Math.PI),
                scale: {
                    x: 1,
                    y: 1
                },

                velocity: {
                    x: randomRange(-25, 25),
                    y: randomRange(0, -50)
                }
            });


        }
    };

    //---------Render-----------
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((confetto, index) => {
            let width = confetto.dimensions.x * confetto.scale.x;
            let height = confetto.dimensions.y * confetto.scale.y;

            // Move canvas to position and rotate
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);

            // Apply forces to velocity
            confetto.velocity.x -= confetto.velocity.x * drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

            // Set position
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;

            // Delete confetti when out of frame
            if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

            // Loop confetto x position
            if (confetto.position.x > canvas.width) confetto.position.x = 0;
            if (confetto.position.x < 0) confetto.position.x = canvas.width;

            // Spin confetto by scaling y
            confetto.scale.y = Math.cos(confetto.position.y * 0.1);
            ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

            // Draw confetti
            ctx.fillRect(-width / 2, -height / 2, width, height);

            // Reset transform matrix
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        });

        // Fire off another round of confetti
        if (confetti.length <= 10) initConfetti();

        window.requestAnimationFrame(render);
    };

    initConfetti();
    render();
}

const hydrateItems = () => {
    let questionTitle = document.getElementById("question-title");
    let answers = document.getElementById("answers");

    questionTitle.innerHTML = "";
    answers.innerHTML = "";

    questionTitle.innerHTML = `${headQuestion.description}`;

    derrangeList();

    for (let i = 0; i < callNumbers.length; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add("question-container");

        let callNumber;
        let callDescription;

        if (page == 0) {
            callNumber = callNumbers[i].grandNumber;
            callDescription = callNumbers[i].grandDescription;
        } else if (page == 1) {
            callNumber = callNumbers[i].parentNumber;
            callDescription = callNumbers[i].parentDescription;
        } else {
            callNumber = callNumbers[i].number;
            callDescription = callNumbers[i].description;
        }

        listItem.innerHTML = `${i + 1}. ${callNumber} ${callDescription}`;

        listItem.onclick = () => {
            if (page == 0) {
                if (callNumbers[i].grandNumber != headQuestion.grandNumber) {
                    showInvalid(listItem);
                    return;
                }
            }
            if (page == 1) {
                if (callNumbers[i].parentNumber != headQuestion.parentNumber) {
                    showInvalid(listItem);
                    return;
                }
            }
            if (page == 2) {
                if (callNumbers[i].number != headQuestion.number) {
                    showInvalid(listItem);
                    return;
                }
            }
            score++;
            listItem.classList.add("success");
            setTimeout(() => {
                listItem.classList.remove("success");
                if (page >= 2) {
                    displayNext();
                } else {
                    page++;
                    hydrateItems();
                }
            }, 1000);
        }

        answers.appendChild(listItem);
    }
}

const showInvalid = (listItem) => {
    const timeElem = document.getElementById("timer");
    timeElem.classList.add("invalid");
    listItem.classList.add("invalid");
    setTimeout(() => {
        timeElem.classList.remove("invalid");
        listItem.classList.remove("invalid");
        displayNext();
    }, 1000);
    return;
}

const fetchRandomCallNumbers = async () => {
    await fetch("/Finding/GetRandomCallNumbers")
        .then(resp => resp.json())
        .then(data => callNumbers = data)
        .catch(err => {
            alert("Unable to pull callNumbers");
            console.error(err);
            showStartPage();
        });
}

// padding function
const pad = (val) => {
    return val > 9 ? val : "0" + val;
}

const startTimer = () => {

    const timeElem = document.getElementById("timer");
    const milis = document.getElementById("miliseconds");
    const seconds = document.getElementById("seconds");
    const minutes = document.getElementById("minutes");

    timeElem.classList.add("active");

    timer = setInterval(() => {
        miliseconds++;
        milis.innerHTML = pad(miliseconds % 100);
        seconds.innerHTML = pad(parseInt(miliseconds / 100, 10) % 60);
        minutes.innerHTML = pad(parseInt(miliseconds / 6000, 10));
    }, 10);
}

const stopTimer = () => {
    const timeElem = document.getElementById("timer");
    timeElem.classList.remove("active");
    clearInterval(timer);
}

const submitScore = async () => {
    const userName = document.getElementById("Name").value;

    if (userName.length > 0) {
        let data = {};

        data.Name = userName;
        data.Time = miliseconds;
        data.Correct = score;
        data.Score = performanceScore;

        await fetch("/Finding/submitScore", {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            accept: 'application/json',
            credentials: 'include',
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(data => showScore(data))
            .catch(err => {
                alert("Unable to check book order, try again");
                console.error(err);
            });
    }
}

const displayNext = async () => {
    await fetchRandomCallNumbers();
    if (question > 3) {
        showSuccessPage();
    } else {
        headQuestion = callNumbers[Math.floor(Math.random() * callNumbers.length)];
        document.getElementById("ProgressBar").style.width = `${(question + 1) * 25}%`;
        question++;
        page = 0;
        hydrateItems();
    }
}

const derrangeList = () => {
    let oldList = [...callNumbers];
    let newList = [];
    for (let i = 0; i < callNumbers.length; i++) {
        const randomItem = Math.floor(Math.random() * oldList.length);
        newList.push(oldList[randomItem]);
        oldList.splice(randomItem, 1);
    }
    console.log(oldList);
    console.log(newList);
    callNumbers = newList;
}

const showScore = (data) => {
    console.log(data);
    document.getElementById("Rank").innerHTML = data.index;

    document.getElementById("DisplayTime").style.display = "block";
    document.getElementById("SubmitTime").style.display = "none";
}
