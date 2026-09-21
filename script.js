/* =========================================
   MASTERCOMMERCE
   by PD Developers
   Main JavaScript
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const newChatButton = document.getElementById("newChat");

const menuItems = document.querySelectorAll(".menu-item[data-page]");
const subjectCards = document.querySelectorAll(".subject-card");

const pages = document.querySelectorAll(".page");

const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    /* Update active sidebar item */

    menuItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }

    });


    /* Close mobile sidebar */

    sidebar.classList.remove("open");


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SIDEBAR MENU
   ========================================= */

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const pageName = item.dataset.page;

        showPage(pageName);

    });

});


/* =========================================
   SUBJECT CARDS
   ========================================= */

subjectCards.forEach(card => {

    card.addEventListener("click", () => {

        const pageName = card.dataset.page;

        showPage(pageName);

    });

});


/* =========================================
   MOBILE MENU
   ========================================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
   ========================================= */

document.addEventListener("click", event => {

    const clickedInsideSidebar =
        sidebar.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);


    if (
        window.innerWidth <= 800 &&
        !clickedInsideSidebar &&
        !clickedMenuButton
    ) {

        sidebar.classList.remove("open");

    }

});


/* =========================================
   AUTO RESIZE CHAT INPUT
   ========================================= */

chatInput.addEventListener("input", () => {

    chatInput.style.height = "auto";

    chatInput.style.height =
        Math.min(chatInput.scrollHeight, 150) + "px";

});


/* =========================================
   CREATE CHAT MESSAGE
   ========================================= */

function createMessage(text, type) {

    const message = document.createElement("div");

    message.className = `chat-message ${type}`;

    message.innerHTML = `
        <div class="message-content">
            ${escapeHTML(text)}
        </div>
    `;

    return message;
}


/* =========================================
   SAFELY DISPLAY TEXT
   ========================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================
   SIMPLE DEMO RESPONSE
   ========================================= */

function getDemoResponse(question) {

    const lowerQuestion =
        question.toLowerCase();


    /* ACCOUNTING */

    if (
        lowerQuestion.includes("debit") ||
        lowerQuestion.includes("credit")
    ) {

        return `Let's make it simple.

A debit and a credit are the two sides of an accounting entry.

Think of it like this:

Debit = left side
Credit = right side

For example:

If a business receives R1 000 cash:

Debit: Bank R1 000
Credit: Capital / Income R1 000

Don't worry if this feels confusing. We can practise it step by step.`;

    }


    /* ECONOMICS */

    if (
        lowerQuestion.includes("demand") ||
        lowerQuestion.includes("supply")
    ) {

        return `Let's keep it easy.

Demand means how much people want to buy.

Supply means how much producers are willing to sell.

Example:

If the price of a product becomes cheaper, people will usually want to buy more of it.

That is the basic idea behind the law of demand.

I can also give you a simple Grade 12 question to practise.`;

    }


    /* MATHEMATICS */

    if (
        lowerQuestion.includes("solve") ||
        lowerQuestion.includes("math") ||
        lowerQuestion.includes("equation")
    ) {

        return `Sure. I'll explain the mathematics step by step.

For example:

2x + 4 = 10

Step 1:
Subtract 4 from both sides.

2x = 6

Step 2:
Divide both sides by 2.

x = 3

Answer: x = 3

If you give me your own maths question, Mastercommerce can explain it in the easiest way possible.`;

    }


    /* DEFAULT */

    return `I'm ready to help you learn.

You can ask me things like:

• "Explain debits and credits."
• "What is demand?"
• "Solve 2x + 4 = 10."
• "Explain depreciation simply."
• "Give me a Grade 12 Economics question."

As we build Mastercommerce, this demo tutor will be replaced with the full learning system.`;

}


/* =========================================
   SEND MESSAGE
   ========================================= */

function sendMessage() {

    const question =
        chatInput.value.trim();


    if (!question) {
        return;
    }


    /*
       Find or create conversation area.
    */

    let conversation =
        document.querySelector(".conversation");


    if (!conversation) {

        conversation =
            document.createElement("div");

        conversation.className =
            "conversation";


        const homePage =
            document.getElementById("home");


        homePage.insertBefore(
            conversation,
            document.querySelector(".chat-area")
        );

    }


    /*
       USER MESSAGE
    */

    const userMessage =
        createMessage(question, "user");


    conversation.appendChild(userMessage);


    /*
       Clear input
    */

    chatInput.value = "";

    chatInput.style.height = "auto";


    /*
       Scroll down
    */

    userMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /*
       DEMO TUTOR RESPONSE
    */

    setTimeout(() => {

        const response =
            getDemoResponse(question);


        const tutorMessage =
            createMessage(response, "assistant");


        conversation.appendChild(tutorMessage);


        tutorMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 600);

}


/* =========================================
   SEND BUTTON
   ========================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================
   ENTER TO SEND
   ========================================= */

chatInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();

    }

});


/* =========================================
   NEW CHAT
   ========================================= */

newChatButton.addEventListener("click", () => {

    const conversation =
        document.querySelector(".conversation");


    if (conversation) {
        conversation.remove();
    }


    chatInput.value = "";

    chatInput.style.height = "auto";


    showPage("home");

});


/* =========================================
   TOPIC BUTTONS
   ========================================= */

const topicButtons =
    document.querySelectorAll(".topic");


topicButtons.forEach(button => {

    button.addEventListener("click", () => {

        const topic =
            button.querySelector("strong").textContent;


        showPage("home");


        chatInput.value =
            `Teach me ${topic} in the easiest way possible.`;


        chatInput.focus();

    });

});


/* =========================================
   PAST PAPER FILTERS
   ========================================= */

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });


        filter.classList.add("active");

    });

});


/* =========================================
   INITIAL PAGE
   ========================================= */

showPage("home");
