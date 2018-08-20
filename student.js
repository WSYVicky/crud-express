/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * 封装异步 API
 * 异步编程回调函数
 *
 */
var fs = require('fs')
var dbPath = './db.json'

/**
 * 获取所有学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function(callback){
  /**
   * 回调函数参数：
   * 		第一个参数是err
   * 	  	成功——null
   * 	  	错误——错误对象
   * 	  第二个参数是结果
   * 	    成功——数组
   * 	    错误——undefined
   */
  fs.readFile(dbPath,'utf8',function (err,data) {
    if(err){
      return callback(err)
    }
    callback(null,JSON.parse(data).students)
  })
}

/**
 * 根据 id 获取学生列表
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function(id,callback){
  fs.readFile(dbPath,'utf8',function (err,data) {
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students
    students.id = parseInt(students.id)
    var ret = students.find(function (item) {
      return item.id === id
    })
    callback(null,ret)
  })
}

/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function(student,callback){
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    //（1）添加 id ，唯一不重复
    student.id = students[students.length - 1].id + 1

    //（2）把用户传递的对象保存到数组中
    students.push(student)

    //（3）把对象数据转为字符串
    var fileData = JSON.stringify({
      students:students
    })

    //（4）把字符串保存到文件中
    fs.writeFile(dbPath,fileData,function(err){
      if(err){
        //错误就是把错误对象传递给它
        return callback(err)
      }
      //成功就没错，所以对象就是null
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.updateById = function(student,callback){
  //（1）读文件
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students

    //把id统一转为数字类型
    student.id = parseInt(student.id)

    // （2）把需要修改那一条数据的 id 找出来
    // ES6 中的一个数组方法：find
    // 当某个遍历项符合条件，终止遍历，返回数据
    var stu = students.find(function (item) {
      return item.id === student.id
    })

    // （3）遍历拷贝对象
    for(var key in student){
      stu[key] = student[key]
    }
    // （4）转换成字符串
    var fileData = JSON.stringify({
      students:students
    })
    // （5）写文件
    fs.writeFile(dbPath,fileData,function(err){
      if(err){
        //错误就是把错误对象传递给它
        return callback(err)
      }
      //成功就没错，所以对象就是null
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.deleteById = function(id,callback){
  //1. 获取要删除的id
  //2. 根据id执行删除操作
  //3. 根据操作结果发送响应数据
  fs.readFile(dbPath,'utf8',function(err,data){
    if(err){
      return callback(err)
    }
    var students = JSON.parse(data).students

    //把id统一转为数字类型
    id = parseInt(id)

    // (2)找到要删除的id
    var deleteId = students.findIndex(function (item) {
      return item.id === id
    })

    // (3)根据下标删除
    students.splice(deleteId,1)

    // （4）转换成字符串
    var fileData = JSON.stringify({
      students:students
    })
    // （5）写文件
    fs.writeFile(dbPath,fileData,function(err){
      if(err){
        //错误就是把错误对象传递给它
        return callback(err)
      }
      //成功就没错，所以对象就是null
      callback(null)
    })
  })
}