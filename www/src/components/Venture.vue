<template>
  <div class="Venture">
   <button @click='logout'>Logout</button>     
 <!-- <ul>
    <li v-for="board in boards" :key="board.id">
     <router-link :to="{name: 'Board', params:{boardId: board._id}}">
       {{board.title}}
       <button @click="deleteBoard(board)">DELETE Board</button>
      </router-link>
    </li>

  </ul>
  
    <p>Choose a board</p> -->
  </div>
</template>

<script>
// import router from "../router";
// import board from "./Board";

export default {
  name: "Venture",
  components: {
//    board
  },

  computed: {
    // user() {
    //   var user = this.$store.state.user;
    //   return user;
    // }
    // boards() {
    //   var board = this.$store.state.boards;
    //   return board;
    // }
  },
  mounted() {
    // if (!this.$store.state.user._id) {
    //   // if no user id kick to the Login page
    // this.$store.dispatch("getBoards", this.user._id);
    // this.$store.dispatch("getTasks", this.myList._id);
    //   router.push({ name: "Login" });
    // }
  },
  data() {
    return {
    //   board: {
    //     title: "",
    //     body: "",
    //     userId: ""
    //   }
    };
  },

  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
