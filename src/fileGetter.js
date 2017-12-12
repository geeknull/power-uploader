'use strict';

import EventDelegate from './eventDelegate.js';
import Util from './util.js';

export default class {
    constructor (config = {}, pushQueue, eventEmitter, eventDelegate) {
        this.config = config;

        this.inputId = 'fileUploadBtn-' + new Date().getTime();
        this.eventEmitter = eventEmitter;
        this.eventDelegate = eventDelegate;
        this.globalEventDelegate = new EventDelegate(document); // 全局的事件代理
        this.log = config.log;

        this._selectFileTransactionId = 0;

        this.pushQueue = (file, groupInfo) => {
            file = this.fileFilter(file);
            if ( file ) {
                file.selectFileTransactionId = this._selectFileTransactionId;
                pushQueue(file, groupInfo).catch((err) => {
                    console.error(err);
                    debugger;
                });
            }
        };

        if (Util.isPlainObject(this.config.accept)) {
            this.config.accept = [ this.config.accept ];
        }
        if (this.config.accept) {
            let arr = [];
            for (let i = 0, len = this.config.accept.length; i < len; i++) {
                let item = this.config.accept[i].extensions;
                item && arr.push(item);
            }
            if (arr.length) {
                this.accept = '\\.' + arr.join(',')
                        .replace(/,/g, '$|\\.')
                        .replace(/\*/g, '.*') + '$';
            }
            this.accept = new RegExp(this.accept, 'i');
        }
        this._pickOnChangeBindThis = this._pickOnChange.bind(this);
        this._pickOnClickBindThis = this._pickOnClick.bind(this);

        this._pickDirOnClickBindThis = this._pickDirOnClick.bind(this);
        this._pickDirOnChangeBindThis = this._pickDirOnChange.bind(this);

        this._dndHandleDragenterBindThis = this._dndHandleDragenter.bind(this);
        this._dndHandleDragoverBindThis = this._dndHandleDragover.bind(this);
        this._dndHandleDragleaveBindThis = this._dndHandleDragleave.bind(this);
        this._dndHandleDropBindThis = this._dndHandleDrop.bind(this);

        this.init();
    }

    acceptFile(file) {
        let invalid = !file || this.accept &&
            // 如果名字中有后缀，才做后缀白名单处理。
            /\.\w+$/.exec(file.name) && !this.accept.test(file.name);

        return !invalid;
    }

    fileFilter(file) {
        if(this.acceptFile(file)) {
            return file;
        } else {
            this.eventEmitter.emit('uploadError', file,'不支持的文件格式');
            return false;
        }
    }

    init () {
        let input = `<input type="file" id="${this.inputId}" size="30" name="fileselect[]" style="position:absolute;top:-100000px;">`;
        let inputEle = Util.parseToDOM(input)[0];

        let inputDir = `<input type="file" id="${this.inputId}Dir" webkitdirectory mozdirectory size="30" name="fileselect[]" style="position:absolute;top:-100000px;">`;
        let inputEleDir = Util.parseToDOM(inputDir)[0];

        if (this.config.accept && this.config.accept.length > 0) {
            let arr = [];

            for (let i = 0, len = this.config.accept.length; i < len; i++) {
                arr.push(this.config.accept[i].mimeTypes);
            }
            inputEle.setAttribute('accept', arr.join(','));
        }
        if (!!this.config.multiple) {
            inputEle.setAttribute('multiple','multiple');
        }

        Util.removeDOM(`#${this.inputId}`);
        Util.removeDOM(`#${this.inputId}Dir`);
        this.config.body.appendChild(inputEle);
        this.config.body.appendChild(inputEleDir);
        this.reset();
        if (this.config.pick) {
            this._pickHandle();
        }
        if (this.config.pickDir) {
            this._pickDirHandler();
        }
        if (this.config.dnd) {
            this._dndHandle();
        }
        if (this.config.paste) {
            this._pasteHandle();
        }
    }

