
<template>
  <div class="Board">
    <button @click="logout">Logout</button>
    <div></div>
 <form @submit.prevent="createList">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="list.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="list.body">      
    <button type="submit">Create List</button>
   </form>      
 <ul>
    <li v-for="list in lists" :key="list._id">
     <span>List item:</span> <lists :myList="list"></lists> 
     <button @click="deleteList(list)">DELETE</button>
    </li>

  </ul>
 

  </div>
</template>

<script>
import router from "../router";
import lists from "./List"

export default {
  name: "Board",
  components: {
    lists
  },
  data() {
    return {
      list: { title: '',
      body: '', 
     }
    };
  },
  mounted() {
    this.$store.dispatch("getLists", this.$route.params.boardId)
  },
  computed: {
    user() {
      var user = this.$store.state.user;
      console.log(user);
      return user;
    },
    // board() {
    //   var board = this.$store.state.activeBoard;
    //   return board;
    // },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
    createList() {
   
      this.list['boardId'] = this.$route.params.boardId
    console.log(this.list)
      this.$store.dispatch("createList", this.list);
    },
    deleteList(){
      this.$store.dispatch("deleteList", list)
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
  
  border:black 1px solid;
  background-color:palegreen;
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
