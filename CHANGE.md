# 0.4.2 2018.06.08
[fix] FakeBrowserFile不计算MD5

# 0.4.1 2018.06.07
[add] 暴露onPaste事件

# 0.4.0 2018.05.15
[add] 支持md5秒传逻辑


# 0.3.1 2018.01.25
[fix] 重传逻辑错误

# 0.3.0 2018.01.09
[add] 为支持Electron上传文件夹做改动
[add] 支持pushFile传数组

# 0.2.8 2017.12.27
[fix] 修复不选择支持文件夹的时候不创建冗余input标签

# 0.2.7 2017.12.23
[add] beforeFilesSourceQueued 支持返回false阻止上传

# 0.2.6 2017.12.22
[fix] 全局server、chunked失效问题 增加
[add] uploadSuccess 会返回 responseText 或 responseTextArr

# 0.2.5 2017.12.14
groupInfo alias

# 0.2.4 2017.12.14
groupId => uploadGroupId

# 0.2.3 2017.12.14
一些小优化

# 0.2.2 2017.12.14
修复中文文件夹名获取问题 & 重构文件夹上传逻辑 & 少量API参数变更

# 0.2.1
增加支持选择文件夹

# 0.2.0
- power-uploader init

# 0.1.20 2017.12.11
- 仓库转移

# 0.1.17 2017.11.02
- 日志信息修复[√]

# 0.1.16 2017.06.14
- 日志信息修复[√]

# 0.1.15 2017.06.14
- log信息增加文件名等信息[√]

# 0.1.14 2017.06.14
- 请求错误增加log[√]

# 0.1.13 2017.06.09
- 修复主动推进队列的文件没有分组信息[√]

# 0.1.12 2017.06.05
- 更改日志格式[√]

# 0.1.11 2017.05.31 
- 修复小问题[√]

# 0.1.10 2017.05.31
- 修复Safari诡异问题[√]
- 给大部分异步函数增加了try catch[√]
- 不要在async中用到arguments🤣

# 0.1.9 2017.05.27
- 修复abort后还会抛出progress事件的问题[√]
- 主动停止文件上传不将文件状态改成ERROR[√]

# 0.1.8 2017.05.26
- 修复重传从头开始传的问题[√]

# 0.1.7 2017.05.25
- 修复文件批量标识中的总数量 不过会使childFileQueued、childDirQueued并不会真的入队列，因为要统计总数量了[√]
- 修复主动上传支持意外抛出uploadAccept事件[√]

# 0.1.6 2017.05.24
- 跟进取消上传需要取消两次的情况[√]
- 文件批量标识[√]
- 文件ID多实例自定义标识[√]

# 0.1.5
- 添加 eslint 和 editorconfig[√]
- 拼写错误修改[√]
- 粘贴、拖拽区域支持多个选择器[√]
- 文档更新事件回调参数说明[√]

# 0.1.4
- runBlobQueue 成功失败都要在一起调用 [√]
- _catchUpfileError 重置错误分片的loaded属性 [√]
- _catchUpfileError 成功状态的分片就不置为ERROR [√]
- reUpload 成功状态的文件分片就不管了 [√]
- _baseupload chunkRetry判断 [√]
- path 赋值评论大象PC与大象Web差异 [√]
- 自定义log函数[√]
- log重新打点[√]
- 主动推入文件的id生成随机策略[√]

# NEXT TODO
- server、header、等局部merge全局的