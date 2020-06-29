<template>
    <div
            v-if="isShow"
            class="kd-dropdown-menu"
            :style="{top:menuTop}"
    >
        <slot/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';
    export default {
        name: 'DropdownMenu',
        mixins: [Lang],
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menuTop: ''
            };
        },
        mounted() {
            this.menuTop = this.$parent.$el.offsetHeight + 'px';

            // let chel;
            // this.$nextTick(()=>{
            //     const body = document.querySelector("body");
            //     chel = body.appendChild(this.$el)

            // })
            window.addEventListener('scroll', function (e) {
                console.log(121);
                console.log(e.target.scrollTop);
            }, true);
        },
        methods: {
            scroll(e) {
                console.log(e.target.scrollTop);
            }
        }
    };

</script>
