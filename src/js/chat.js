"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chat_list = document.querySelector(".chatting-list")
const chat_input = document.querySelector(".chatting-input")
const sendBtn = document.querySelector(".send-button")
const display_container = document.querySelector(".display-container")

chat_input.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        send();
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chat_input.value,
    }
    socket.emit("chatting", param)
}

function liModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li_msg = document.createElement("li");
        li_msg.classList.add(nickname.value === this.name ? "myself" : "other")
        li_msg.innerHTML = `
        <span class="profile">
                <span class="user">${this.name}</span>
                <img src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>
        `;
        chat_list.appendChild(li_msg);
    }
}

sendBtn.addEventListener("click", () => {
    send();
})

socket.on("chatting", (data) => {
    const { name, msg, time } = data;
    const item = new liModel(name, msg, time);
    item.makeLi();
    display_container.scrollTo(0, display_container.scrollHeight);

})