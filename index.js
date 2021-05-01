const refs = {
    daysField: document.querySelector('[data-value="days"]'),
    hoursField: document.querySelector('[data-value="hours"]'),
    minsField: document.querySelector('[data-value="mins"]'),
    secsField: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({ onTick }) {
        this.selector = '#timer-1';
        this.targetDate = new Date('May 05, 2021');
        this.onTick = onTick;
    }

    showRemainedTime() {
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const remainedTime = getTimerComponents(deltaTime);
            this.onTick(remainedTime);
        }, 1000);
    }
}

const timer = new CountdownTimer({
    onTick: updateTimerValues
}
);

timer.showRemainedTime();

function updateTimerValues({ days, hours, mins, secs }) {
    refs.daysField.textContent = `${days}`;
    refs.hoursField.textContent = `${hours}`;
    refs.minsField.textContent = `${mins}`;
    refs.secsField.textContent = `${secs}`;
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimerComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
}