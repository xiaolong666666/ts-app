import {
    CountDown,
    CountDownEventName,
    fillZero,
} from './countDownEvent'

const endTime = Date.now() + 1000 * 60 * 60
const step = 2000
const countDown = new CountDown(endTime, step)

countDown.on(CountDownEventName.RUNNING, remainTime => {
    const { hours, minutes, seconds, count } = remainTime

    console.log([hours, minutes, seconds].map(fillZero).join(':'), `打印 ${count} 次`)
})

countDown.start()

setTimeout(() => {
    countDown.stop()
    setTimeout(() => {
        countDown.start()
    }, 6000)
}, 6000)