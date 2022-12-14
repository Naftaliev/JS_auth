import {isValid} from "./utils.js";
import {Question} from "./question.js";

const form = document.getElementById("form");
const input = form.querySelector("#question_input");
const submitBtn = form.querySelector("#submit");

form.addEventListener("submit", submitFormHandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true // disable button to avoid request spamming

        // Async server request , saving question
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        })
     
    }

}
