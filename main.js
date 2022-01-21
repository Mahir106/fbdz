Prediction = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KSrrTvOzE/model.json', modelLoaded);

function modelLoaded(){
    console.log("model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + Prediction_1;
    var Utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(Utterthis);
}

function check(){
    img = document.getElementById("captured_image");
    Classifier.classify(img, got_result);
}

function got_result(error,results){
if(error){
    console.error(error);
}else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    Prediction_1 = results[0].label;
    Prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Happy")
    {
    document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(results[0].label == "Sad")
    {
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(results[0].label == "Angry")
    {
        document.getElementById("update_emoji").innerHTML = "&#128548";
    }

    if(results[1].label == "Happy")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "Sad")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if(results[1].label == "Angry")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
}
}