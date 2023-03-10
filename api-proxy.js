const http = require('http');
const request = require('request');

const API_URL = 'https://api.openai.com/v1/chat/completions'; // ChatGPT API 地址

const server = http.createServer((req, res) => {
  if (req.url !== '/api/chatgpt') {
    res.statusCode = 404;
    res.end('/api/chatgpt Not Found');
    return;
  }

  const url = `${API_URL}`;

  const options = {
    method: req.method,
    url,
    headers: req.headers,
    json: true,
    body: req.body,
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
    }

    // 将响应的 header 和 body 转发回客户端
    res.statusCode = response.statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST');
    res.setHeader('Access-Control-Max-Age', 86400);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.end(JSON.stringify(error || body));
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
