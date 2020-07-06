### 上传使用
:::demo #上传 介绍上传使用，tip提示,accept属性。

```html
<template>
    <Upload
        tip="只能上传jpg/png文件，且不超过500kb"
        accept=".png,.jpg"
    >
        <Button>点击上传</Button>
    </Upload>
</template>
```
:::

### 多选上传
:::demo #上传 多个选择文件，个数限制，大小限制，格式限制。

```html
<template>
    <Upload 
        multiple 
        :limit="limit"
        :before-upload="beforeaUpload"
    >
        <Button>点击上传</Button>
    </Upload>
</template>
<script>
    export default {
        data(){
            return{
                limit:1
            }
        },
        methods:{
            beforeaUpload(file){
                console.log(file.type,'默认格式错误')
                return true
            }
        }
    }
</script>
```
:::

### 照片墙上传
:::demo #上传 照片墙格式上传,自定义限制规则。

```html
<template>
    <Upload multiple 
        action="https://jsonplaceholder.typicode.com/posts/"
        :data="data"
        :file-list="fileList"
        :file-change="hanleFileChange"
        :on-change="hanldeChange"
        :before-change="handleBeforeChange"
        list-type="picture-card">
        <i class="kd-upload-add-icon kdicon iconmoren_xinzeng" v-if="isShow"></i>
    </Upload>
</template>
<script>
    export default{
        data() {
            return {
                isShow: true,
                fileList: [{name:'a',url:'http://127.0.0.1/download.jpg'}],
                data:{type:'image'}
            }
        },
        methods:{
            hanleFileChange(file,fileList){
                const isImage = file.type.indexOf('image') > -1;
                const isSize = file.size / 1024 / 1024 < 1;
                const isLimit = fileList.length <= 5;
                if(!isImage){
                    console.log('上传图片只能是 image 格式!')
                }
                if(!isSize){
                    console.log('上传图片不能超过3MB!');
                }   
                if(!isLimit){
                    this.isShow = false
                    console.log('图片的个数不能超过5个!');
                }
                return isImage && isSize && isLimit
                //格式，大小，个数
            },
            hanldeChange(file,fileList){
                //状态更改
            },
            handleBeforeChange(){
                //上传前钩子
            }
        }
    }
</script>
```
:::

### 自动上传图片
:::demo #上传 照片墙格式上传。

```html
<template>
    <Upload 
        multiple 
        list-type="picture-card"
    >
        <i class="kd-upload-add-icon kdicon iconmoren_xinzeng"></i>
    </Upload>
</template>
```
:::

### 拖拽上传文件
:::demo #上传 拖拽上传文件。

```html
<template>
    <Upload 
        multiple
        tip="只能上传jpg/png文件，且不超过500kb"
        drag
    >
        <i class="kd-upload-drag-icon kdicon iconmoren_xinzeng"></i>
        <span>点击或将文件拖拽到这里上传</span>
    </Upload>
</template>
```
:::

