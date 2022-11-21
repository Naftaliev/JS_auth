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