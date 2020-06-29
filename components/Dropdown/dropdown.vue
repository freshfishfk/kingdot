<template>
    <div
            class="kd-dropdown"
            @mouseenter="handleMouseenter"
            @mouseleave="hide"
    >
        <slot/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'Dropdown',
        mixins: [Lang],
        props: {
        },
        data() {
            return {
                isShow: false
            };
        },
        methods: {
            handleMouseenter() {
                this.isShow = true;
            },
            show() {
                console.log('123');
            },
            hide() {
                console.log('1231');
            }
        }
    };

</script>
