<template>
<s-dialog v-if="bindData" :title='titleDialog'>
    <div>
        Телефон - {{ bindData.phone ? bindData.phone.phone : 'Отсутствует' }}
    </div>
    <div>
        Метка - {{ bindData.key ? bindData.key : 'Отсутствует' }}
    </div>
    <div>
        Комментарий - {{ bindData.comment ? bindData.comment : 'Отсутствует' }}
    </div>
    <div class="home_wrapper" v-if="selectFlag">

        <s-input
                v-model="formData.comment"
                dense
                placeholder="Изменить комментарий"
                clearable
                class="mt-base-15"
                disabled
            />

            <SBtn label="Сохранить комментарий" width="base-xxxl" @click=changeRfid(props.rfidData.id) class="mt-base-15" :class="isMobile ? 'phone-button-container':''"/>
    </div>
</s-dialog>
</template>

    
<script lang="ts">
;
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import {
    Nfc
} from 'src/declarations/responses/nfc';
import {
    PropType,
    defineComponent,
    onMounted,
    ref,
    watch
} from 'vue';
import {
    useSelectBackend
} from 'src/composables/useSelectBackend';
import {
    makeRequest
} from 'src/composables/useRequest';
import {
    useDeviceSizes
} from 'src/composables/useDeviceSizes';
import {
    useNotifications
} from 'src/composables/useNotifications';
export default defineComponent({
    name: 'DialogNfc',
    components: {
    },
    props: {
        rfidData: {
            type: Object as PropType < Nfc.NfcBrief > ,
            required: true,
        },
    },
    setup(props) {
        const {
            getPhones
        } = useSelectBackend();
        const $notify = useNotifications();

        // const rfidCurrent = ref<Nfc.NfcBrief>()
        const formData = ref <Nfc.NfcBare> ({
            key: '',
            is_master: false,
            phone_id: 0,
            local: false,
            comment : '',
        });

        const changeRfid = async (frid_id: number) => {
            const response = await makeRequest(async () =>
                NfcApi.nfcUpdate(formData.value, frid_id));
            if (response) {
                bindData.value.comment = formData.value.comment;
                $notify.success('Комментарий изменен')
            }
        }
        const currentPhone = ref(props.rfidData ? props.rfidData.key : '');
        const labelSelect = () => {
            if (props.rfidData ? props.rfidData.phone.phone : '') {
                return props.rfidData.phone.phone
            }
        }
        const bindData = ref < Nfc.NfcBrief > ();
        const selectFlag = ref(props ?.rfidData ?.phone ?.phone === null ? false : true);
        // onMounted (() => init())
        watch(() => props.rfidData, (newVal) => {
            bindData.value = newVal;
            formData.value.key = bindData.value.key 
            formData.value.is_master = bindData.value.is_master 
            formData.value.phone_id = bindData.value.phone_id 
            formData.value.local = bindData.value.phone.local 
            formData.value.comment = bindData.value.comment 
        })

        const {
            isMobile
        } = useDeviceSizes();
        return {
            titleDialog: 'Rfid просмотр',
            props,
            formData,
            getPhones,
            selectFlag,
            changeRfid,
            currentPhone,
            labelSelect,
            bindData,
            isMobile,
            // rfidCurrent,
        };
    },
});
</script>
