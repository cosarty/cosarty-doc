# git 命令记录

## git push 报错 failed to push some refs to‘xxx‘

 1. 报错原因
      git 在 push 时报 error: failed to push some refs to 'git@xxx.xx.git’异常。一般发生在团队多人开发的时候，因为在你要提交之前有人提交了代码，并没有把他提交的同步到我的本地库，之后我在本地库添加了文件 test.vue，并想提交到 github 所以产生了冲突造成的，你需要先拉取最新的代码，之后在进行提交即可。
      但是因为本地更改了某些文件的代码，git pull 拉取代码时候也会报错，提示先把本地提交完毕，才能 git pull 拉取远程代码。
 2. 解决方案
  这个问题是因为远程库与本地库不一致造成的，那么我们把远程库同步到本地库就可以了。使用指令：

```bash
git pull --rebase origin master
```

这条指令的意思是把远程库中的更新合并到本地库中，–rebase 的作用是取消掉本地库中刚刚的 commit，并把他们接到更新后的版本库之中。

> git pull –rebase origin master意为先取消commit记录，并且把它们临时 保存为补丁(patch)(这些补丁放到”.git/rebase”目录中)，之后同步远程库到本地，最后合并补丁到本地库之中。