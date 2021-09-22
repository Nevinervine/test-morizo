<template>
  <div class="container">
    <div v-if="idUser==date.userId || role=='writer'">
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
      <Modal @confirm="editPost()">
        <template v-slot:modal-action>
          редактировать
        </template>
      </Modal>
    </div>
    <div v-else>Вы не можете редактировать пост</div>
  </div>
</template>
<script>
import axios from 'axios';
import {required, minLength} from "vuelidate/lib/validators";

const baseURL = "http://localhost:3000/post";
import {mapGetters} from 'vuex';
import Modal from '@/components/modal'

export default {
  name: 'editPost',
  props: ['id'],
  components: {
    Modal
  },
  data() {
    return {
      post: [],
      postHeader: '',
      postText: '',
      postadd: false,
      date: []
    }
  },
  computed: {
    ...mapGetters([
      'role',
      'idUser'
    ])
  },
  async created() {
    try {
      const res = await axios.get(baseURL + '/' + this.id);
      this.date = res.data;
      this.postHeader = res.data.smallText;
      this.postText = res.data.largeText;
    } catch (e) {
      window.location.href = '/404';
      console.error(e)
    }
  },
  validations: {
    postHeader: {required, minLength: minLength(3)},
    postText: {required, minLength: minLength(6)},
  },
  methods: {
    async editPost() {
      this.postadd = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      await axios.put(baseURL + "/" + this.id,
          {
            smallText: this.postHeader,
            largeText: this.postText,
            createdAt: this.date.createdAt,
            updatedAt: today,
            userId: this.date.userId,
          });
      window.location.href = '/';
    }
  }
}
</script>
<style lang="scss">
.post-edit {
  margin-bottom: 10px;
}
</style>