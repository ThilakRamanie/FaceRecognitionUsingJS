// to display the video on screen
const video = document.getElementById("video");

// fetching-all-models-asynchronously
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
    // faceapi.nets.ageGenderNet.loadFromUri("./models")
  ]).then(beginVideo);

 function beginVideo () {
     // navigator.getuserMedia - streams the webcam video
    navigator.getUserMedia(
        {
            video: {}
        },
        stream => video.srcObject = stream,
        error => console.error(error)
    )
}
//  console.log(faceapi.nets)

// adding the event-listener if the video is playing
video.addEventListener('playing',() => {
// console.log('Video is playing');
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width:video.width, 
                        height:video.height}
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async ()=> {
        const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions();
        // console.log(detections)
        const resizeDetections = faceapi.resizeResults(detections,displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height) 

        /*Drawing the detection box, landmarks and face expressions on canvas*/
        faceapi.draw.drawDetections(canvas, resizeDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizeDetections);
    },100)
})

