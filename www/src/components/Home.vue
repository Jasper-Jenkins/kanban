<template>
  <div class="Home container-fluid">
    <div class="row">
      <ul>
      <li v-bind="actvBoard">

      </li>
      </ul>
    </div>
  <venture></venture>   
  <form @submit.prevent="createBoard">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="board.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="board.body">      
    <button type="submit">Create Board</button>
   </form> 
   <!-- <button @click='logout'>Logout</button>      -->
  <div class="row justify-content-center">
      <div class="col-12">
        <h5>Choose the board of your choice.</h5>
      </div>
      <div class="col-2" v-for="board in boards" v-bind:key="board._id">
        
        <button class="btn btn-primary" @click="setActiveBoard(board)">{{board.title}}</button>
        <button @click="deleteBoard(board)">DELETE Board</button>
      </div>
  </div>
 <div class="row">

   <!-- <div v-bind="activeBoard"></div> -->


   {{activeBoard()}}
   <!-- {{activeBoard.title}} -->
 </div>
<!--  
 <ul>
    <li v-for="board in boards" :key="board.id">
    <router-link :to="{name: 'Board', params:{boardId: board._id}}">
       {{board.title}}
      
    </router-link>
     <board></board>
    </li>

  </ul> -->
  
    <p>Choose a board</p>
  </div>
</template>

<script>
import router from "../router";
import board from "./Board";
import venture from "./Venture";


export default {
  name: "Home",
  data() {
    return {
      board: {
        title: "",
        body: "",
        userId: ""
      },
      actvBoard: {
        title: "",
        body: "",
        userId: ""
      }
    };
  },
  components: {
    board,
    venture
  },

  mounted() {
    if (!this.$store.state.user._id) {
      // if no user id kick to the Login page
      router.push({ name: "Login" });
    }else{
       this.$store.dispatch("getBoards", this.user._id);
    }
    //this.$store.dispatch()
   // console.log(this.user._id)
   
  },
  computed: {
    // clockTime() {
    //   return Date.now()
    // },
    user() {
      var user = this.$store.state.user;
    //  console.log(user);
      return user;
    },
    boards() {
      var board = this.$store.state.boards;
    //  console.log(board)
      return board;
    },
    // activeBoard(){
    //   var activeBoard = this.$store.state.activeBoard;
    // }
    
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
    createBoard() {
      this.$store.dispatch("createBoard", this.board);
    },
    deleteBoard(board){
      this.$store.dispatch("deleteBoard", board)
    },
    setActiveBoard(board){
      this.$store.dispatch("setActiveBoard", board)
    },
    activeBoard(){
      var aboard = this.$store.state.activeBoard;
      return aboard;
    }
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
