<template>
    <div class="kd-upload">
        <div class="kd-upload-wrap">
            <ul
                    v-if="listType==='picture-card'"
                    class="kd-upload-list-picture"
            >
                <li class="kd-upload-picture-item">
                    <img src="http://127.0.0.1/download.jpg"/>
                </li>
                <li class="kd-upload-picture-item">
                    <img src="http://127.0.0.1/download.jpg"/>
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
                        @click="itemDelete(index)"
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
            beforeUpload: Function,
            limit: Number,
            action: String,
            // data:Object,
            withCookie: Boolean,
            onDelete: Function

        },
        data() {
            return {
                files: []
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

                // if (!this.beforeUpload) {
                //     return this.upload(fileList);
                // }
                fileList.forEach(file => {
                    if (!this.beforeUpload) {
                        return this.upload(file);
                    }
                    const beforeUpload = this.beforeUpload(file);
                    if (beforeUpload) {
                        this.upload(file);
                    }
                });

                // if (this.accept) {
                //     fileList.forEach(item => {
                //         const name = item.name.split('.');
                //         const type = name[name.length - 1];
                //         if (this.accept.indexOf(type) === -1) {
                //             // 格式有误
                //             console.log('格式有误');
                //         }
                //     });
                // }
            },
            upload(file) {
                //  添加到列表
                // if (this.multiple) {
                //     fileList.forEach(item => {
                if (this.limit && this.files.length === this.limit) {
                    const files = this.files;
                    files.splice(files.length - 1, 1);
                    files.push(file);
                    this.files = files;
                } else {
                    this.files.push(file);
                }
                //     });
                // } else {
                //     this.files = fileList;
                // }
            },
            hanldeMouseenter(e) {
                console.log(e);
            },
            itemDelete(index) {
                this.files.splice(index, 1);
                this.onDelete(this.files);
            }
        }
    };
</script>
