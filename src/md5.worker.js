'use strict';
// self.importScripts('./spark-md5');
import SparkMD5 from 'spark-md5'; // for webpack

// TODO 占用大量CPU限速
// TODO 计算完成后worker销毁
let calcMd5 = (file) => {
    return new Promise((resolve, reject) => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();

        let currentChunk = 0;
        let chunkSize = 1 * 1024 * 1024; // 1MB
        let chunks = Math.ceil(file.size / chunkSize);

        fileReader.onload = function (e) {
            // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
            spark.append(e.target.result);                   // Append array buffer

            // 计算百分比
            let start = currentChunk * chunkSize;
            let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            let percent = parseInt(end / file.size * 100) + '%';
            // self.postMessage({percent});

            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                let md5Res = spark.end();
                // console.log('finished loading');
                // console.info('computed hash', md5Res);  // Compute hash
                resolve(md5Res);
            }
        };

        fileReader.onerror = function () {
            console.warn('oops, something went wrong.');
        };

        function loadNext() {
            let start = currentChunk * chunkSize;
            let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }
        loadNext();
    });
};

self.addEventListener('message', (message) => {
    let file = message.data;
    calcMd5(file).then((md5Res) => {
        self.postMessage(md5Res);
    });
});
