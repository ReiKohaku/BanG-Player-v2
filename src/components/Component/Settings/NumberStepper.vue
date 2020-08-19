<template>
  <div class="row q-col-gutter-sm">
    <div class="col-12" v-if="label">{{ label }}</div>
    <div class="col-12">
      <q-btn-group rounded class="full-width">
        <q-btn v-if="type.toLowerCase().includes('big')"
               @click="changeValue('minus', bigStep)" icon="mdi-chevron-double-left" style="width: 36px;"/>
        <q-btn v-if="type.toLowerCase().includes('small')"
               @click="changeValue('minus', smallStep)" icon="mdi-chevron-left" style="width: 36px;"/>
        <q-btn :label="displayValue ? displayValue : modelValue" style="width: 100%;"/>
        <q-btn v-if="type.toLowerCase().includes('small')"
               @click="changeValue('plus', smallStep)" icon="mdi-chevron-right" style="width: 36px;"/>
        <q-btn v-if="type.toLowerCase().includes('big')"
               @click="changeValue('plus', bigStep)" icon="mdi-chevron-double-right" style="width: 36px;"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NumberStepper",
    props: {
      value: {
        type: Number
      },
      label: {
        type: String
      },
      minValue: {
        type: Number,
        default: 0.0
      },
      maxValue: {
        type: Number,
        default: 10.0
      },
      smallStep: {
        type: Number,
        default: 0.1
      },
      bigStep: {
        type: Number,
        default: 1.0
      },
      cycle: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'smallBig'
      },
      displayValue: {
      }
    },
    model: {
      prop: 'value',
      event: 'updateValue'
    },
    data: function () {
      return {
        modelValue: 0.0
      }
    },
    watch: {
      value(v) {
        this.modelValue = v;
      },
      modelValue(v) {
        this.$emit('updateValue', v);
      }
    },
    methods: {
      changeValue(action, value) {
        this.$sound.tap();
        let result = this.modelValue;
        if (action.toLowerCase() === 'plus') {
          result += value;
          if (result > this.maxValue) result = this.cycle ? this.minValue : this.maxValue;
        } else if (action.toLowerCase() === 'minus') {
          result -= value;
          if (result < this.minValue) result = this.cycle ? this.maxValue : this.minValue;
        }
        this.modelValue = Math.round(result * 100) / 100;
      }
    },
    mounted() {
      this.modelValue = this.value
    }
  }
</script>

<style scoped>

</style>
