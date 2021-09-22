<template>
  <div class="container">
    <h2>Регистрация</h2>
    <form class="sign-up" v-if="idUser==null" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Имя</label>
        <input class="b-input" type="text" v-model="user.firstName"/>
        <div v-if="submitted && $v.user.firstName.$error">
          <span v-if="!$v.user.firstName.required">Имя обязательно</span>
          <span v-if="!$v.user.firstName.minLength">Имя должно иметь больше 3х символов</span>
        </div>
      </div>
      <div class="form-group">
        <label>Фамилия</label>
        <input class="b-input" type="text" v-model="user.lastName"/>
        <div v-if="submitted && $v.user.lastName.$error">
          <span v-if="!$v.user.lastName.required">Фамилия обязательно</span>
          <span v-if="!$v.user.lastName.minLength">Фамилия должна иметь больше 3х символов</span>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input  class="b-input" type="email" v-model="user.email" id="email" name="email"/>
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email обязателен</span>
          <span v-if="!$v.user.email.email">Email введен некоректно</span>
        </div>
        <span v-if="registered">Пользователь с таким Email уже есть</span>
      </div>
      <div class="form-group">
        <label>Вы администратор</label>
        <input  type="checkbox" id="checkbox" v-model="user.checked">
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input  class="b-input" type="password" v-model="user.password"/>
        <div v-if="submitted && $v.user.password.$error">
          <span v-if="!$v.user.password.required">Пароль обязателен</span>
          <span v-if="!$v.user.password.minLength">Пароль должен быть больше 6 символов</span>
        </div>
      </div>
      <div class="form-group">
        <label>Подтверждение пароля</label>
        <input  class="b-input" type="password" v-model="user.confirmPassword"/>
        <div v-if="submitted && $v.user.confirmPassword.$error">
          <span v-if="!$v.user.confirmPassword.required">Подтверждение пароля обязательно</span>
          <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Пароли не совпадают</span>
        </div>
      </div>
      <div class="form-group">
        <button class="b-button">Регистрация</button>
      </div>
    </form>
    <div v-else>Вы уже залогинены</div>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
import axios from 'axios';
import {mapGetters} from 'vuex'

const baseURL = "http://localhost:3000/users"

export default {
  name: "app",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        checked: false,
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      registered: false,
    };
  },
  computed: {
    ...mapGetters([
      'idUser',
      'role',
      'name'
    ])
  },
  validations: {
    user: {
      firstName: {required, minLength: minLength(3)},
      lastName: {required, minLength: minLength(3)},
      email: {required, email},
      password: {required, minLength: minLength(6)},
      confirmPassword: {required, sameAsPassword: sameAs('password')}
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const res = await axios.get(baseURL + "?email=" + this.user.email);
      if (res.data[0] !== undefined) {
        this.registered = true;
        return;
      } else {
        this.registered = false;
        let role = "reader";
        if (this.user.checked) {
          role = "writer";
        }
        try {
          await axios.post(baseURL, {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.user.password,
            role: role
          });
          window.location.href = '/sign-in';
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
};
</script>