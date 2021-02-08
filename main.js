leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
rightWristX = 0;
harry_potter = " ";
var_score = 0;
keypoint_score = 0;
function preload()
{
    harry_potter = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function draw()
{
    image(video , 0 , 0 , 500 , 500);
    stroke("#ff0022");
    fill ("#ff0022");
    if(var_score > 0.2)
    {
    circle(leftWristX,leftWristY,30);
    numberLeft = Number(leftWristY);
    remove_number = floor(numberLeft);
    volume = remove_number/500;
    document.getElementById("volume2").innerHTML = "volume = " + volume;
    harry_potter.setVolume(volume);
    }
    if(keypoint_score > 0.2)
    {
        circle(rightWristX,rightWristY,30);
    if(rightWristY>0 && rightWristY<=100)
    {
        document.getElementById("speed").innerHTML = "<h3> speed = 0.5X </h3>";
        harry_potter.rate(0.5);
console.log(harry_potter);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML = "<h3> speed = 1X </h3>";
        harry_potter.rate(1);
console.log(harry_potter);
    }
    else if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML = "<h3> speed = 1.5X </h3>";
        harry_potter.rate(1.5);
console.log(harry_potter);
    }
    else if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML = "<h3> speed = 2X </h3>";
        harry_potter.rate(2);
console.log(harry_potter);
    }
    else if(rightWristY>400 && rightWristY<=500)
    {
        document.getElementById("speed").innerHTML = "<h3> speed = 2.5X </h3>";
        harry_potter.rate(2.5);
console.log(harry_potter);
    }
}

}

function modelLoaded()
{
    console.log("modelLoaded");

}
function play_sound()
{
    harry_potter.play();
    harry_potter.setVolume(1);
    harry_potter.rate(1.5);
}
function stop_sound()
{
    harry_potter.stop();
}
function gotPoses(results)
{
    if(results.length > 0)
    {
console.log(results);
var_score = results[0].pose.keypoints[9].score;
console.log(var_score);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX  " + leftWristX + "leftWristY  " + leftWristY);

keypoint_score = results[0].pose.keypoints[10].score;
console.log(keypoint_score);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX  " + rightWristX + "rightWristY  " + rightWristY);
console.log("leftWrist = " + var_score ,"rightWrist = "+ keypoint_score);

    }
}