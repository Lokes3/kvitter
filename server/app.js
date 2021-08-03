var express = require('express');
var logger = require('morgan');
const db = require("./db")
const cors = require('cors')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get('/', function(req, res, next) {
  res.json({msg: "Hello, World!"});
});

app.get('/kvitter', async function (req, res) {
  const kvitter = await db.getKvitter()
  res.json({kvitter})
})

app.post("/kvitter", async function (req, res) {
  const msg = req.body
  console.log(msg)
  const kvitt = kvitterfy({
    message: msg.message,
    user: msg.user,
    created_at: new Date()
  });
  await db.storeKvitter(kvitt)
  res.json(kvitt)
})

kvitters = [
    "kvitt",
    "tuut",
    "krax"
]

birds = [
    "Blåmesen",
    "Måsen",
    "Kråkan",
]

function kvitterfy(kvitt) {
  const message = kvitt.message.split(" ")
      .map(word => word.match(/[AaEeIiOoUuÅåÄäÖöYy]/g).length)
      .map(count => kvitters[count % (kvitters.length)])
      .join(" ")
  const userHash = kvitt.user.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0)
  const user = birds[userHash % (birds.length)]
  return {
    ...kvitt,
    message,
    user,
  }

}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({errorMsg: "Vi misslyckades..."});
});

module.exports = app;
