# JqRead
  基于vue-cli3和追书神器接口制作的移动端小说阅读网站，**仅供参考学习！不用于任何商业用途！**
  闲暇时间用vue练练手，就想写个小说网站来看看，选择了追书神器的接口。
  因为偷懒，所以使用了mint—ui的一些小插件，以后慢慢替换。

## 克隆到本地
```
git clone https://github.com/mmnnbbvv005/JqRead.git
```
## 安装依赖
```
npm install
```
## 运行
```
npm run serve
```
## 追书神器接口列表
### 1.获取书籍详情
#### 请求URL
```
https://api.zhuishushenqi.com/book/:id
```
#### 示例
https://api.zhuishushenqi.com/book/57206c3539a913ad65d35c7b
#### 请求方式
GET
#### 参数类型:param

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  id  | 是 | String | 书籍id

### 2.获取书籍相关推荐
#### 请求URL
```
https://api.zhuishushenqi.com/book/:id/recommend
```
#### 示例
https://api.zhuishushenqi.com/book/57206c3539a913ad65d35c7b/recommend
#### 请求方式
GET
#### 参数类型:param

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  id  | 是 | String | 书籍id

### 3.获取书籍源
优质VIP书源被加密，建议选择第二个
#### 请求URL
```
https://api.zhuishushenqi.com/atoc
```
#### 示例
https://api.zhuishushenqi.com/atoc?view=summary&book=57206c3539a913ad65d35c7b
#### 请求方式
GET
#### 参数类型:query

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  view  | 是 | String | summary(请求类型)
  book  | 是 | String | 书籍id

### 4.获取书籍章节
#### 请求URL
```
https://api.zhuishushenqi.com/atoc/:id
```
#### 示例
https://api.zhuishushenqi.com/toc/577b477dbd86a4bd3f8bf1b2?view=chapters
#### 请求方式
GET
#### 参数类型:query,param

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  id  | 是 | String | 书源id
  view  | 是 | String | chapters(请求类型)

### 5.获取章节详细内容
#### 请求URL
```
https://chapter2.zhuishushenqi.com/chapter/:link
```
#### 示例
https://chapter2.zhuishushenqi.com/chapter/http%3a%2f%2fbook.my716.com%2fgetBooks.aspx%3fmethod%3dcontent%26bookId%3d1127281%26chapterFile%3dU_1212539_201701211420571844_4093_2.txt?k=2124b73d7e2e1945&t=1468223717
#### 请求方式
GET
#### 参数类型:param

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  link  | 是 | String | 章节link(从章节列表中获得,需要转码)

#### 参数类型:query

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  k  | 是 | String | 2124b73d7e2e1945(不知道是啥)
  t  | 是 | String | 1468223717(不知道是啥)

### 6.获取排名分类
#### 请求URL
```
https://api.zhuishushenqi.com/ranking/gender
```
#### 请求方式
GET

### 7.获取排名详情
#### 请求URL
```
https://api.zhuishushenqi.com/ranking/:id
```
#### 示例
https://api.zhuishushenqi.com/ranking/54d42d92321052167dfb75e3
#### 请求方式
GET
#### 参数类型:param

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  id  | 是 | String | 排名分类id

### 8.获取搜索结果
#### 请求URL
```
https://api.zhuishushenqi.com/book/fuzzy-search
```
#### 示例
https://api.zhuishushenqi.com/book/fuzzy-search?query=一念&start=0&limit=10
#### 请求方式
GET
#### 参数类型:query

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  query  | 是 | String | 关键字
  start  | 否 | String | 开始位置
  limit  | 否 | String | 返回数目

### 9.获取搜索热词
#### 请求URL
```
https://api.zhuishushenqi.com/book/search-hotwords
```
#### 请求方式
GET

### 10.获取搜索自动补全
#### 请求URL
```
https://api.zhuishushenqi.com/book/auto-complete
```
#### 示例
https://api.zhuishushenqi.com/book/auto-complete?query=一念
#### 请求方式
GET
#### 参数类型:query

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  query  | 是 | String | 关键字

### 11.获取带书籍数量的父分类
#### 请求URL
```
https://api.zhuishushenqi.com/cats/lv2/statistics
```
#### 请求方式
GET

### 12.获取带子分类的分类
#### 请求URL
```
https://api.zhuishushenqi.com/cats/lv2
```
#### 请求方式
GET

### 13.获取分类详情
#### 请求URL
```
https://api.zhuishushenqi.com/book/by-categories
```
#### 示例
https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=玄幻&东方玄幻&start=0&limit=10
#### 请求方式
GET
#### 参数类型:query

  参数 | 是否必选 | 类型 | 说明
  ---- | ----- | ------ | ----
  gender  | 否 | String | 性别(male,female,press)
  type  | 否 | String | 类型:hot(热门),new(最新),reputation(好评),monthly(包月),over(完结)
  major  | 是 | String | 主分类名称(玄幻)
  minor  | 否 | String | 子分类名称
  start  | 否 | String | 开始位置
  limit  | 否 | String | 返回数目
