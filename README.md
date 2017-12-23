# 文件传输SDK文档

## 引入方式

建议使用ES6引入。

```javascript
import {Uploader, FileStatus} from 'power-uploader';
```

- `Uploader`：文件传输SDK的构造类
- `FileStatus`：文件实例的状态
    - `INITED`：初始状态(beforeFileQueued事件之后就会变更)
    - `QUEUED`：已经进入队列, 等待上传
    - `PROGRESS`：上传中
    - `ERROR`：上传出错，可重试
    - `CANCELLED`：上传取消，会清出队列
    - `INTERRUPT`：上传中断，可续传
    - `INVALID`：文件不合格，不能重试上传

## 初始化

### eg.

```javascript
let uploader = new Uploader({
    pick: '.ff-wrap .up-btn',
    dnd: 'body, .dnd-area',
    paste: ['body', '.paste-area'],
    listenerContainer: document,
    body: document.body,
    chunked: true,
    chunkSize: 20971520,
    multiple: true,
    withCredentials: true
});
```

### 初始化参数

| 参数名 | 数据类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| timeout | Number | 0 | 超时时间，为0时不会设置超时事件 |
| accept | Array | [] | [{extensions: 'jpg', mimeTypes: 'image/*'}] |
| auto | Boolean | true | 是否得到文件后就上传，暂不支持设置为false |
| sameTimeUploadCount | Number | 3 | 同时上传分片的个数 |
| chunked | Boolean | false | 是否开启分片上传 |
| chunkSize | Number | 20971520 | 分片大小，默认是20MB |
| chunkRetry | Number | 2 | 分片失败重试次数(不建议更改太大) |
| formData | Object | {} | 除了二进制文件外，拓展的formData对象 |
| headers | Object | {} | 自定义头 |
| fileVal | String | 'file' | formData二进制文件的key |
| method | String | 'post' | 请求方法 |
| fileNumLimit | Number | undefined | 暂不启用 |
| fileSizeLimit | Number | undefined | 暂不启用 |
| fileSingleSizeLimit | Number | undefined | 暂不启用 |
| dnd | String | void 0 | 拖拽区域选择器 |
| pick | String | void 0 | 点击区域的选择器 |
| pickDir | String | void 0 | 点击区域的选择器(选择文件夹) |
| paste | String | void 0 | 粘贴区域选择器 |
| server | String | '' | 服务器地址 |
| listenerContainer | DOM | document | 事件委托的DOM元素 |
| body | DOM | document.body | 动态创建的input插入到的DOM元素 |
| multiple | Boolean | false | 是否可以选择多文件上传 |
| withCredentials | Boolean | true | 是否开启跨域带cookie |
| setName | Function | (id) => new Date().getTime() + id | 无文件名文件函数 |
| log | Function | console.log | 记录log的函数 |
| logLevel | Number | 1 | 暂时不开启使用 |

其中`pick`、`dnd`、`paste`填写选择器的时候支持Selector String，通过`,`分隔的Selector String，存放Selector String的数组。

## file对象封装

file对象封装在事件回调函数中返回的参数对象里为`file`的`key`

- `eventEmitter`：事件发射器
- `ext`：文件后缀
- `id`：文件唯一标识符，eg：`WU_FILE_0`
- `isFile`：是否是文件(有可能是目录呢)
- `lastModifiedDate`：最后修改时间
- `loaded`：上传字节数
- `name`：文件名
- `path`：文件路径
- `uploadGroupId`：文件组ID
- `size`：文件大小(字节数)
- `source`：原生文件对象
- `statusText`：文件状态，即`FileStatus`的值
- `type`：文件的MIME Type，eg`video/mp4`

## 事件

所有的事件的回调函数返回的参数均是一个对象，参数中可能有的值说明

| 名称 | 数据类型 | 说明 | 存在事件 |
| :--- | :--- | :--- | :--- |
| file | Object | 即上面的file对象封装 | 所有事件 |
| currentShard | Number | 当前文件分片，从1开始计算，不是从0开始 | 大部分事件 |
| shardCount | Number | 文件总分片 | 大部分事件 |
| shard | Blob | 分片的二进制对象，一般很少用到 | 大部分事件 |
| total | Number | 文件的总字节数 | 大部分事件 |
| loaded | Number | 文件读取的字节数 | uploadProgress |
| isUploadEnd | Boolean | 文件是否传输完毕 | uploadProgress |
| responseText | String | 分片请求后的服务端返回 | uploadAccept |
| responseText | String | 分片请求后的服务端返回 | uploadAccept |
| error | Error | 上传错误信息 | uploadError |

- `beforeFilesSourceQueued`: 选择上传一组文件之前 包含目录源信息
	`@return Object { filesSource, actionType, uploadGroupId }`
	**demo**
    
	```javascript
    uploader.on('beforeFilesSourceQueued', (obj) => {
        let {filesSource, actionType, uploadGroupId} = obj;
        if (actionType === 'pickDir') {
            // 选择的是文件夹
        }
        // 超过10个文件不允许上传
        if (filesSource.length > 10) {
            return false;
        }
    });
	```

