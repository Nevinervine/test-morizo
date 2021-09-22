<template>
  <div class="container">
    <h2>Авторизация</h2>
    <form class="sign-in" v-if="idUser==null" @submit.prevent="handleSubmit">

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="user.email"  class="b-input"/>
        <div v-if="submitted && $v.user.email.$error">
          <span v-if="!$v.user.email.required">Email обязателен</span>
          <span v-if="!$v.user.email.email">Email введен некоректно</span>
        </div>
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input type="password" class="b-input" v-model="user.password"/>
        <div v-if="submitted && $v.user.password.$error">
          <span v-if="!$v.user.password.required">Пароль обязателен</span>
          <span v-if="!$v.user.password.minLength">Пароль должен быть больше 6 символов</span>
        </div>
      </div>
      <div v-if="passwordError">Неверный пароль</div>
      <div v-if="logError">Пользователь не найден</div>


      <div class="form-group">
        <button class="b-button">Log-in</button>
      </div>

    </form>
    <div v-else>
      <h2>Вы уже залогинены</h2>
    </div>
  </div>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators";
import axios from 'axios';
import Cookies from 'js-cookie'
import {mapGetters} from 'vuex'

const baseURL = "http://localhost:3000/users"

export default {
  name: "app",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      passwordError: false,
      logError: false,
      submitted: false
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
      email: {required, email},
      password: {required, minLength: minLength(6)},
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        this.logError = false;
        const res = await axios.get(baseURL + "?email=" + this.user.email);
        if (res.data[0].password === this.user.password) {
          this.passwordError = false;
          Cookies.set('logged_in', res.data[0].id);
          window.location.href = '/';
        } else {
          this.passwordError = true;
        }
      } catch (e) {
        console.error(e)
        this.logError = true;
      }

    }
  }
};
</script>

<style>
.form-group{
  margin-bottom: 20px;
}
.sign-in,.sign-up{
  max-width: 400px;
}
</style>