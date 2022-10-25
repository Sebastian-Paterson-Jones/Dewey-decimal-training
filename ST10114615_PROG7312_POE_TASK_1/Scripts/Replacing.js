// interval timer
let timer;
// miliseconds times
let miliseconds = 0;
// holds book object type
let books = [];
// holds book html elements
let bookItems = [];
// holds the drag start item
let dragStartItem = null;
// holds the start index of drag events
let dragStartIndex = 0;

const showStartPage = () => {
    stopTimer();
    miliseconds = 0;
    const temp = document.getElementById("start-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("replacing");

    clon.getElementById("BtnStartGame").onclick = (event) => {
        showGamePage();
    };

    bod.innerHTML = "";
    bod.appendChild(clon);
}

const showGamePage = async () => {
    const temp = document.getElementById("game-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("replacing");

    bod.innerHTML = "";
    bod.appendChild(clon);

    // fetch the collection of books
    books = await fetchRandomBooks();

    hydrateItems();

    // start timer
    startTimer();

    document.getElementById("BtnCheckOrder").onclick = async (event) => {
        await checkOrder();
    }
}

const showSuccessPage = () => {
    stopTimer();
    const temp = document.getElementById("success-page");
    const clon = temp.content.cloneNode(true);
    const bod = document.getElementById("replacing");

    bod.innerHTML = "";
    bod.appendChild(clon);

    document.getElementById("BtnSubmit").onclick = async (event) => {
        await submit();
    }

    document.getElementById("BtnStartGame").onclick = () => {
        showStartPage();
    }

    const milis = document.getElementById("miliseconds");
    const seconds = document.getElementById("seconds");
    const minutes = document.getElementById("minutes");

    milis.innerHTML = pad(miliseconds % 100);
    seconds.innerHTML = pad(parseInt(miliseconds / 100, 10) % 60);
    minutes.innerHTML = pad(parseInt(miliseconds / 6000, 10));

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
    const cx = ctx.canvas.width / 2;
    const cy = ctx.canvas.height / 2;

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
    const booksList = document.getElementById("Books");

    booksList.innerHTML = "";

    for (const [key, value] of Object.entries(books)) {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', key);
        listItem.setAttribute('draggable', true);
        listItem.classList.add("listItem");
        listItem.classList.add("draggable");

        listItem.innerHTML = `
                <div class="list-container">
                    <h3 class="call-num">${value["callNumber"]}</h3>
                    <h4 class="author-firstname">${value["bookAuthorFirstName"]}</h4>
                    <h4 class="author-lastname">${value["bookAuthorLastName"]}</h4>
                </div>
            `;
        bookItems.push(listItem);
        booksList.appendChild(listItem);
    }

    // add drag event listeners
    addDragEventListeners();
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

const fetchRandomBooks = async () => {
    let books = {};

    await fetch("/Replacing/GetReplacementBooks")
        .then(resp => resp.json())
        .then(data => books = data)
        .catch(err => {
            alert("Unable to pull book data");
            console.error(err);
            showStartPage();
        });

    return books;
}

const submit = async () => {
    const userName = document.getElementById("Name").value;

    if (userName.length > 0) {
        let data = {};

        data.Name = userName;
        data.Time = miliseconds;

        console.log(data);

        await fetch("/Replacing/submitTime", {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
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

const checkOrder = async () => {
    let data = {};
    data.books = books;
    data.timestamp = miliseconds;

    await fetch("/Replacing/ValidateCallOrder", {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(data => data ? showSuccessPage() : showIncorrectOrder())
        .catch(err => {
            alert("Unable to check book order, try again");
            console.error(err);
        });
}

const showScore = (data) => {
    document.getElementById("Score").innerHTML = data.index;

    document.getElementById("DisplayTime").style.display = "block";
    document.getElementById("SubmitTime").style.display = "none";
}

const addDragEventListeners = () => {
    const dragParent = document.getElementById("Books");
    const dragItems = document.querySelectorAll(".draggable");

    dragParent.addEventListener('dragstart', dragStart);

    dragItems.forEach(elem => {
        elem.addEventListener('dragover', dragOver);
        elem.addEventListener('drop', dragDrop);
        elem.addEventListener('dragenter', dragEnter);
        elem.addEventListener('dragleave', dragLeave);
    });
}

const showIncorrectOrder = () => {
    const timeElem = document.getElementById("timer");
    timeElem.classList.add("invalid");
    setTimeout(() => timeElem.classList.remove("invalid"), 1000);
}

// drag event handlers
const dragStart = (e) => {
    dragStartItem = e.target.closest('li');
    dragStartIndex = dragStartItem.getAttribute('data-index');
}
const dragOver = (e) => {
    e.preventDefault();
}
const dragDrop = (e) => {
    const dragEndIndex = e.target.getAttribute('data-index');
    insertBook(dragStartIndex, dragEndIndex);
    e.target.classList.remove("over");
}
const dragEnter = (e) => {
    e.target.classList.add("over");
}
const dragLeave = (e) => {
    e.target.classList.remove("over");
}

// swaps book positions
const insertBook = (startIndex, endIndex) => {
    const tempBook = books[endIndex];

    books[endIndex] = books[startIndex];
    books[startIndex] = tempBook;

    hydrateItems();
}