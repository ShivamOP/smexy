
'use strict';

module.exports = {
  name: "pu", 
  run: async(bot,message, args, prefix) => {
    var tbx = new Array();

    const chunkBy = (n) => number => {
        tbx = new Array(Math.floor(number / n)).fill(n);
        var remainder = number % n;
        if(remainder > 0) {
          tbx.push(remainder);
        }
      return tbx;
    };

    const chunkBy100 = chunkBy(100);
      
    tbx.push(chunkBy100(args[0]));

    for (const x of tbx) { 
        setInterval (function () {
            message.channel.bulkDelete(x)
        }, 5000);
    };
}

}