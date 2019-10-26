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

使用`tsconfig.json`:  
* 不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始查找`tsconfig.json`，如果没有会继续再从父级目录查找, 直到找到`tsconfig.json`文件
* 不带任何输入文件的情况下调用`tsc`并且使用`--project`(或者只是`-p`)命令行选项来指定一个包含`tsconfig.json`或包含对应配置项的有效`.json`文件的路径

这里的不带任何输入文件指的是没有通过`tsc`命令来编译指定文件：  
```shell script
# 编译test.ts文件
tsc test.ts
# 不带任何输入文件
tsc
```
