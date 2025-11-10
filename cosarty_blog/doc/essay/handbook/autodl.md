# autodl

## 谷歌浏览器开不了webgl

[教程](https://api.autodl.com/docs/vulkan/)

如果使用Vulkan时（或者使用其他软件，比如：omnigibson，但是依赖Vulkan），找不到GPU设备，那么按以下方式解决：

**第一步：写入ICD文件**

```bash
cat >> /etc/vulkan/icd.d/my_nvidia_icd.json <<EOF
{
    "file_format_version" : "1.0.0",
    "ICD": {
        "library_path": "/lib/x86_64-linux-gnu/libEGL_nvidia.so.0",
        "api_version" : "1.3.277"
    }
}
EOF
```

以上library_path中的库只能为`libEGL_nvidia`，不能是`libGLX_nvidia``，原因是服务器没有桌面，使用headless模式需要使用前者。具体可参考[文档](https://download.nvidia.com/XFree86/Linux-x86_64/535.183.01/README/installedcomponents.html)

**第二步：验证**

安装必要依赖


```bash
apt update && apt install -y vulkan-tools libvulkan1 libsm6 libegl1
```

最后执行`vulkaninfo` --summary来进行确认:

```echo
$ export VK_ICD_FILENAMES=/etc/vulkan/icd.d/my_nvidia_icd.json     # 显式指定ICD文件路径
$ vulkaninfo --summary
...
Devices:
========
GPU0:
        apiVersion         = 4206869 (1.3.277)
        driverVersion      = 2308620416 (0x899ac080)
        vendorID           = 0x10de
        deviceID           = 0x2684
        deviceType         = PHYSICAL_DEVICE_TYPE_DISCRETE_GPU  <--- 这里设备类型是GPU，说明正确。如果没有识别到GPU则是: PHYSICAL_DEVICE_TYPE_CPU
        deviceName         = NVIDIA GeForce RTX 4090            <--- 这里可以看出正确识别了GPU型号
        driverID           = DRIVER_ID_NVIDIA_PROPRIETARY
        driverName         = NVIDIA
        driverInfo         = 550.107.02
        conformanceVersion = 1.3.7.2
        deviceUUID         = 75219daa-2fe9-cefe-4994-1a598657b01f
        driverUUID         = 12adfef6-a92a-528b-8610-45df7fa0a5b8
...
```
