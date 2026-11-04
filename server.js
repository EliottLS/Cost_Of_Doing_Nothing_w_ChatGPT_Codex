import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,resolve} from 'node:path';
const root=process.cwd();
http.createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const asset=path==='/'?'/index.html':path;if(!['/index.html','/style.css','/app.js','/model.js'].includes(asset)){res.writeHead(404).end('Not found');return;}const file=resolve(root,'.'+asset);const data=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.css':'text/css','.js':'text/javascript'})[extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404).end('Not found');}}).listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Value Studio listening on port '+(process.env.PORT||3000)));
