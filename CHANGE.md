# 0.1.8 TODO 2017.05.26
- 修复重传从头开始传的问题

# 0.1.7 TODO 2017.05.25
- 修复文件批量标识中的总数量 不过会使childFileQueued、childDirQueued并不会真的入队列，因为要统计总数量了[√]
- 修复主动上传支持意外抛出uploadAccept事件[√]

# 0.1.6 TODO 2017.05.24
- 跟进取消上传需要取消两次的情况[√]
- 文件批量标识[√]
- 文件ID多实例自定义标识[√]

# 0.1.5 TODO
- 添加 eslint 和 editorconfig[√]
- 拼写错误修改[√]
- 粘贴、拖拽区域支持多个选择器[√]
- 文档更新事件回调参数说明[√]

# 0.1.4 TODO
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