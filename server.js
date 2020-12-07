//express モジュールの読み込み
const express = require('express');

//サーバ作成
const app = express();
app.use(express.json());
// URLエンコードされたデータを解析する
app.use(express.urlencoded({ extended: true }));

//クロスドメインの許可　XSS
app.use((req, res, next) => {
    console.log(`middleware: all. url: ${req.url}`);

    //CROS設定: 全てのドメインに対して許可
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});

//静的コンテンツ追加用
app.use(express.static(__dirname * '/public'));

app.post('/', (req, res) =>{
    let result = {
        message: req.body.message,
    };
    res.send(result);
});

//ルーティング
//webルートにリクエストされたらレスポンス
app.get('/', (req, res)=> {
    res.send('Hello Express');
});

//app.get(URLパス、 処理);

//無名関数の書き方
//app.get('/', function(req, res) {

//});

app.listen(3000);

console.log('Server listen: http://localhost:3000');