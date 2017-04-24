# questionnaire
一个极简的问卷系统，只需一些简单的配置就可以帮您解决问卷相关需求。  
前端主要框架与库：[Vue](https://github.com/vuejs/vue)、[Element](http://element.eleme.io)、[Vuex](https://vuex.vuejs.org)、[Vue-Router](http://router.vuejs.org/)  
后端主要框架与库：[express](http://expressjs.com/)、[mongodb](https://www.mongodb.com/)、[mongoose](http://mongoosejs.com/)

## 主要功能
1. 设置问卷模板。  
![set](set.gif)
2. 选择模板生成问卷。  
![setQ](setQ.gif)
3. 用户填写问卷。  
![answer](answer.gif)
4. 统计问卷。  
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
6. 启动前端服务，项目questionnaire_web目录下执行 ```npm run dev```。  
7. 打开浏览器，访问 [localhost:8080/#/questionList](http://localhost:8080/#/questionList)。  

## 业务逻辑

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

