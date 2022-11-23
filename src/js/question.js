export class Question {
    static create(question) {
        return fetch('https://js-auth-exercise-default-rtdb.europe-west1.firebasedatabase.app/questions.json', 
        {
            method: 'POST',
            body: JSON.stringify(question), // понятный для firebase формат
            headers: {
                'Content-Type': 'applicatio2n/json' //дефис – не валидный символ для ключа, поэтому в кавычках
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name; //имя в firebase вместо криптоключа
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsfromLS()

        const html = questions.length ? questions.map(toCard).join(' ') : '<div class="mui--text-black-54 mui--text-body2">NO QUESTIONS</div>'
        
        const list = document.getElementById('list')

        list.innerHTML = html
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsfromLS()
    all.push(question)
    /* localStorage.setItem('questions', JSON.stringify(question)) */ //при таком способе новые данные заменяют старый объект в хранилище
    localStorage.setItem('questions', JSON.stringify(all))

}

function getQuestionsfromLS() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
    <div class="mui--text-black-54 mui--text-body2">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div class="mui--text-black-54 mui--text-body2">${question.text}</div>
    `

}