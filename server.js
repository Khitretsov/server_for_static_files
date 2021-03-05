import express from 'express'
import * as http from 'http'

const app = express()
const server = http.createServer(app)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Сервер запущен')
})

app.post('/student_edit/:id', (req, res) => {
    const id = req.params.id
    res.status(200)
    res.json('Данные пользоватлея отредактированны')
})

app.post('/student_create', (req, res) => {
    res.status(200)
    res.json('Новый пользователь сохранён')
})

app.get('/get_student', (req, res) => {
    const id = req.query.id
    res.status(200)
    res.json({
        name1: 'Иван',
        name2: 'Иванов',
        name3: 'Иванович',
        grade: '4Г'
    })
})

let count = 1
app.get('/student_anaz', (req, res) => {
    const id = req.query.id
    const action = req.query.action
    if (action === 'back' && count > 1) {
        count = count - 1
    }

    if (action === 'next' && count < 5) {
        count = count + 1
    }

    res.status(200)
    res.json({
        counter: count,
        saved: true
    })
})

server.listen(3000, () => {
    console.log('Сервер запущен')
})