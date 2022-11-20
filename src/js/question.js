export class Question {
    static create(question) {
        return fetch('https://js-auth-exercise-default-rtdb.europe-west1.firebasedatabase.app/questions.json', 
        {
            method: 'POST',
            body: JSON.stringify(question), // понятный для firebase формат
            headers: {
                'Content-Type': 'applicatio2n/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }
}