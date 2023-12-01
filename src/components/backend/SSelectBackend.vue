<template>
  <q-select
    v-model="localModel"
    use-input
    outlined
    dense
    fill-input
    hide-selected
    :class="classes"
    :clearable="clearable"
    :disable="disable"
    :hide-bottom-space="hideBottomSpace"
    :options-dense="optionsDense"
    :loading="loading"
    :options="options"
    :option-label="optionLabel"
    :label="label"
    :error="error"
    :error-message="errorMessage"
    @update:model-value="onUpdate"
    @virtual-scroll="onScroll"
    @filter="filterFn"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">Объекты не найдены</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  toRef
} from 'vue';

const pageSize = 10;

type OptionObject = Record<string, string> & { id: number };

export default defineComponent({
  name: 'SSelectBackend',
  props: {
    getter: {
      type: Function,
      required: true,
    },
    optionLabel: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
    },
    errorMessage: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
      required: false,
    },
    label: {
      type: String,
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
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const classesArray = ref([
      's-select',
      props.disable ? 's-select--disable' : '',
      props.required ? 'required' : '',
    ] as Array<string>);

    const classes = ref(classesArray.value.join(' ') as string);

    const localModel = ref<string | null>(null);
    const options = ref<Record<string, string>[]>([]);
    const currentPage = ref(1);
    const loading = ref(false);
    const search = ref('');
    const lastPage = ref(0);

    async function updateLocalModel(modelValue?: string) {
      if (modelValue) {
        if (modelValue !== localModel.value) {
          await props.getter({ id: modelValue }).then(
            // eslint-disable-next-line no-return-assign, prefer-destructuring
            (r: any) => localModel.value = r.data[0]
          );
        }
      } else {
        localModel.value = null;
      }
    }

    onMounted(async () => updateLocalModel(props.modelValue));

    watch(toRef(props, 'modelValue'), async (modelValue) => {
      await updateLocalModel(modelValue);
    });

    const filterFn = async (value: string, update: () => void) => {
      search.value = value;
      loading.value = true;
      await props.getter({
        search: search.value,
        page: '1',
        rowsPerPage: '50',
      }).then(
        (r: any) => {
          options.value = r.data;
          lastPage.value = r.last_page;
        }
      );

      currentPage.value = 1;
      loading.value = false;
      update();
    };

    const onScroll = async (scrollData: {
      to: number;
      ref: { refresh: () => void };
    }) => {
      const lastIndex = options.value.length - 1;

      if (
        loading.value !== true
        && currentPage.value < lastPage.value
        && scrollData.to === lastIndex
      ) {
        loading.value = true;
        // eslint-disable-next-line no-plusplus
        currentPage.value++;
        await props.getter({
          search: search.value,
          page: `${currentPage.value}`,
          rowsPerPage: '50',
        }).then(
          (r: any) => {
            options.value.push(...r.data);
            scrollData.ref.refresh();
          }
        );

        loading.value = false;
      }
    };

    return {
      classes,
      options,
      filterFn,
      onScroll,
      loading,
      localModel,
      onUpdate: (obj: OptionObject) => emit('update:model-value', obj?.id),
    };
  },
});
</script>
