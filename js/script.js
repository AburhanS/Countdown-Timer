$(document).ready(() => {
    let timerInterval;
    let timerValue = 900;
    let originalTimerValue = timerValue;
    let isTimerRunning = false;

    const updateTimerDisplay = () => {
        const hours = Math.floor(timerValue / 3600);
        const minutes = Math.floor((timerValue % 3600) / 60);
        const seconds = timerValue % 60;
        $('#timer-display').text(
            ('0' + hours).slice(-2) + ':' +
            ('0' + minutes).slice(-2) + ':' +
            ('0' + seconds).slice(-2)
        );
        $('#timer-setting').text(
            ('0' + Math.floor(originalTimerValue / 3600)).slice(-2) + ':' +
            ('0' + Math.floor((originalTimerValue % 3600) / 60)).slice(-2) + ':' +
            ('0' + (originalTimerValue % 60)).slice(-2)
        );
    };

    const startTimer = () => {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isTimerRunning = false;
                alert('Timer has finished!');
            }
        }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        isTimerRunning = false;
    };

    const resetTimer = () => {
        pauseTimer();
        timerValue = originalTimerValue;
        updateTimerDisplay();
    };

    const setTimer = (newTime) => {
        const timeArray = newTime.split(':');
        if (timeArray.length === 3) {
            const hours = parseInt(timeArray[0]) || 0;
            const minutes = parseInt(timeArray[1]) || 0;
            const seconds = parseInt(timeArray[2]) || 0;
            timerValue = hours * 3600 + minutes * 60 + seconds;
            originalTimerValue = timerValue;
            updateTimerDisplay();
        } else {
            alert('Invalid time format. Please use HH:MM:SS format.');
        }
    };

    $('#start-button').click(() => {
        if (!isTimerRunning) {
            startTimer();
            $('#start-button').text('Pause');
        } else {
            pauseTimer();
            $('#start-button').text('Resume');
        }
    });

    $('#reset-button').click(() => {
        resetTimer();
        $('#start-button').text('Start');
    });

    $('#edit-link').click(() => {
        const newTime = prompt('Enter a new time in the format HH:MM:SS', '00:15:00');
        if (newTime !== null) {
            setTimer(newTime);
        }
    });

    updateTimerDisplay();
});
