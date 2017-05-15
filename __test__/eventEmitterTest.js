/**
 * Created by yeanzhi on 15/11/3.
 */
import {eventEmitter} from '../eventBus.js';
import {logger} from '@util/util';


eventEmitter.on('hello', ()=> {
    logger.log(1);
    return 111;
});
eventEmitter.on('hello', ()=> {
    logger.log(1);
    return 222;
});
eventEmitter.on('hello', async ()=> {
    let a = await new Promise((res, rej)=> {
        setTimeout(()=> {
            res(4321);
        }, 1000);
    });
    logger.log('ssssssssss');
});

//eventEmitter.on('hello',()=>{
//    logger.log(2);
//    return 1234;
//});

async function bb () {
    let res = await eventEmitter.emit('hello');
    logger.log(res);
}

class a {
    async aa () {
        let res = await eventEmitter.emit('hello');
        logger.log('end');
    }
}

bb();

logger.log('end');
