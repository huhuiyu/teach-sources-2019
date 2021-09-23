// 自动重连的WebSocket
let ws;
let isOpen=false;
function AutoConnect() {
  ws = new WebSocket(
    'wss://huhuiyu.top/teach-demo-service/ws/chat');
  ws.addEventListener('open',function(){
    console.log('连接成功',new Date().getTime());
    isOpen=true;
    divInput.style.display='block';
  });
  ws.addEventListener('close',function(){
    divInput.style.display='none';
    console.log('连接断开',new Date().getTime());
    isOpen=false;
    ws=null;
    setTimeout(AutoConnect,5000);
  });
  ws.addEventListener('message',function(event){
    console.log(event.data,JSON.parse(event.data));
    let info = JSON.parse(event.data);
    if(info.type=='chat') {
      info = info.message;
      divInfo.innerHTML=info.name+'说：'+info.info
        +'<br>'+divInfo.innerHTML;
    }
  });
}

AutoConnect();

let divInput=document.getElementById('divInput');
let txtName=document.getElementById('txtName');
let txtInfo=document.getElementById('txtInfo');
let btnSend=document.getElementById('btnSend');
let divInfo=document.getElementById('divInfo');
// 不显示输入，必须是已经连接的状态才可以操作
divInput.style.display='none';
let chatInfo={
  name:'',info:''
};

btnSend.addEventListener('click',function(){
  chatInfo.name=txtName.value;
  chatInfo.info=txtInfo.value;
  ws.send(JSON.stringify(chatInfo));
});