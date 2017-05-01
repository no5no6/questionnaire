# questionnaire
一个极简的问卷系统，只需一些简单的配置就可以帮您解决问卷相关需求。  
前端主要框架与库：[Vue](https://github.com/vuejs/vue)、[Element](http://element.eleme.io)、[Vuex](https://vuex.vuejs.org)、[Vue-Router](http://router.vuejs.org/)  
后端主要框架与库：[express](http://expressjs.com/)、[mongodb](https://www.mongodb.com/)、[mongoose](http://mongoosejs.com/)

## 业务逻辑
1. 用户需先在模板管理页面创建问卷模板，再在问卷管理页面，选中该模板创建新的问卷。
2. 一个模板可对应多个（期）问卷，例：消费调查模板可对应，1月份消费调查问卷、2月份消费调查问卷、3月份消费调查问卷等，但同一模板下只允许一个（期）问卷为打开状态。
3. 点击问卷管理页面的查看按钮，获得问卷填写链接，此链接发给所有需要做问卷调查的用户，如果已填写过此期问卷则不能重复填写。
4. 问卷统计目前只能统计某一期的投票数据，暂不支持以模板为主体，统计该模板下多期综合投票数据。

## 主要功能
1. 管理员登录 (PS: 控制开启、关闭低多边形背景动画。目前版本开启背景动画对电脑性能考验较大，建议关闭)  
![login](login.gif)  

2. 设置问卷模板。  
![setQ](setQ.gif)  

3. 选择模板生成问卷。  
![set](set.gif)  

4. 用户填写问卷。  
![answer](answer.gif)  

5. 统计问卷。  
![statistics](statistics.gif)

## 使用与安装
1. 下载代码 ```git clone https://github.com/no5no6/questionnaire.git```。  
2. 安装后端依赖，项目根目录下执行 ```npm install```。  
3. 安装前端依赖，项目questionnaire_web目录下执行 ```npm install```。  
4. 配置数据库,首先确认本机已经正确安装了[mongodb](https://www.mongodb.com/)并在本机正常启动。在本地创建 `questionnaire` 数据库，设置登录账号用户名为 `ky1`，密码为 `123` (PS：如果需要更改数据库名称、用户名、密码，请打开questionnaire/models/index.js文件，找到对应位置 ```'mongodb://ky1:123@localhost:27017/questionnaire'``` 修改即可)。  
(1). 打开终端窗口（Terminal）。  
(2). 用命令行进入mongodb，输入并执行 ```mongo```。  
(3). 创建questionnaire数据库，输入并执行 ```use questionnaire```。  
(4). 创建用户，输入并执行  
      ```
        db.createUser({
          user:'ky1',
          pwd:'123',
          roles:[{
            "role" : "readWrite",
            "db": "questionnaire"
          }]
        })
      ```
      
5. 启动后端服务，项目根目录下执行 ```node questionnaire```。  
6. 创建管理员  
(1). 打开终端窗口（Terminal）。  
(2). 用命令行进入mongodb，输入并执行 ```mongo```。  
(3). 创建questionnaire数据库，输入并执行 ```use questionnaire```。  
(4). 创建用户，输入并执行  
      ```
        db.users.insert({
          name: "admin", 
          password: "123", 
          organization: 'test' 
        })
      ```
      
7. 启动前端服务，项目questionnaire_web目录下执行 ```npm run dev```。  
8. 打开浏览器，访问 [localhost:8080/#/questionList](http://localhost:8080/#/questionList)。(PS: 填写问卷时只需将查看地址发给所有需要填写问卷的用户)  

## 项目结构
```
├── db                 // 备份数据库脚本
├── models             // 数据库模型目录
├── public
│   └── web            // 前端打包后运行文件目录
│
├── questionnaire_web  // 前端目录
│   ├── src
│   │   ├── components // 组件目录
│   │   ├──router      // 路由目录（vue-router）
│   │   ├── store      // 模型目录(vuex)
│   │   ├── views      // 视图目录
│   │   └── main.js    // 前端入口文件
│   ├── index.html     // 首页
│   └── package.json   // 前端包管理文件
│
├── router             // 接口目录
├── package.json       // 后端包管理文件
└── questionnaire.js   // 项目主进程
```

