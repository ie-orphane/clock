function timestamp_to_time(timestamp) {
    let hrs = Math.trunc(timestamp / (60 * 60 * 100))
    timestamp = timestamp % (60 * 60 * 100)
    
    let mins = Math.trunc(timestamp / (60 * 100))
    timestamp = timestamp % (60 * 100)
    
    let secs = Math.trunc(timestamp / 100)
    let ms = timestamp % 100

    return {hrs: hrs, mins: mins, secs: secs, ms: ms}
}

console.log(timestamp_to_time(2000001))

function time_to_string(time) {
    time.hrs = String(time.hrs).padStart(2, '0')
    time.mins = String(time.mins).padStart(2, '0')
    time.secs = String(time.secs).padStart(2, '0')
    time.ms = String(time.ms).padStart(2, '0')

    return `${time.hrs}:${time.mins}:${time.secs}.${time.ms}`
}

console.log(time_to_string(timestamp_to_time(2000001)))
