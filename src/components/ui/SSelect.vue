<template>
  <q-select
  v-model="selectedValue"
  @update:model-value="emit('update:modelValue', selectedValue)"
  :class="classes"
  outlined
  dense
  clear-icon="app:delete"
  :disable="disable"
  :hide-bottom-space="hideBottomSpace"
  :options-dense="optionsDense"
  popup-content-class="s-select--item"
  
  >
    <template #default>
      <slot></slot>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SSelect',
  props: {
    disable: {
      type: Boolean,
      default: false,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    hideBottomSpace: {
      type: Boolean,
      default: true,
    },
    optionsDense: {
      type: Boolean,
      default: true,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { slots,emit }) {
    const selectedValue = ref(null);
    const classesArray = ref([
      's-select',
      props.disable ? 's-select--disable' : '',
      props.required ? 'required' : '',
    ] as Array<string>);

    const classes = ref(classesArray.value.join(' ') as string);
    return {
      classes,
      slots,

    selectedValue,
    };
  },
});
</script>
