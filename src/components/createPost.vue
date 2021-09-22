<template>
  <div class="container">
    <div v-if="idUser!=null">
      <div class="post-edit">
        <h2>Название поста</h2>
        <input class="b-input" type="text" v-model="postHeader">
        <div v-if="postadd">
          <span v-if="!$v.postHeader.required">Название поста обязательно обязательно</span>
          <span v-if="!$v.postHeader.minLength">Название поста должно быть больше 3х символов</span>
        </div>
      </div>
      <div class="post-edit">
        <h2>Подробное описание поста</h2>
        <textarea class="b-textarea" v-model="postText"></textarea>
        <div v-if="postadd">
          <span v-if="!$v.postText.required">Техт поста обязателен</span>
          <span v-if="!$v.postText.minLength">Тест поста должен быть больше 6 символов</span>
        </div>
      </div>
      <button class="b-button" @click="addTodo()">добавить пост</button>
    </div>
    <div v-else>
      <h2>Для создания поста вы должны быть залогинены</h2>
      <router-link tag="a" class="button" to="/sign-up">Регистрация</router-link>
      <router-link tag="a" class="button" to="/sign-in">Авторизация</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {required, minLength} from "vuelidate/lib/validators";

const baseURL = "http://localhost:3000/post";
const baseUser = "http://localhost:3000/users";
import {mapGetters} from 'vuex';

export default {
  name: 'createPost',
  data() {
    return {
      post: [],
      postHeader: '',
      postText: '',
      postadd: false,
    }
  },
  computed: {
    ...mapGetters([
      'role',
      'idUser'
    ])
  },
  validations: {
    postHeader: {required, minLength: minLength(3)},
    postText: {required, minLength: minLength(6)},
  },
  methods: {
    async addTodo() {
      this.postadd = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const res = await axios.get(baseUser + "/" + this.idUser);
        await axios.post(baseURL, {
          smallText: this.postHeader,
          largeText: this.postText,
          createdAt: today,
          updatedAt: null,
          userId: res.data.id,
        });
        window.location.href = '/';
      } catch (e) {
        console.log('что то пошло не так');
        window.location.href = '/404';
      }
    }
  }
}
</script>
