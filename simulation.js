var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: './50ecb56d59557fce10445930b715582d08808b189f19e70a764a8342f878f0ad-private.pem.key',
    certPath: './50ecb56d59557fce10445930b715582d08808b189f19e70a764a8342f878f0ad-certificate.pem.crt',
    caPath: './AmazonRootCA1.pem',
    clientId: 'raspberrypi',
    host: 'axmvhr3fjsyds-ats.iot.us-east-1.amazonaws.com'
});

 

device.on('connect', function(){
    console.log('connected to AWS');
    device.publish('raspberrypi/telemetry',JSON.stringify({"thingId":"raspberrypi","temperature":55,"humidity":42,"vibration":2,"flame":558,"smoke":38,"water_pressure":152,"area":1}));
    device.publish('raspberrypi/telemetry',JSON.stringify({"thingId":"raspberrypi","temperature":150,"humidity":42,"vibration":3,"flame":200,"smoke":38,"water_pressure":152,"area":1}));
    device.publish('raspberrypi/telemetry',JSON.stringify({"thingId":"raspberrypi","temperature":25,"humidity":42,"vibration":7,"flame":5,"smoke":38,"water_pressure":152,"area":1}));
    function getRandomArbitrary(lower, upper){
        return Math.floor(lower + (Math.random() * (upper - lower)));
    }

    function myTimer(){
        let data = {}
        data['thingId'] = "raspberrypi"
        data['temperature']=getRandomArbitrary(0,150)
        data['humidity']=getRandomArbitrary(0,100);
        data['vibration']=getRandomArbitrary(1,8);
        data['flame'] = getRandomArbitrary(0, 500)
        data['smoke'] = getRandomArbitrary(0, 700)
        data['water_pressure'] = getRandomArbitrary(0, 1000)
        data['area'] = getRandomArbitrary(1, 3)
        device.publish('raspberrypi/telemetry', JSON.stringify(data));
        console.log("Data sent: " + JSON.stringify(data));
    }

    setInterval(myTimer, 20000);

 

});