<template>
  <div class="Home">
  <form @submit.prevent="createBoard">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="board.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="board.body">      
    <button type="submit">Create Board</button>
   </form> 
   <button @click='logout'>Logout</button>     
 <ul>
    <li v-for="board in boards" :key="board.id">
     <router-link :to="{name: 'Board', params:{boardId: board._id}}">
       {{board.title}}
       <button @click="deleteBoard(board)">DELETE</button>
      </router-link>
     <!-- <board></board> -->
    </li>

  </ul>
  
    <p>Choose a board</p>
  </div>
</template>

<script>
import router from "../router";
import board from "./Board";

export default {
  name: "Home",
  components: {
    board
  },

  computed: {
    user() {
      var user = this.$store.state.user;
    //  console.log(user);
      return user;
    },
    boards() {
      var board = this.$store.state.boards;
    //  console.log(board)
      return board;
    }
  },
  mounted() {
    if (!this.$store.state.user._id) {
      // if no user id kick to the Login page
      router.push({ name: "Login" });
    }
    //this.$store.dispatch()
    console.log(this.user._id)
    this.$store.dispatch("getBoards", this.user._id);
    this.$store.dispatch("getTasks", this.myList._id);
  },
  data() {
    return {
      board: {
        title: "",
        body: "",
        userId: ""
      }
    };
  },

  methods: {
    logout(){
      this.$store.dispatch('logout')
    },

    createBoard() {
      this.$store.dispatch("createBoard", this.board);
    },
    deleteBoard(){
      this.$store.dispatch("deleteBoard", board)
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
