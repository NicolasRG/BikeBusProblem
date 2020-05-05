const Bike = require("./bike.js");
const Bus = require("./bus.js");
//setup base requirments 
const lengthOfTrip = 370;
const bikeStartTime = 7*60;
const busStartTime = 9*60;

//go by time but in what increments

const bike = new Bike(0, lengthOfTrip);
const bus = new Bus(busStartTime);
let currentTime = bikeStartTime;

bike.startBike(bike.DOWNHILL_SPEED);

//start the time at 7 when the bike leaves

while(true){
    currentTime = currentTime + 1;
    //check to see if need to start bus
    
    if(currentTime === (busStartTime+1)){bus.startBus()}
    
    bike.incrementByMinute(1);
    
    if(bus.isStarted()){
        bus.incrementByMinute(1, currentTime);
    }

    if(ifMeet()){
        console.log("leave", (lengthOfTrip-bus.getMileage()) , formatTime(currentTime));
        break;}
        else{
            console.log( "bike : "+ bike.getCurrentMileage(), "bus: "+bus.getMileage(), formatTime(currentTime));
        }
}

function ifMeet(){
    if(bus.getMileage() + bike.getCurrentMileage() >= lengthOfTrip){
        return true;
    }
    return false;
}

function formatTime(minutes){
    const smallhand = Math.floor(minutes/60);
    let bighand = (minutes-(smallhand*60));
    if(bighand < 9){
        bighand = "0"+bighand;
    }
    return smallhand + ":" + bighand; 
}
