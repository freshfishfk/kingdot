<template>
    <div
            class="kd-dropdown-item"
            @click="handleClick"
    >
        <slot/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'DropdownItem',
        mixins: [Lang],
        props: {
        },
        data() {
            return {};
        },
        computed: {
        },
        methods: {
            handleClick() {
            //    this.$emit('')
            }
        }
    };

</script>
