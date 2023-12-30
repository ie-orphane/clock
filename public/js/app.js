const stopWatch = document.querySelector('.stopwatch')
const play = stopWatch.querySelector('.play')
const lap = stopWatch.querySelector('#lap')
const restart = stopWatch.querySelector('#restart')

let timer = false
let hour = 0
let minute = 0
let second = 0
let count = 0
let timestamp = 0

play.addEventListener('click', () => {
    if (timer) {
        timer = false
        play.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 310 500" fill="#e1e1e1">
        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>`
        restart.firstElementChild.setAttribute('fill', '#ddd')
        lap.firstElementChild.setAttribute('fill', '#7b7b7b')
        stopWatch.firstElementChild.classList.remove('watching')
    } else {
        timer = true
        play.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 320 512" fill="#e1e1e1">
        <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
        </svg>`
        stopWatch.firstElementChild.classList.add('watching')
        lap.firstElementChild.setAttribute('fill', '#ddd')
        restart.firstElementChild.setAttribute('fill', '#7b7b7b')
        stop_watch()
    }
})

lap.addEventListener('click', (e) => {
    if (timer) {
        console.log(timestamp)
        const tbody = document.querySelector('tbody')
        tbody.innerHTML += `
        <tr>
            <td>${tbody.children.length+1}</td>
            <td>${from_timestamp()}</td>
            <td>${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(count).padStart(2, '0')}</td>
        </tr>`
        timestamp = 0
    }
})

restart.addEventListener('click', () => {
    if (!timer) {
        timer = false
        play.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 310 500" fill="#e1e1e1">
        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>`
        restart.firstElementChild.setAttribute('fill', '#ddd')
        lap.firstElementChild.setAttribute('fill', '#7b7b7b')
        stopWatch.firstElementChild.classList.remove('watching')
        stopWatch.firstElementChild.innerHTML = `
            <div class="hrs">00</div>
            <div>:</div>
            <div class="mins">00</div>
            <div>:</div>
            <div class="secs">00</div>
            .<div class="ms fs-00 lh-1 pb-1">00</div>`
        document.querySelector('tbody').innerHTML = ""
        hour = 0
        minute = 0
        second = 0
        count = 0
        timestamp = 0
    }
})

function stop_watch() {
    if (timer) {
        count++
        timestamp++

        if (count == 100) {
            second++
            count = 0
        }

        if (second == 60) {
            minute++
            second = 0
        }

        if (minute == 60) {
            hour++
            minute = 0
            second = 0
        }

        document.querySelector('.hrs').innerHTML = String(hour).padStart(2, '0')
        document.querySelector('.mins').innerHTML = String(minute).padStart(2, '0')
        document.querySelector('.secs').innerHTML = String(second).padStart(2, '0')
        document.querySelector('.ms').innerHTML = String(count).padStart(2, '0')

        setTimeout(stop_watch, 1);
    }
}

function from_timestamp() {
    let hrs = Math.trunc(timestamp / (60*60*100))
    timestamp = timestamp % (60*60*100)
    
    let mins = Math.trunc(timestamp / (60*100))
    timestamp = timestamp % (60*100)
    
    let secs = Math.trunc(timestamp / 100)
    let ms = timestamp % 100
    return `${hrs}:${mins}:${secs}.${ms}`
}

document.querySelectorAll('.nav-tab').forEach(navtab => {
    navtab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(navtab => navtab.classList.remove('active'))
        navtab.classList.add('active')

        document.querySelectorAll('section').forEach(navtab => navtab.classList.remove('active'))
        document.querySelector(navtab.dataset.for).classList.add('active')
    })
})