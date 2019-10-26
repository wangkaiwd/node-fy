## node-fy

### 代码编译
#### 指定编译路径
修改`tsconfig.json`文件中的`outDir`选项：  
```.json
{
    "outDir": "dist/"
}
```
参数作用的英文描述如下：
> Redirect output structure to the directory

将输出结构重定向到目录。

准确的来说，这个选项会在指定目录下存放我们项目中通过`ts`文件编译生成的`js`文件

#### 执行编译命令
在我们安装了`typescript`之后，`typescript`会提供给我们一个`tsc`命令，它可以帮我们将`ts`代码编译为`js`代码。

接下来我们再命令行中执行：`tsc`

关于`tsc`命令的执行规则，官网的介绍在这里：[戳我](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)  
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/ts-tsc-use-tsconfig.json.png)
