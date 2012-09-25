var redpill = require('./redpill');
var u       = require('./util');

var q = redpill.pill('testq');

q.pull(function (item) {
    console.log("TEST: got message : "+item);
});

function pushmsg()
{
    var smsg = "hello world : "+u.suniq();
    console.log("TEST : push : "+smsg);
    q.push(smsg);
}
pushmsg();
pushmsg();
pushmsg();
pushmsg();

q.close();
