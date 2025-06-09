<template>
<s-dialog v-if="lockData" :title='titleDialog'>
    <div class="home_wrapper">
        Добавить изображение к {{ lockData.title }}
        <q-uploader
            ref="uploader"
            :factory="goUpload"
            :loading="false"
            @added="selectedFileF"
            @removed="selectedFile = null"
            :max-file-size="2 * 1024 * 1024"
            style="width: 350px"
            hide-upload-btn
            class="full-width"
            accept="image/*"
        />
        <div>Доступные расширения .png .jpeg</div>
        <s-btn
            color="primary"
            label="Отправить"
            :disabled="!selectedFile"
            @click="goUpload"
            class="mt-base-15 full-width"
        />
        <SBtn
            label="Удалить устройство"
            color="red"
            width="base-xxxl"
            disabled
            class="mt-base-15"
            :class="isMobile ? 'phone-button-container':''"
        />
        <SBtn
            label="Перезагрузить устройство"
            width="base-xxxl"
            disabled
            class="mt-base-15"
            :class="isMobile ? 'phone-button-container':''"
        />
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
import LocksApi from 'src/backend/api/classes/LocksApiClass';
export default defineComponent({
    name: 'DialogNfc',
    components: {},
    props: {
        lockData : Object,
    },
    setup(props) {
        const {
            getPhones
        } = useSelectBackend();
        const $notify = useNotifications();

        // const rfidCurrent = ref<Nfc.NfcBrief>()

        const pushFile = async (file) => {
            const formData = new FormData();
            formData.append('image', file);
            const response = await makeRequest(async () => LocksApi.addPhoto(formData, props.lockData.id));
            if (response) {
                $notify.success('Фото отправлено на сервер') 
            } else {
                return
            }
        }

        const goUpload = async () => {
            return new Promise(() => {
                setTimeout(() => {
                    pushFile(selectedFile.value[0]);
                }, 2000);
            });
        }
        const uploader = ref(null);
        const selectedFile = ref(null);

        const selectedFileF = (file) => {
            selectedFile.value = file
            console.log(selectedFile.value)
        }

        const {
            isMobile
        } = useDeviceSizes();
        return {
            titleDialog: 'Устройство - Настройка',
            props,
            getPhones,
            isMobile,
            selectedFileF,
            uploader,
            goUpload,
            selectedFile
            // rfidCurrent,
        };
    },
});
</script>
