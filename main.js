status = "";
whatToFind ="";
result = [];

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting all objects";
    whatToFind = document.getElementById("objectToFind").value;
}

function modelLoaded() {
    console.log("MODEL is LOADED");
    status = true;
}

function draw() {
    image(video,0,0,480,380);
    if (status != "") {
        objectDetector.detect(video,gotResults);
    for (let i = 0; i < result.length; i++) {

        confidence = Math.round(result[i].confidence * 100);
        label = result[i].label;
        x = result[i].x;
        y = result[i].y;
        objects_name = document.getElementById("objectToFind").value
        if (objects_name == result[i].label) {
            video.stop

            document.getElementById("status").innerHTML = "Status: Object Found";

            var synth = window.speechSynthesis;
            speak_data = "object detected is" + result[0].label;
            utterthis = new SpeechSynthesisUtterance(objects_name + " found");
            synth.speak(utterthis)
        }else{
            document.getElementById("status").innerHTML = "Status: Object Not Found";
        }


    }
    
    
    }
}
function gotResults(error,results) {
    if (error) {
       console.error(error); 
    }else {
        console.log(results);
        result = results;
    }
    }