- `filesSourceQueued`: 选择上传一组文件之后 文件源信息
	`@return Object { filesSource, actionType, uploadGroupId }`
	**demo**
    
	```javascript
    uploader.on('filesSourceQueued', (obj) => {
        let {filesSource, actionType, uploadGroupId} = obj;
        if (actionType === 'pickDir') {
            // 选择的是文件夹
        }
    });
	```

- `beforeFileQueued`：文件添加到上传队列之前，可以对文件进行一些过滤，`return false;`会阻止将该文件加入队列。
    
    `@return Object { file }`

    **demo**
    
    ```javascript
    uploader.on('beforeFileQueued', (obj)=> {
        console.log('beforeFileQueued');
        let { file, setContentType } = obj;
        setContentType('image/png'); // 更改文件的Content-Type  
    
        if (/^[^<>\|\*\?\/]*$/.test(file.name)) {
            let b1 = new Buffer(file.name);
            let bytes = Array.prototype.slice.call(b1, 0);
            if (bytes.length > 128) {
                alert('字符长度过长');
                return false;
            }
        } else {
            alert('存在特殊字符');
            return false;
        }
    
        return true;
    });
    ```

- `fileQueued`：没有被`beforeFileQueued`阻止，文件已经被添加进队列，等待上传。
    
    `@return Object { file }`
    
    **demo**
    
    ```javascript
    uploader.on('fileQueued', (obj) => {
        console.log('fileQueued');
        let { file } = obj;
    
        this.setState({
            fileList: [...this.state.fileList, file]
        });
    });
    ```

- `uploadStart`：该文件已经开始上传(第一片分片已经上传了)。
    
    `@return Object { file }`
    
    **demo**
    
    ```javascript
    uploader.on('uploadStart', (obj)=> {
        console.log('uploadStart');
        let { file } = obj;

        // 开始请求的文件statusText属性会有变化
        let newFileList = this.state.fileList.map(fileItem =>
            file.id === fileItem.id ? file : fileItem );
        this.setState({ fileList: newFileList });
    });
    ```
    
- `uploadBeforeSend`：每一个分片上传之前，可以修改`new Uploader`的时候传入的部分属性，如`server`、`headers`。

    `@return Object { file, currentShard[Number], shardCount[Number], shard[Blob] }`

    **demo**

    ```javascript
    uploader.on('uploadBeforeSend', (obj)=> {
        console.log('uploadBeforeSend');
        let { file, currentShard, shard, shardCount } = obj;

        uploader.config.headers = {
            'cfp': encode(JSON.stringify({
                path: `/person/126222/测试/图片${new Date().getTime()}.jpg`
            }))
        };
        uploader.config.server = 'http://api.neixin.cn/pan/ul/6/storage/create.json';
    });
    ```

- `uploadProgress`：上传进度回调。

    `@return Object { file, loaded[Number], total[Number], shardLoaded[Number], shardTotal[Number] }`

    其中`loaded`和`total`是整体文件的，`shardLoaded`和`shardTotal`是单个分片的，`file.loaded`已经是`loaded`的值。

    **demo**

    ```javascript
    uploader.on('uploadProgress', (obj)=> {
        console.log('uploadProgress');
        let { file, loaded, total, shardLoaded, shardTotal } = obj;
    
        console.log(loaded / total * 100 + '%', file.loaded);
        this.setState({
            fileList: this.state.fileList.map(item => item.id === file.id ? file : item)
        });
    });
    ```

- `uploadAccept`：分片上传成功。
    
    `@return Object { file, shard[Blob], shardCount[Number], currentShard[Number], isUploadEnd[Boolean], responseText[String] }`

    **demo**

    ```javascript
    uploader.on('uploadAccept', async(obj)=> {
        console.log('uploadAccept');
        let { file, shard, shardCount, currentShard, isUploadEnd, responseText } = obj;
    });
    ```


- `uploadSuccess`：文件上传成功。

    `@return Object { file, currentShard[Number], shardCount[Number], shard[Blob], responseText[String], responseTextArr[Array] }`
        
    **demo**
    
    ```javascript
    uploader.on('uploadSuccess', (obj) => {
        console.log('uploadSuccess');
        let { file, currendShard, shardCount, shard, responseText, responseTextArr } = obj;
        
        if (shardCount === 1) {
	         // use responseText
        } else {
            // use responseTextArr
        }

        let newFileList = this.state.fileList.map(item => file.id === item.id ? file : item);
        this.setState({fileList: newFileList});
    });
    ```

- `uploadEndSend`：文件上传结束，成功失败都会触发。
    
    同`uploadSuccess`

- `uploadError`：文件上传失败。

    `@return Object { file, error[Error] }`
	

文件夹相关的事件：
    
- `beforeChildFileQueued`：文件夹中的子文件入队列之前
	`@return Object { fileSource, parentEntry, uploadGroupId, actionType }`
	
- `childFileQueued`：文件夹中的子文件入队列之后
	`@return Object { fileSource, parentEntry, uploadGroupId, actionType }`

- `beforeChildDirQueued`：文件夹中的子文件夹入队列之前
	`@return Object { currentEntry, parentEntry, uploadGroupId, actionType }`

- `childDirQueued`：文件夹中的子文件夹入队列之后
	`@return Object { currentEntry, parentEntry, uploadGroupId, actionType }`

- `selectDir`：选择了文件夹，参数返回entry信息，通过return false; 可以禁止
	`@return Object { entry, uploadGroupId, actionType }`










