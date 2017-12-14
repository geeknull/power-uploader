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

        this._groupId = 0;

        this.pushQueue = (file, groupInfo) => {
            file = this.fileFilter(file);
            if ( file ) {
                file.selectFileTransactionId = this._groupId;
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
                        this._groupId++;
                        let groupInfo = {
                            id: this._groupId,
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
        await this.getFiles(e, 'pick');
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
        await this.getFiles(e, 'pickDir');
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
        await this.getFiles(e, 'drop');
    }

    //获取选择文件，file控件或拖放
    // @actionType ['pick' || 'pickDir' || 'drop' ]
    async getFiles(e, actionType) {
        let tmpFileArr = [];
        this._groupId++;
        let groupId = this._groupId;

        let files = e.target.files || e.dataTransfer.files; // 后者在拖拽文件的情况会存在
        let items = (e.dataTransfer && e.dataTransfer.items) || []; // 拖拽的文件会有

        let filesArr = [].slice.call(files);
        let itemsArr = [].slice.call(items);
        let entryArr = itemsArr.map(item =>
            item.getAsEntry ? item.getAsEntry() : (item.webkitGetAsEntry ? item.webkitGetAsEntry() : null));

        await this.eventEmitter.emit('beforeFilesSourceQueued', {filesSource: filesArr, actionType, groupId});

        // uploadDir
        if (actionType === 'pickDir') {
            if (filesArr.length === 0) {
                return void 0;
            }
            tmpFileArr = filesArr.map(item => {
                Object.defineProperty(item, 'path' ,{
                    value: '/' + item.webkitRelativePath
                });
                return item;
            });

            let pathReg = /\/(.*)\//;
            let someFileName = tmpFileArr[0].path;
            let dirName = someFileName.match(pathReg)[1];

            let entry = {};
            entry.path = entry.fullPath = '/' + dirName;
            entry.groupId = groupId;

            let res = await this.eventEmitter.emit('selectDir', {entry, groupId, actionType});
            if (res.indexOf(false) !== -1) {
                return void 0;
            }
        } else {
            for (let i = 0, len = filesArr.length; i < len; i++) {
                let file = filesArr[i];
                let item = itemsArr[i];
                let entry = entryArr[i];

                if (entry && entry.isDirectory) {
                    await this.folderRead({entry, tmpFileArr, groupId, actionType});
                    continue;
                }

                // file.path = '/' + file.name; // PC版这种情况会有问题
                Object.defineProperty(file, 'path', {value: '/' + file.name});

                tmpFileArr.push(file);
            }
        }

        // TODO this.config.multiple to break the for cycle
        if (this.config.multiple === false) {
            tmpFileArr = tmpFileArr[0] || [];
        }

        tmpFileArr.forEach(async (item, index, array) => {
            let count = array.length;
            let current = index+1;
            let groupInfo = {
                count, current,
                id: groupId
            };
            await this.pushQueue(item, groupInfo);
        });
        await this.eventEmitter.emit('filesSourceQueued', {filesSource: tmpFileArr, groupId, actionType });
    }

    // add custom field: path groupId
    async folderRead({entry, tmpFileArr, groupId, actionType}) {
        // custom field
        entry.path = entry.fullPath;
        entry.groupId = groupId; // old selectFileTransactionId

        let eventResFlagArr = await this.eventEmitter.emit('selectDir', {entry, groupId, actionType});
        if (eventResFlagArr.indexOf(false) !== -1) {return void 0;}


        await new Promise((resolve)=> {
            entry.createReader().readEntries(async(entries) => {
                for (let i = 0; i < entries.length; i++) {
                    let _entry = entries[i];

                    if (_entry.isFile) {
                        let file = await new Promise((r)=> {
                            _entry.file(file => r(Object.defineProperty(file, 'path', {value:_entry.fullPath})) );
                        });

                        await this.eventEmitter.emit('beforeChildFileQueued', {fileSource: file, parentEntry: entry, groupId, actionType});
                        tmpFileArr.push(file);
                        await this.eventEmitter.emit('childFileQueued', {fileSource: file, parentEntry: entry, groupId, actionType});

                    } else if (_entry.isDirectory) {

                        await this.eventEmitter.emit('beforeChildDirQueued', {currentEntry: _entry, parentEntry: entry, groupId, actionType});
                        await this.folderRead({entry: _entry, tmpFileArr, groupId, actionType});
                        await this.eventEmitter.emit('childDirQueued', {currentEntry: _entry, parentEntry: entry, groupId, actionType});
                    }
                }
                resolve();
            });
        });
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
