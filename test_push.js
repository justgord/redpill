var redpill = require('./redpill');
var u       = require('./util');

var qname = u.suniq();
if (process.argv.length>2)
    qname = process.argv[2];
console.log('Queue : '+qname+' time : '+u.ts());

var q = redpill.pill(qname);

function t()
{
    return (new Date).getTime(); 
}


function on_msg(item) 
{
    var nw = t();
    var cr = item.split('_')[1];
    console.log(" got  msg : "+item+' dT='+(nw-cr));
}

function pushmsg()
{
    var smsg = qname+'_'+t()+'_'+u.suniq();
    console.log(" push msg : "+smsg);
    q.push(smsg);
}

//q.pull(on_msg);

setInterval(pushmsg, 1);

//q.close();
