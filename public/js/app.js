//& switch between sections
document.querySelectorAll('.nav-tab').forEach(navtab => {
    navtab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(navtab => navtab.classList.remove('active'))
        navtab.classList.add('active')

        document.querySelectorAll('section').forEach(navtab => navtab.classList.remove('active'))
        document.querySelector(navtab.dataset.for).classList.add('active')
    })
})

//& stop watch

class StopWatch {
    static section = document.querySelector('.stopwatch')
    static play = StopWatch.section.querySelector('.play')
    static lap = StopWatch.section.querySelector('#lap')
    static restart = StopWatch.section.querySelector('#restart')

    static timer = false
    static hour = 0
    static minute = 0
    static second = 0
    static count = 0
    static timestamp = 0

    static stop_watch() {
        if (StopWatch.timer) {
            StopWatch.count++
            StopWatch.timestamp++

            if (StopWatch.count == 100) {
                StopWatch.second++
                StopWatch.count = 0
            }

            if (StopWatch.second == 60) {
                StopWatch.minute++
                StopWatch.second = 0
            }

            if (StopWatch.minute == 60) {
                StopWatch.hour++
                StopWatch.minute = 0
                StopWatch.second = 0
            }

            document.querySelector('.hrs').innerHTML = String(StopWatch.hour).padStart(2, '0')
            document.querySelector('.mins').innerHTML = String(StopWatch.minute).padStart(2, '0')
            document.querySelector('.secs').innerHTML = String(StopWatch.second).padStart(2, '0')
            document.querySelector('.ms').innerHTML = String(StopWatch.count).padStart(2, '0')

            setTimeout(StopWatch.stop_watch, 10)
        }
    }

    static timestamp_to_time(timestamp) {
        let hrs = Math.trunc(timestamp / (60 * 60 * 100))
        timestamp = timestamp % (60 * 60 * 100)

        let mins = Math.trunc(timestamp / (60 * 100))
        timestamp = timestamp % (60 * 100)

        let secs = Math.trunc(timestamp / 100)
        let ms = timestamp % 100

        return { hrs: hrs, mins: mins, secs: secs, ms: ms }
    }

    static time_to_string(time) {
        time.hrs = String(time.hrs).padStart(2, '0')
        time.mins = String(time.mins).padStart(2, '0')
        time.secs = String(time.secs).padStart(2, '0')
        time.ms = String(time.ms).padStart(2, '0')

        return `${time.hrs}:${time.mins}:${time.secs}.${time.ms}`
    }

    static play_event() {
        if (StopWatch.timer) {
            StopWatch.timer = false
            StopWatch.play.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 310 500" fill="#e1e1e1">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>`
            StopWatch.restart.firstElementChild.setAttribute('fill', '#ddd')
            StopWatch.lap.firstElementChild.setAttribute('fill', '#7b7b7b')
            StopWatch.section.firstElementChild.classList.remove('watching')
        } else {
            StopWatch.timer = true
            StopWatch.play.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 320 512" fill="#e1e1e1">
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                </svg>`
            StopWatch.section.firstElementChild.classList.add('watching')
            StopWatch.lap.firstElementChild.setAttribute('fill', '#ddd')
            StopWatch.restart.firstElementChild.setAttribute('fill', '#7b7b7b')
            StopWatch.stop_watch()
        }
    }

    static lap_event() {
        if (StopWatch.timer) {
            const tbody = document.querySelector('tbody')
            tbody.innerHTML += `
            <tr>
                <td>${tbody.children.length + 1}</td>
                <td>${StopWatch.time_to_string(StopWatch.timestamp_to_time(StopWatch.timestamp))}</td>
                <td>${StopWatch.time_to_string({ hrs: StopWatch.hour, mins: StopWatch.minute, secs: StopWatch.second, ms: StopWatch.count })}</td>
            </tr>`
            StopWatch.timestamp = 0
        }
    }

    static restart_event() {
        if (!StopWatch.timer) {
            StopWatch.timer = false
            StopWatch.play.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 310 500" fill="#e1e1e1">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>`
            StopWatch.restart.firstElementChild.setAttribute('fill', '#ddd')
            StopWatch.lap.firstElementChild.setAttribute('fill', '#7b7b7b')
            StopWatch.section.firstElementChild.classList.remove('watching')
            StopWatch.section.firstElementChild.innerHTML = `
                <div class="hrs">00</div>
                <div>:</div>
                <div class="mins">00</div>
                <div>:</div>
                <div class="secs">00</div>
                .<div class="ms fs-00 lh-1 pb-1">00</div>`
            document.querySelector('tbody').innerHTML = ""
            StopWatch.hour = 0
            StopWatch.minute = 0
            StopWatch.second = 0
            StopWatch.count = 0
            StopWatch.timestamp = 0
        }
    }
}

