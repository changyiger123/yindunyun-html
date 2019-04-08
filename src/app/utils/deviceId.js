var storage = window.localStorage;
var deviceId = storage.getItem("deviceId");
if(deviceId ===null){
  var timestamp = new Date().getTime();
  var dId = "Yinmi" + timestamp;
  storage.setItem("deviceId",dId);
  deviceId  = dId;
}
export default deviceId;
