redpill
=======

persistent messaging node.js publish subscribe api, implemented with Redis pubsub and list primitives

why?
----

Redis pub/sub primitives are great for soft realtime messaging, but lack persistence.

redpill uses pubsub notifications to notify when data is ready, and uses list lpush/lpop primitives to write and read data.

API
----

    var redpill = require('./redpill');

    var q = redpill.pill('queue_name');

    q.pull(function (item) {
        console.log("got message : "+item);
    });

    q.push("hello world");

    q.close();



todo
----

Make redpill an npm module
test - fix timing wierdness
perf tests / timing / stats

deps
----

redis
mersenne
winston
