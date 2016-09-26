async function x(n) {
    return n ? await(n>>1):0 ;
}

async function sleep(t) {
    setTimeout(function(){ async return },t) ;
}

var x = {
    async get a() { return 1 },
    get async b() { return 1 }
}