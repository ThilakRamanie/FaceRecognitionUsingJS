const video = document.getElementById("video");
console.log('1'),

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),
])
.then(beginVideo);
console.log('2');
function beginVideo  () {
    navigator.mediaDevices.getUserMedia(
        {
            video: {}
        },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

