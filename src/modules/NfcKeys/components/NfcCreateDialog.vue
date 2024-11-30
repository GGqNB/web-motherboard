<template>
<!-- <s-dialog :title='titleDialog'> -->
    <div class='home_wrapper' v-if="visibilyNewPhone">
        <div>Добавление нового телефона в систему: </div>
        <q-form ref="formPhone">
            <s-input
                v-model="phoneData.phone"
                type="text"
                prefix="+7"
                maxlength="10"
                dense
                placeholder="Введите номер телефона"
                clearable
                class="mt-base-10"
                unmasked-value
                :rules="[
                  NotEmpty(),
                  ValidMobilePhone(),
                ]"
            />
            <SBtn
                label="Добавить"
                width="base-xxxl"
                @click="createPhone"
                class="mt-base-15"
            />
        </q-form>
        <div class='flex justify-center'>
            <div class="blue-line"></div>
        </div>
    </div>
    <q-form ref="form">
        <div class="home_wrapper">
            <s-select-backend-multiple
                v-model="currentLocks"
                option-label="title"
                option-value="id"
                label="Выберите преграждающее устройство"
                class="mt-base-25 "
                :getter="getLocks"
                search-filter="name_filter"
                no-data-label="Такого номера нет, можете его создать"
                :rules="[
                  NotEmpty(),
                ]"
            />
            <s-select-backend
                v-model="formData.phone_id"
                option-label="phone"
                option-value="id"
                label="Выберите номер"
                class="mt-base-15 "
                prefix='+7'
                :getter="getPhones"
                @add="visibleNewPhoneF"
                no-data-label="Такого номера нет, можете его создать"
                :rules="[
                  NotEmpty(),
                ]"
            />
            <s-input
                v-model="formData.key"
                type="text"
                prefix="0x"
                maxlength="8"
                dense
                placeholder="Введите метку"
                clearable
                class="mt-base-15"
                :rules="[
                  MinLength(6),
                  NotEmpty(),
                ]"
            />
            <div v-if=currentLocks.length class="mt-base-25">
                Выбраны замки:
                <div
                    v-for="locks in currentLocks"
                    :key="locks.id"
                    class="selected-groups-dialogs flex justify-between"
                >
                    <div class="home_wrapper"> {{ locks.title }}
                    </div>
                    <div>
                        <q-btn
                            color="red"
                            flat
                            class="сlose-btn-doc"
                            icon="close"
                            @click="removeLock(locks.id)"
                        >
                        </q-btn>
                    </div>
                </div>
            </div>
            <s-input
                debounce="600"
                dense
                placeholder="Оставьте комментарий"
                clearable
                class="mt-base-15 "
                v-model="formData.comment"
            />
                <SBtn
                    label="Добавить"
                    width="base-xxxl"
                    @click="props.createRow(onSubmit())"
                    class="mt-base-15"
                    :class="isMobile ? 'phone-button-container':''"
                />
                <!-- <SBtn
                    label="Добавить и закрыть"
                    width="base-xxxl"
                    @click="props.createRow(onSubmit(true))"
                    class="mt-base-15 "
                    :class="isMobile ? 'phone-button-container':''"

                /> -->

        </div>
    </q-form>
<!-- </s-dialog> -->
</template>

    
<script lang="ts">
;
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import {
    Nfc
} from 'src/declarations/responses/nfc';
import {
    PropType,
    computed,
    defineComponent,
    onMounted,
    ref
} from 'vue';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
import {
    useSelectBackend
} from 'src/composables/useSelectBackend';
import {
    makeRequest
} from 'src/composables/useRequest';
import {
    QForm
} from 'quasar';
import {
    useNotifications
} from 'src/composables/useNotifications';
import useValidation from 'src/composables/useValidation';
import PhoneApi from 'src/backend/api/classes/PhoneApiClass';
import {
    useQueryString
} from 'src/composables/useQueryString';
import {
    useServiceFilters
} from '../composables/useFilters';
import { useDeviceSizes } from 'src/composables/useDeviceSizes';
import SSelectBackendMultiple from 'src/components/backend/SSelectBackendMultiple2.vue';
export default defineComponent({
    name: 'DialogCreateNfc',
    components: {
        SSelectBackend,
        SSelectBackendMultiple
    },
    props: {
        createRow: Function
    },
    setup(props) {
        const {
            NotEmpty,
            MinLength,
            ValidMobilePhone
        } = useValidation();
        const {
            getPhones,
            getLocks
        } = useSelectBackend();
        // const rfidCurrent = ref<Nfc.NfcBrief>()
        const formData = ref < Nfc.NfcBare > ({
            is_master: false,
            key: '',
            phone_id: null,
            lock_ids: [],
            comment: '',
        });
        const currentLocks = ref([]);
        const openPhoneAdd = () => {
            console.log('ОК')
        }
        const {
            isMobile
        } = useDeviceSizes();

        const $notify = useNotifications();
        const form = ref < QForm > ();
        const formPhone = ref < QForm > ();
        const onSubmit = async () => {
            const isValid = await form.value ?.validate();
            if (!isValid) {
                $notify.warning('Необходимо заполнить обязательные поля');
                return;
            }
            if (formData.value.key.length < 8) {
                formData.value.key = formData.value.key.padEnd(8, '0'); // Добавляем точки в конец до 8 символов
            }
            formData.value.key = '0x' + formData.value.key
            
            currentLocks.value.map((lock) => formData.value.lock_ids.push(lock.id));
            const response = await makeRequest(() => NfcApi.nfcCreate(formData.value));
            if (response) {
                formData.value.key = '';
                formData.value.phone_id = null;
                formData.value.is_master = false;
                formData.value.lock_ids =  [];
                formData.value.comment =  '';
                currentLocks.value = [];
                $notify.success('Все добавлено');
                return response
            };

        }

        const visibilyNewPhone = ref(false)

        const visibleNewPhoneF = (prePhone : string) => {
            phoneData.value.phone = prePhone;
            visibilyNewPhone.value = !visibilyNewPhone.value
        }

        const phoneData = ref({
            phone: '',
        })
        const removeLock = (id: number) => {
            currentLocks.value = currentLocks.value.filter(locks => locks.id !== id);
        };
        const createPhone = async () => {
            const isValid = await formPhone.value ?.validate();
            if (!isValid) {
                $notify.warning('Необходимо заполнить обязательные поля');
                return;
            }

            const response = await await makeRequest(() => PhoneApi.phoneCreate(phoneData.value));
            if (response) {
                $notify.success('Номер добавлен для выбора')
            }
        }
        
        return {
            titleDialog: 'Rfid изменение',
            props,
            formData,
            getPhones,
            onSubmit,
            NotEmpty,
            form,
            openPhoneAdd,
            visibilyNewPhone,
            phoneData,
            formPhone,
            createPhone,
            ValidMobilePhone,
            isMobile,
            getLocks,
            currentLocks,
            removeLock,
            MinLength,
            visibleNewPhoneF
            // fetch

            // rfidCurrent,
        };
    },
});
</script>
