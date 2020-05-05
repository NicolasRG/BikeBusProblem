class Bike{
    constructor(startTime, total_trip_length){
        //intialize miealges, current speed and different speeds
        this.currentMileage = 0;
        this.UPHILL_SPEED = 5/60; //calculating everything by the minute // miles per minute
        this.FLAT_SPEED = 10/60; //calculating everythig by the minute // miles per minute
        this.DOWNHILL_SPEED = 15/60; //calculating everythig by the minute // miles per minute
        this.currentVelocity = 0;
        this.BREAKTIME = 10; //by minutes
        this.BREAKSPEED = 0;
        this.STARTTIME = startTime;
        this.timeOnRoad = 0;
        this.SESSION_TIME  = 60; //amount rider can ride without taking a break
        this.timeOnSession = 0;
        this.onBreak = false;
        this.TOTAL_TRIP_LENGTH = total_trip_length;
        //claculate the amount of miles to go for a speed
        this.percentToGoDownSpeed = 0;
        this.percentToGoFlatSpeed = .20;
        this.percentToGoUpSpeed = .75;
        //set break time
        this.amountLeftOnBreak = this.BREAKTIME;
    }

    updateCurrentMileage(time){
        this.currentMileage = (time)*this.currentVelocity + this.currentMileage;
    }

    changeVelocity(newVelocity){
        this.currentVelocity = newVelocity;
    }

    startBike(startVelocity){
        this.changeVelocity(startVelocity);
        this.onBreak = false;
        this.timeOnSession = this.SESSION_TIME
    }

    getCurrentMileage(){
        return this.currentMileage;
    }

    startBreak(){
        this.changeVelocity = this.BREAKSPEED;
    }

    goOnBreak(){
        this.onBreak = true;
        this.amountLeftOnBreak = 10;
        this.currentVelocity = this.BREAKSPEED;
    }

    onBreakDecrement(time){
        this.amountLeftOnBreak = this.amountLeftOnBreak - time;
    }

    goOffBreak(){
        this.onBreak = false;
        this.timeOnSession = this.SESSION_TIME;
        //decide what speed to go back to 
        this.whatSpeed();
    }

    timeSessionDecrement(time){
        this.timeOnSession = this.timeOnSession - time;
    }

    whatSpeed(){
        //calculate current progression
        const currentProgression = this.currentMileage/this.TOTAL_TRIP_LENGTH;
        if(currentProgression >= this.percentToGoFlatSpeed){//checks to see if hit percentage milestone
            //checks to see if needs to go to flat or up speed
            if(currentProgression >= this.percentToGoUpSpeed && this.currentVelocity != this.UPHILL_SPEED){
                this.changeVelocity(this.UPHILL_SPEED);
            }else{//change speed if not already on flat speed
                if(this.changeVelocity != this.FLAT_SPEED){
                    this.changeVelocity(this.FLAT_SPEED);
                }
            }
        }else{
            this.changeVelocity(this.DOWNHILL_SPEED);
        }
    }


    needToChangeVelocity(){
        //calculate current progression
        const currentProgression = this.currentMileage/this.TOTAL_TRIP_LENGTH;
        //ckeck to see if need to go on break
        if(this.onBreak && this.amountLeftOnBreak > 0){
            console.log("on break");
            return;
        }
        if(!this.onBreak && this.timeOnSession <= 0){
            console.log("Needs to go on break");
            this.goOnBreak();
            return;
        }else if(this.onBreak && this.amountLeftOnBreak <= 0){//checks to see if needs to go off of break
            console.log("Go off break");
            this.goOffBreak();
            return;
        }else if(currentProgression >= this.percentToGoFlatSpeed){//checks to see if hit percentage milestone
            //checks to see if needs to go to flat or up speed
            if(currentProgression >= this.percentToGoUpSpeed){
                if(this.currentVelocity != this.UPHILL_SPEED){
                this.changeVelocity(this.UPHILL_SPEED);}
            }else{//change speed if not already on flat speed
                if(this.changeVelocity != this.FLAT_SPEED){
                    this.changeVelocity(this.FLAT_SPEED);
                }
            }
        }
        
    }

    incrementByMinute(minute = 1, currentTime){
        //incremenet milleage and time
        this.updateCurrentMileage(minute);
        this.timeOnRoad += minute;
        //update sessions
        if(this.onBreak){
            this.onBreakDecrement(minute);
        }else{
            this.timeSessionDecrement(minute);
        }
        //check to see if we need to change velocity 
        this.needToChangeVelocity();

    }

}

module.exports = Bike;