    _resetinput(ele) {
        ele.value = null;
    }

    reset() {
        let inputEle = document.querySelector(`#${this.inputId}`);
        this._resetinput(inputEle);
        let inputEleDir = document.querySelector(`#${this.inputId}Dir`);
        this._resetinput(inputEleDir);
    }

    _pasteHandle() {
        if (this.config.paste) {
            this.eventDelegate.on('paste', this.config.paste, (event) => {
                let clipboardData = event.clipboardData;

                if (!!clipboardData) {
                    let items = clipboardData.items;
                    for (let i = 0; i < items.length; ++i) {
                        let item = items[i];
                        let blob = null;
                        if (item.kind !== 'file' || !(blob = item.getAsFile())) {
                            continue;
                        }
                        event.stopPropagation();
                        event.preventDefault();
                        this._selectFileTransactionId++;
                        let groupInfo = {
                            id: this._selectFileTransactionId,
                            count: 1,
                            current: 1
                        };
                        this.pushQueue(blob, groupInfo);
                    }
                }
            });
        }
    }

    _pickHandle() {
        this.globalEventDelegate.on('change', `#${this.inputId}`, this._pickOnChangeBindThis);
        this.globalEventDelegate.on('click', this.config.pick, this._pickOnClickBindThis);
    }

    _pickDirHandler () {
        this.globalEventDelegate.on('change', `#${this.inputId}Dir`, this._pickDirOnChangeBindThis);
        this.globalEventDelegate.on('click', this.config.pickDir, this._pickDirOnClickBindThis);
    }

    async _pickOnChange(e) {
        e.stopPropagation();
        e.preventDefault();
        await this.funGetFiles(e);
        this.reset(); // 重复文件会不触发
    }

    async _pickOnClick (e) {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector(`#${this.inputId}`).click();
    }

    async _pickDirOnChange(e) {
        e.stopPropagation();
        e.preventDefault();
        await this.funGetFiles(e, 'pickDir');
        this.reset(); // 重复文件会不触发
    }

    async _pickDirOnClick(e) {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector(`#${this.inputId}Dir`).click();
    }

    _dndHandle() {
        if (this.config.dnd) {
            this.eventDelegate.on('dragenter', this.config.dnd, this._dndHandleDragenterBindThis);
            this.eventDelegate.on('dragover', this.config.dnd, this._dndHandleDragoverBindThis);
            this.eventDelegate.on('dragleave', this.config.dnd, this._dndHandleDragleaveBindThis);
            this.eventDelegate.on('drop', this.config.dnd, this._dndHandleDropBindThis);
        }
    }

