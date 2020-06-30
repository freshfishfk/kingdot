<template>
    <div class="kd-upload">
        <div class="kd-upload-wrap">
            <div @click="handleClick">
                <slot>
                    <div class="kd-upload-list-picture">
                        <li class="kd-upload-picture-item">
                            <img/>
                        </li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <li class="kd-upload-picture-item"></li>
                        <i class="kd-upload-add-icon kdicon iconmoren_xinzeng"></i>
                    </div>
                </slot>
            </div>
            <input
                    ref="uploadInput"
                    class="kd-upload-input"
                    type="file"
                    :multiple="multiple"
                    @change="handleChange"
            />
        </div>
        <slot name="tip"/>
        <ul class="kd-upload-list-text">
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
    export default {
        name: 'Upload',
        props: {
            disabled: Boolean,
            multiple: Boolean
        },
        data() {
            return {
                files: []
            };
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
                const fileList = Array.from(files);
                if (this.multiple) {
                    fileList.forEach(item => {
                        this.files.push(item);
                    });
                } else {
                    this.files = fileList;
                }
            },
            hanldeMouseenter(e) {
                console.log(e);
            },
            itemDelete(index) {
                this.files.splice(index);
            }
        }
    };
</script>
