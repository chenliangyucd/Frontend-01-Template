const net = require('net');



class Request {

  constructor(params) {
    this.method = params.method || 'GET';
    this.port = this.port || 8088;
    this.host = this.getHost(params.host);
    this.path = params.path || '/';
    this.heads = this.getHeads(params.heads);
    this.body = this.getBody(params.body);
    this.initHeads();
  }
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  getHost(host) {
    if (typeof host === 'string' && host.length > 0) {
       return host;
    } else {
       throw new Error("host不可为空");
    }
  }
  // 初始化处理参数
  getHeads(heads = {}) {
  	if (!this.isObject(heads)) {
        throw new Error("heads需要对象类型")
  	}
  	
    if (!heads['Content-Type']) {
        heads['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return heads;
  }
  
  getBody(body = {}) {
  	if (!this.isObject(body)) {
        throw new Error("body需要对象类型")
  	}

    let contentType = this.heads['Content-Type'];

    if (contentType === 'application/x-www-form-urlencoded') {
      body = Object.keys(body).map((key)=>{return `${key}=${body[key]}`}).join("&");
    } else if (contentType === 'application/json') {
      body = JSON.stringify(body);
    } else {
      throw new Error(`暂不支持contentType=${contentType}`);
    }

    return body;
  }
  initHeads() {
  	this.heads["Content-Length"] = `${this.body.length}`
  }
  _getClient() {
  	return new Promise((resolve)=>{
  	   const client = net.createConnection({ 
	     host: this.host,
	     port: this.port
       }, () => {
          resolve(client);  
       });

       client.on('data', (data) => {
         console.log('--------------------------------');
         console.log(data.toString());
         console.log('--------------------------------');
         client.end();
       });
  	})
  
  }
  async send() {
      let client = await this._getClient();
      let content = this.toString();
      console.info(content);
      client.write(content);
  }
  // ${Object.keys(this.heads).map((key)=>{ return `${key}=${this.heads[key]}\r`}).join('')}
  toString() {
    let content = 
`${this.method} ${this.path} HTTP/1.1\r
Host: ${this.host}\r
${Object.keys(this.heads).map((key)=>{ return `${key}:${this.heads[key]}`}).join('\r\n')}\r
\r
${this.body}`;
    return content;
  }
}

let request = new Request({
	port: 8088,
	host: "127.0.0.1",
	body: {"name": "chenliangyu"}
});

request.send();

// console.info(request.toString());


/*
const client = net.createConnection({ 
	host: "127.0.0.1",
	port: 8088 
}, () => {
  // 'connect' listener
  console.log('connected to server!');
  let content = request.toString();
  console.log(content);
  client.write(content);
});

client.on('data', (data) => {
  console.log('--------------------------------');
  console.log(data.toString());
  console.log('--------------------------------');
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});*/