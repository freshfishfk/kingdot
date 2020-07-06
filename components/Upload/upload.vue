<template>
    <div class="kd-upload">
        <div class="kd-upload-wrap">
            <ul
                    v-if="listType==='picture-card'"
                    class="kd-upload-list-picture"
            >
                <li
                        v-for="(item,index) in fileList"
                        :key="index"
                        class="kd-upload-picture-item"
                >
                    <img :src="item.url"/>
                </li>
            </ul>
            <div
                    class="kd-upload-btn-wrap"
                    @click="handleClick"
            >
                <upload-drag
                        v-if="drag"
                        @dropFiles="updateFile"
                >
                    <slot/>
                </upload-drag>
                <slot v-if="!drag">
                    <!-- <i class="kd-upload-add-icon kdicon iconmoren_xinzeng"></i> -->
                </slot>
            </div>
            <input
                    ref="uploadInput"
                    class="kd-upload-input"
                    type="file"
                    :multiple="multiple"
                    :accept="accept"
                    @change="handleChange"
            />
        </div>

        <slot
                v-if="tip"
                name="tip"
        >
            <div class="kd-upload-tip">{{ tip }}</div>
        </slot>
        <ul
                v-if="listType!== 'picture-card'"
                class="kd-upload-list-text"
        >
            <li
                    v-for="(file,index) in files"
                    :key="index"
                    class="kd-upload-list-item"
                    @mouseenter="hanldeMouseenter"
            >
                <span>
                    <i :class="['kdicon','kd-icon-left','icondaohangcaidan_morenbutton']"></i>
                    {{ file.name }}
                </span>
                <i
                        :class="['kdicon','kd-upload-list-delete','kd-upload-status-icon','iconcuowu_tubiaoji']"
                        @click="handleRemove(index)"
                ></i>
                <i :class="['kdicon','kd-upload-status-icon','iconzhengque']"></i>
                <i :class="['kdicon','kd-upload-status-icon','iconzhengque']"></i>
            </li>
        </ul>
        <div class="kd-upload-list-picture">
        </div>
    </div>
</template>

<script>
    import uploadDrag from './upload-drag.vue';
    import ajax from './ajax.js';
    export default {
        name: 'Upload',
        components: {
            uploadDrag
        },
        props: {
            disabled: Boolean,
            multiple: Boolean,
            listType: String,
            drag: Boolean,
            tip: String,
            accept: String,
            fileChange: Function,
            beforeUpload: Function,
            limit: Number,
            action: String,
            // data:Object,
            withCredentials: Boolean,
            onRemove: Function,
            httpRequest: {
                type: Function,
                default: ajax
            },
            data: Object,
            fileList: Array,
            autoUpload: {
                type: Boolean,
                default: true
            }

        },
        data() {
            return {
                files: [],
                reqs: {}
            };
        },
        created() {
        },
        methods: {
            handleClick() {
                if (!this.disabled) {
                    this.$refs.uploadInput.value = null;
                    this.$refs.uploadInput.click();
                }
            },
            handleChange(e) {
                const files = e.target.files;
                this.updateFile(files);
            },
            updateFile(v) {
                const fileList = Array.from(v);
                fileList.forEach((file, index) => {
                    //  加工file文件
                    this.proccess(file, index);
                });
            },
            proccess(file, index) {
                const proccessFile = {
                    name: file.name,
                    size: file.size,
                    raw: file,
                    uid: Date.now(),
                    status: 'ready'
                };
                if (file.type.indexOf('image') !== -1) {
                    proccessFile.url = URL.createObjectURL(file);
                }
                this.fileList.push(proccessFile);
                //  没有file改变回调，是否自动上传
                if (!this.fileChange) {
                    this.upload(file);
                    return;
                }
                //  回调为false,删除文件
                if (this.fileChange(file, this.fileList)) {
                    this.upload(file);
                } else {
                    this.handleRemove(proccessFile);
                }
            },
            upload(file) {
                if (!this.action) return;
                if (!this.beforeUpload) {
                    return this.http(file);
                }
                const beforeUpload = this.beforeUpload(file);
                if (beforeUpload) {
                    //  状态改变
                    this.onChange(file);
                    this.http(file);
                } else if (beforeUpload !== false) {
                    this.http(file);
                } else {
                    // 删除
                }
            },
            http(file) {
                const { uid } = file;
                const options = {
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: file,
                    data: this.data,
                    filename: file.name,
                    action: this.action,
                    onProgress: e => {
                        this.onProgress(e, file);
                    },
                    onSuccess: res => {
                        this.onSuccess(res, file);
                        delete this.reqs[uid];
                    },
                    onError: err => {
                        this.onError(err, file);
                        delete this.reqs[uid];
                    }
                };
                const request = this.httpRequest(options);
                this.reqs[uid] = request;
                if (request && request.then) {
                    request.then(options.onSuccess, options.onError);
                }
            },
            onprogress(e, file) {
                file.status = 'uploading';
            },
            onSuccess(e, file) {
                file.status = 'uploading';
            },
            onError() {

            },
            hanldeMouseenter(e) {
                console.log(e);
            },
            handleRemove(file) {
                const index = this.fileList.findIndex(f => {
                    return f.uid === file.uid;
                });
                this.fileList.splice(index, 1);
                if (this.onRemove) {
                    this.onRemove(this.fileList);
                }
            }
        }
    };
</script>