    async _dndHandleDragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    async _dndHandleDragover(e) {
        e.dataTransfer.dropEffect = 'copy'; // 兼容圈点APP
        e.stopPropagation();
        e.preventDefault();
        this.eventEmitter.emit('dragover');
    }
    async _dndHandleDragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        this.eventEmitter.emit('dragleave');
    }
    async _dndHandleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        await this.funGetFiles(e);
    }

    //获取选择文件，file控件或拖放
    async funGetFiles(e, type) {
        let tmpFileArr = [];
        this._selectFileTransactionId++;
        let id = this._selectFileTransactionId;
        let count = 0;

        let files = e.target.files || e.dataTransfer.files;
        let items = e.target.items || (e.dataTransfer && e.dataTransfer.items);
        let entrys = [];
        for (let key in items) {
            if (!!items[key] && items.hasOwnProperty(key)) {
                if (items[key].getAsEntry) {
                    entrys.push(items[key].getAsEntry());
                } else if (items[key].webkitGetAsEntry) {
                    entrys.push(items[key].webkitGetAsEntry());
                } else {
                    entrys.push({});
                }
            }
        }
        await this.eventEmitter.emit('beforeFilesQueued', files);

        // uploadDir
        if (type === 'pickDir') {
            let filesArr = [].slice.call(files);
            tmpFileArr = filesArr.map(item => {
                Object.defineProperty(item, 'path' ,{
                    value: '/' + item.webkitRelativePath
                });
                return item;
            });
            let pathReg = /\/(\w*)\//;
            let someFileName = tmpFileArr[0].path;
            let dirName = someFileName.match(pathReg)[1];

            let entry = {};
            entry.path = entry.fullPath = dirName;
            entry.selectFileTransactionId = this._selectFileTransactionId;
            let res = await this.eventEmitter.emit('selectDir', entry);
            if (res.indexOf(false) !== -1) {
                return void 0;
            }
        } else {
            for (let index = 0, l = Object.keys(files).length; index < l; index++) {
                let file = files[index];
                if (!!file) {
                    if (entrys && entrys[index]) {
                        let entry = entrys[index]; // maybe is {}
                        if (entry !== null && entry.isDirectory) {
                            await this.folderRead(entry, tmpFileArr);
                            continue;
                        }
                    }

                    // file.path = '/' + file.name; // PC版这种情况会有问题
                    Object.defineProperty(file,'path',{
                        value:'/' + file.name
                    });

                    // let groupInfo = {
                    //     id: id,
                    //     count: ++count,
                    //     current: count
                    // };
                    if(!!this.config.multiple) {
                        tmpFileArr.push(file);
                        // await this.pushQueue(file, groupInfo);
                    }else{
                        tmpFileArr.push(file);
                        // await this.pushQueue(file, groupInfo);
                        break;
                    }

                }
            }
        }

        tmpFileArr.forEach(async (item, index, array) => {
            let count = array.length;
            let current = index+1;
            let groupInfo = {
                count, current,
                id: id
            };
            await this.pushQueue(item, groupInfo);
        });
        await this.eventEmitter.emit('filesQueued');
    }

    async folderRead(entry, tmpFileArr) {
        entry.path = entry.fullPath;
        entry.selectFileTransactionId = this._selectFileTransactionId;
        let res = await this.eventEmitter.emit('selectDir', entry);
        if (res.indexOf(false) === -1) {
            await new Promise((res)=> {
                entry.createReader().readEntries(async(entries) => {
                    for (var i = 0; i < entries.length; i++) {
                        let _entry = entries[i];
                        if (_entry.isFile) {
                            let file = await new Promise((res)=> {
                                _entry.file(async(file) => {
                                    // file.path = _entry.fullPath;
                                    Object.defineProperty(file,'path',{
                                        value:_entry.fullPath
                                    });
                                    res(file);
                                });
                            });
                            await this.eventEmitter.emit('beforeChildFileQueued', file, entry);

                            // 是上一个作用域的 即funGetFiles的
                            // let groupInfo = {
                            //     id: id,
                            //     count: ++count,
                            //     current: count
                            // };
                            tmpFileArr.push(file);
                            // await this.pushQueue(file, groupInfo);
                            await this.eventEmitter.emit('childFileQueued', file); // 假的
                        } else if (_entry.isDirectory) {
                            await this.eventEmitter.emit('beforeChildDirQueued', _entry, entry);
                            // await this.folderRead(_entry, entry);
                            await this.folderRead(_entry, tmpFileArr);
                            await this.eventEmitter.emit('childDirQueued', _entry);
                        }
                    }
                    res();
                });
            });
        }
    }

    destroy() {
        this.eventEmitter.removeEvents();

        if(this.config.dnd) {
            this.eventDelegate.off('dragover');
            this.eventDelegate.off('dragleave');
            this.eventDelegate.off('drop');
        }
        if (this.config.paste) {
            this.eventDelegate.off('paste');
        }

        this.globalEventDelegate.off('change');
        if(this.config.pick || this.config.pickDir) {
            this.globalEventDelegate.off('click');
        }
    }

    on(eventSource, fn) {
        this.eventEmitter.on(eventSource, fn);
    }
}
