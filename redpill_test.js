var redpill = require('./redpill');
var u       = require('./util');

var q = redpill.pill('testq');

q.pull(function (item) {
    console.log(" < got  msg : "+item);
});

function pushmsg(s)
{
    var smsg = s+'_'+u.suniq();
    console.log(" > push msg : "+smsg);
    q.push(smsg);
}


var msgs = ['one', 'two','333','FOUR','555','six'];

var timer = setInterval(sender, 1);

function sender()
{
    var m = msgs.shift();
    if (m)
        pushmsg(m);
    else
    {
        clearInterval(timer);
        setTimeout(done, 100);
    }
}

function done()
{
    q.close();
}

setTimeout(done, 500);
