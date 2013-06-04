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

var dtstats=2000;
var bins = {};
function stats()
{
    console.log('stats : ');

    var s=0;
    for (var k in bins)
    {
        console.log('bin : '+k+' : '+bins[k]);
        s+=bins[k];
    } 
    bins=[];

    var persec=(1000*(s+1)/dtstats).toFixed(1);
    console.log('  summary : '+s+' msgs recieved in '+dtstats+' millis : '+persec+' msgs/sec');
}


function on_msg(item) 
{
    var nw = t();
    var cr = item.split('_')[1];
    var dt = nw-cr;

    if (dt>50)
        dt=50;              // put all old messages in the same bin [ most are < 5ms ]

    if (!bins[dt])
        bins[dt]=1;
    else
        bins[dt]++;

    //console.log(" got  msg : "+item+' dT='+dt);
}

function pushmsg()
{
    var smsg = qname+'_'+t()+'_'+u.suniq();
    console.log(" push msg : "+smsg);
    q.push(smsg);
}

q.pull(on_msg);

setInterval(stats, dtstats);

//q.close();
