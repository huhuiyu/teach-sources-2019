let txtEcho=document.getElementById('txtEcho');
let btnSend=document.getElementById('btnSend');
let btnConnect= document.getElementById('btnConnect');
let ws;
let isOpen=false;
let divInfo = document.getElementById('divInfo');

btnConnect.addEventListener('click',connect);

btnSend.addEventListener('click',function(){
  if(!isOpen){
    alert('请连接服务器');
    return;
  }
  ws.send(txtEcho.value);
});


function connect() {
  ws = new WebSocket(
    'wss://huhuiyu.top/teach-demo-service/ws/echo');
  ws.addEventListener('open',function(event){
    console.log('已经成功连接到websocket',event);
    isOpen=true;
    divInfo.innerHTML='连接成功！<br>'
      +divInfo.innerHTML;
  });
  ws.addEventListener('close',function(event){
    console.log('websocket已经断开',event);
    isOpen=false;
    ws=null;
    divInfo.innerHTML='连接断开！<br>'
      +divInfo.innerHTML;
  });
  ws.addEventListener('message',function(event){
    console.log('websoket接受到消息：',event.data);
    divInfo.innerHTML='服务器消息：'+ 
      event.data +'<br>'
      +divInfo.innerHTML;
  });
}