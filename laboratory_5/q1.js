class Meditation {
    constructor(duration) {
        this.duration = duration;
    }

    start() {
        console.log('Start meditation');

        let intervalId = setInterval(() => {
            if (this.duration > 0) {
                console.log(this.duration);
                this.duration--;
            } else {
                clearInterval(intervalId);
                console.log('Jay Guru Dev');
            }
        }, 1000);
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();