StopWatch.play.addEventListener('click', StopWatch.play_event)
StopWatch.lap.addEventListener('click', StopWatch.lap_event)
StopWatch.restart.addEventListener('click', StopWatch.restart_event)

//& countdown

class CountDown {
    static section = document.querySelector('.countdown')
    static play = CountDown.section.querySelector('.play')
    static restart = CountDown.section.querySelector('.restart')

    static timer = false
    static timestamp = 0
    static time = parseInt(document.querySelector('.countdown-time').dataset.inittime)

    static timestamp_to_time(timestamp) {
        let hrs = Math.trunc(timestamp / (60 * 60 * 100))
        timestamp = timestamp % (60 * 60 * 100)

        let mins = Math.trunc(timestamp / (60 * 100))
        timestamp = timestamp % (60 * 100)

        let secs = Math.trunc(timestamp / 100)

        return { hrs: hrs, mins: mins, secs: secs }
    }

    static time_to_string(time) {
        time.hrs = String(time.hrs).padStart(2, '0')
        time.mins = String(time.mins).padStart(2, '0')
        time.secs = String(time.secs).padStart(2, '0')

        return `${time.hrs}:${time.mins}:${time.secs}`
    }

    static count_down() {
        if (CountDown.timer) {
            if (CountDown.timestamp == 0) {
                CountDown.timer = false
                CountDown.play.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 310 500" fill="#e1e1e1">
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>`
                CountDown.notification()
                return
            }

            CountDown.timestamp--
            if (CountDown.timestamp % 100 == 0 && CountDown.timestamp != 0) {
                new Audio("./public/sounds/tick.mp3").play()
            }

            document.querySelector('.countdown-card').style.background = `linear-gradient(#303030, #303030) content-box no-repeat, conic-gradient(#5fb2f2 ${CountDown.timestamp / CountDown.time * 100}%, 0, #7b7b7b) border-box`

            let currentTime = CountDown.timestamp_to_time(CountDown.timestamp)
            document.querySelector('.countdown-time').innerHTML = CountDown.time_to_string(currentTime)
            document.querySelector('.countdown-time').dataset.timestamp = CountDown.timestamp
            setTimeout(CountDown.count_down, 10)
        }
    }

    static notification() {
        let permission = Notification.permission

        if (permission === "granted") {
            show_notification()
        } else if (permission === "default") {
            request_permission_and_show_notification()
        } else {
            alert("time done!")
        }

        function show_notification() {
            // if (document.visibilityState === "visible") {
            //     return
            // }

            let notification = new Notification("Timer", {
                body: "time dne!",
                icon: "./public/images/favicon.svg"
            })

            notification.onclick = () => {
                notif.close()
                window.parent.focus()
            }
        }

        function request_permission_and_show_notification() {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    show_notification()
                }
            })
        }
    }

    static play_event() {
        CountDown.timestamp = parseInt(document.querySelector('.countdown-time').dataset.timestamp)
        if (CountDown.timer) {
            CountDown.timer = false
            CountDown.restart.firstElementChild.setAttribute('fill', '#ddd')
            CountDown.play.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 310 500" fill="#e1e1e1">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>`
        } else if (CountDown.timestamp != 0) {
            if (CountDown.timestamp == CountDown.time) {
                new Audio("./public/sounds/tick.mp3").play()
            }
            CountDown.timer = true
            CountDown.restart.firstElementChild.setAttribute('fill', '#7b7b7b')
            CountDown.play.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 320 512" fill="#e1e1e1">
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                </svg>`
            CountDown.count_down()
        }
    }

    static restart_event() {
        if (!CountDown.timer) {
            CountDown.timer = false
            CountDown.play.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 310 500" fill="#e1e1e1">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>`
            CountDown.restart.firstElementChild.setAttribute('fill', '#ddd')

            let currentTime = CountDown.timestamp_to_time(CountDown.time)
            document.querySelector('.countdown-time').innerHTML = CountDown.time_to_string(currentTime)
            document.querySelector('.countdown-card').style.background = `linear-gradient(#303030, #303030) content-box no-repeat, conic-gradient(#5fb2f2 0%, 0, #7b7b7b) border-box`
            document.querySelector('.countdown-time').dataset.timestamp = CountDown.time
        }
    }
}

CountDown.play.addEventListener('click', CountDown.play_event)
CountDown.restart.addEventListener('click', CountDown.restart_event)
