# CRUD增删改查

## 技术栈

- Node
- Express
- Nodemon

## 实现功能

- 学生列表增删改查
- 通过路由收到请求
- 接受请求中的数据（get，post）
  - req.query
  - Req.body
-  调用数据操作API处理数据
- 根据操作结果给客户端发送响应	

## 路由设计

|          |                  |          |                                |                  |
| -------- | ---------------- | -------- | ------------------------------ | ---------------- |
| 请求方法 | 请求路径         | get 参数 | post 参数                      | 备注             |
| GET      | /studens         |          |                                | 渲染首页         |
| GET      | /students/new    |          |                                | 渲染添加学生页面 |
| POST     | /studens/new     |          | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id       |                                | 渲染编辑页面     |
| POST     | /studens/edit    |          | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id       |                                | 处理删除请求     |