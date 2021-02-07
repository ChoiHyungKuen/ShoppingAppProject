const express = require('express');
const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const app = express();
const db = require('./models');

// npx sequelize db:create -> db 먼저 만들어야함 
// sync 하는 순간 등록된 정보와 model을 기반으로 테이블을 생성해준다. (대박..)
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/main', mainRouter);
app.use('/product', productRouter);

app.listen(3065, () => {
    console.log('서버 실행중!');
});