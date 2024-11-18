<template>
<div class="auth__card login__container">
    <div class="row justify-center col-xs-12">
        <img class="auth__logo" src="icons/logo-150x150.png" alt="" />
    </div>
    <div class="auth__title q-mb-xl">
        <div>Система контроля</div>
        <div>«STOWN»</div>
    </div>
    <q-form ref="form" class="col-xs-12">
        <div class="fw-600 fs-19">Авторизация</div>
        <div class="col-xs-12">
            <s-input
                label="Логин"
                class="s-mb-lg mt-base-15"
                @keyup.enter="onSubmit"
                v-model.trim="formValue.username"
                :rules="[
                  NotEmpty(),
                  MinLength(4),
                  MaxLength(255),
                ]"
            />
            <s-input
                label="Пароль"
                class="s-mb-lg mt-base-25"
                v-model="formValue.password"
                @keyup.enter="onSubmit"
                :type="passwordVisible ? 'text' : 'password'"
                :rules="[
                  NotEmpty(),
                  MinLength(4),
                  MaxLength(255),
                ]"
            >
                <template #append>
                    <q-icon :name="passwordVisible ? 'visibility' : 'visibility_off'" @click="passwordVisible = !passwordVisible" />
                </template>
            </s-input>
        </div>
        <div class="col-xs-12 row justify-between s-mb-md">
            <router-link to="/registration" class="links-auth">
                <div>Регистрация</div>
            </router-link>
        </div>
        <div class="col-xs-12 row justify-between s-mb-md">
            <router-link to="" class="links-auth">
                <div>Забыли пароль?</div>
            </router-link>
        </div>

        <div class="col-xs-12 row justify-center s-mb-xl mt-base-15">
            <s-btn
                label="Войти"
                fat
                class="full-width"
                @click="onSubmit"
            />
        </div>
    </q-form>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue';
import {
    makeRequest
} from 'src/composables/useRequest';
import {
    useCurrentUser
} from 'src/composables/useCurrentUser';
import {
    useRouter
} from 'vue-router';
import {
    useNotifications
} from 'src/composables/useNotifications';
import {
    useLoading
} from 'src/composables/useLoading';
import AuthSystemApi from 'src/backend/api/classes/AuthSystemClass';
import {
    QForm
} from 'quasar';
import useValidation from 'src/composables/useValidation';
export default defineComponent({
    name: 'LoginPage',
    components: {},
    setup() {
      const {
            NotEmpty,
            MinLength,
            MaxLength
        } = useValidation();
        
        const formValue = ref({
            username: '',
            password: '',
        });
        const $notify = useNotifications();
        const passwordVisible = ref(false);
        const {
            $userDataSet
        } = useCurrentUser();
        const router = useRouter();
        const form = ref < QForm > ();
        const onSubmit = async () => {

            const isValid = await form.value ?.validate();
            if (!isValid) {
              console.log(form.value)
                $notify.warning('Необходимо заполнить обязательные поля');
                return;
            }
            const formData = new FormData();
            formData.set('username', formValue.value.username);
            formData.set('password', formValue.value.password);
            try {
                const response = await makeRequest(async () =>
                    AuthSystemApi.login(formData));
                if (response) {
                    $userDataSet.setToken(response.access_token);
                    router.push('/')
                    // setUser();
                }
            } catch (error) {}
        }

        // const setUser = async () => {
        //   const response = await makeRequest(async () =>
        //     UserApi.me());
        //     if(response){
        //       $userDataSet.setUser(response);
        //        router.push('/')
        //     }else{
        //       $notify.error('Произошла ошибка');
        //     }
        // }

        return {
            onSubmit,
            passwordVisible,
            formValue,
            NotEmpty,
            form,
            MinLength,
            MaxLength
            
        };
    }

});
</script>
