class Bus{
    
    constructor(startTime){
        //intialize miealges, current speed and different speeds
        this.currentMileage = 0;
        this.FIRST_SPEED = 45/60; //calculating everything by the minute // miles per minute
        this.SECOND_SPEED = 55/60; //calculating everythig by the minute // miles per minute
        this.currentVelocity = 0;
        this.TIME_TO_CHANGE_VELOCITY_FROM_START = 3.5*60 + startTime; //by minutes
        this.timeOnRoad = 0;
        this.STARTTIME = startTime;
        this.started = false;
    }
    
    updateMileageByTime(time){
        this.currentMileage = ((time)*this.currentVelocity)+this.currentMileage;
    }

    startBus(){
        this.currentVelocity = this.FIRST_SPEED;
        this.started = true;
    }

    isStarted(){
        return this.started;
    }

    switchToSecondSpeed(){
        this.currentVelocity = this.SECOND_SPEED;
    }

    getMileage(){
        return this.currentMileage;
    }

    needToChangeSpeed(currentTime){
        if(currentTime >= this.TIME_TO_CHANGE_VELOCITY_FROM_START && this.currentVelocity != this.SECOND_SPEED){
            return true;
        }
        else{
            return false;
        }
    }

    updateTimeOnRoad(minute){
        this.timeOnRoad = this.timeOnRoad + minute;
    }

    incrementByMinute(minute=1, currentTime){ //minute should litteraly be one
        //Checks to see if need to change speed
        if(this.needToChangeSpeed(currentTime)){
            this.switchToSecondSpeed();
        }

        //update mileage
        this.updateMileageByTime(minute);
        
        //update time on road
        this.updateTimeOnRoad(minute);
    }
}

module.exports = Bus;
