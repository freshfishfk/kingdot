<template>
    <button
            class="kd-btn"
            :class="allClassAry"
            @click="btnClick"
    >
        <span
                v-if="loading"
                class="kd-btn-loading-icon"
                :class="{ 'kd-icon-left':$slots.default }"
        >
            <svg viewBox="0 0 120 120">
                <circle
                        cx="60"
                        cy="60"
                        r="57"
                />
            </svg>
        </span>
        <i
                v-if="icon"
                :class="['kdicon', icon]"
        />
        <span
                v-if="$slots.default"
                :class="{'kd-icon-right': icon}"
        >
            <slot/>
        </span>
    </button>
</template>

<script>
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'Button',
        mixins: [Lang],
        props: {
            type: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: ''
            },
            loading: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            shape: {
                type: String,
                default: ''
            },
            hollow: {
                type: Boolean,
                default: false
            },
            text: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        },
        computed: {
            allClassAry() {
                const allClassAry = [
                    this.text && this.type === 'default' ? '' : `kd-btn-${this.type}`,
                    this.shape ? `kd-btn-${this.shape}` : '',
                    this.size ? `kd-btn-${this.size}` : '',
                    this.text ? `kd-btn-text-${this.type}` : '',
                    {
                        'kd-btn-disabled': this.disabled,
                        'kd-btn-hollow': this.hollow,
                        'kd-btn-loading': this.loading
                    }
                ];
                return allClassAry;
            }
        },
        methods: {
            btnClick(e) {
                if (!this.disabled || !this.loading) {
                    this.$emit('click', e);
                }
            }
        }
    };

</script>
