---
isOriginal: true
# sidebar: false
timeline: true
tag: 
  - js
category: 前端
---



# URL.createObjectURL()
`URL.createObjectURL()` 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
简单说经过这个方法的处理后会生成一个临时的链接，然后直接赋值给src就行~

使用方式：  

> bjectURL = `URL.createObjectURL(blob)`;

示例：

```javascript
<input 
   fileInput="grFileUploader" 
   type="file" style="display: none"
   (change)="fileChange(idx, fileInput.files)"
   accept=".png,.jpeg,.jpg">

<img [src] ="imgsrc"/>

imgsrc:string="";

fileChange(index: number, files?: FileList): void {
    const file = files && files.item(0);
if (file) {2   this. imgsrc= URL.createObjectURL(file)}
```

# FileReader.readAsDataURL()

FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，
使用 File 或 Blob 对象指定要读取的文件或数据。
异步读取指定的Blob中的内容，一旦完成，会返回一个data: URL格式的字符串以表示所读取文件的内容。

使用方式：

>  fileStr = `FileReader.readAsDataURL(blob)`

示例：（同上）


区别

（1）返回值

     `FileReader.readAsDataURL(blob)`可以得到一段`base64`的字符串
      `URL.createObjectURL(blob)`得到的是当前文件的一个内存url

（2）内存使用

    `FileReader.readAsDataURL(blob)`得到一段超长的base64的字符串
     `URL.createObjectURL(blob)`得到的是一个url地址

（3）内存清理

    `FileReader.readAsDataURL(blob)`依照js垃圾回收机制自动从内存中清理
    `URL.createObjectURL(blob)`存在于当前document内，清除方式只有upload()事件或者revokeObjectURL()手                    动清除 

（4）执行方式
          
     `FileReader.readAsDataURL(blob)`通过回调的方式f返回，异步执行；
    `URL.createObjectURL(blob)` 直接返回，同步执行；

（5）多个文件
          
```JavaScript
`FileReader.readAsDataURL(blob)`同时处理多个文件时，需要一个文件对应一个FileReader对象；
`URL.createObjectURL(blob)` 依次返回，没有影响；
```
总结
**`URL.createObjectURL(blob)`** 得到本地内存容器的URL地址，方便预览，多次使用需要注意手动释放内存的问题，性能优秀。
**`FileReader.readAsDataURL(blob)`**胜在直接转为base64格式，可以直接用于业务，无需二次转换格式。