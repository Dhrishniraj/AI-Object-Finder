objects=[];
video = "";
status1 = "";
color="";
function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status1 != ""){
        binod2.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("binodobj").innerHTML = "Number of objects found: " + objects[i].length;
            confid = Math.floor(objects[i].confidence*100);
            if((confid >= 0) && (confid < 33)){
                color = "blue";
            }
            else if((confid >= 33) && (confid < 67)){
                color = "green";
            }
            else if((confid >= 67) && (confid <= 100)){
                color = "red";
            }
            fill(color);
            text((objects[i].label + " " + confid + "%"), (objects[i].x + 15), (objects[i].y - 15));
            noFill();
            stroke(color);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(binod1 == objects[i].label){
                document.getElementById("status").innerHTML = "Status: Object Found";
                video.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Status: Object Not Found";
            }
        }
    }
}
function start(){
    binod2 = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}
function modelLoaded(){
    console.log("Congratulations, Model loaded! Eat cake, eat sweets. Hurray!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function binod(){
    binod1 = document.getElementById("object_id").value;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}