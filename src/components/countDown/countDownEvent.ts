import EventEmitter from 'eventemitter3'

export enum CountDownEventName {
    START = 'start',
    STOP = 'stop',
    RUNNING = 'running'
}

export enum CountDownStatus {
    RUNNING,
    PAUSED,
    STOPED,
}

export const fillZero = (n: number) =>
    `0${n}`.slice(-2)

export interface RemainTime {
    hours: number;
    minutes: number;
    seconds: number;
    count: number;
}

interface CountDownEventMap {
    [CountDownEventName.START]: [];
    [CountDownEventName.RUNNING]: [RemainTime];
    [CountDownEventName.STOP]: [];
}

export class CountDown extends EventEmitter<CountDownEventMap> {
    private static SECOND: number = 1000
    private static MINITE: number = 60 * this.SECOND
    private static HOURS: number = 60 * this.MINITE

    private count: number = 0
    private endTime: number
    private step: number
    private remainTime: number
    private status: CountDownStatus = CountDownStatus.STOPED

    constructor(endTime: number, step = 1e3) {
        super()
        this.endTime = endTime
        this.step = step
        this.remainTime = 0
    }

    public start() {
        this.emit(CountDownEventName.START)
        this.status = CountDownStatus.RUNNING
        this.countdown()
    }

    public stop() {
        this.emit(CountDownEventName.STOP)
        this.status = CountDownStatus.STOPED
    }

    public countdown() {
        if (this.status !== CountDownStatus.RUNNING) return

        this.count++
        this.remainTime = Math.max(this.endTime - Date.now(), 0)

        this.emit(CountDownEventName.RUNNING, this.parseRemainTime())
        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step)
        } else {
            this.stop()
        }
    }

    private parseRemainTime(): RemainTime {
        let time = this.remainTime
        const hours = Math.floor(time / CountDown.HOURS)
        time %= CountDown.HOURS
        const minutes = Math.floor(time / CountDown.MINITE)
        time %= CountDown.MINITE
        const seconds = Math.floor(time / CountDown.SECOND)
        time %= CountDown.SECOND
        const count = this.count

        return { hours, minutes, seconds, count }
    }
}
