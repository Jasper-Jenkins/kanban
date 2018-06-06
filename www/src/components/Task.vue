<template>
  <div class="Task">
   {{myTask.title}}
   <select v-model="newListId">
      <option disabled value=''>Select list</option>
      <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
   </select>
   <button @click="moveTask">Move Task</button>
   <form @submit.prevent="createComment">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="comment.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="comment.body">      
    <button type="submit">Create Comment</button>
   </form> 
  <ul>
   <li v-for="comment in comments" :key="comment._id">
     <!-- <tasks :myTask="task"></tasks> -->
       {{comment.title}}
       <button @click="deleteComment(comment)">DELETE This shit</button>
     </li>
   </ul>
  </div>
</template>

<script>
import router from '../router';
//import comment from './Comment';


export default {
  name: 'Task',
  props:['myTask'],
  data () {
    return {
      comment:{
        title: "",
        body: ""
      },
      newListId: ''
    };
  },
  mounted(){
    this.$store.dispatch('getComments', this.myTask._id)
  },
  computed:{
    comments(){
    //
    //  debugger
    //  console.log(this.myTask._id)
      return this.$store.state.comments[this.myTask._id]
    },
    lists(){
      return this.$store.state.lists
    }
  },
  methods:{
    createComment(){
    
      var newComment = this.comment;
      newComment.taskId = this.myTask._id;
    
  //    console.log(newComment)
    this.$store.dispatch("createComment", newComment);
    },
    moveTask(){
      this.myTask.oldListId = this.myTask.listId
      this.myTask.listId = this.newListId
      this.$store.dispatch("moveTask", this.myTask)
    }, 
    deleteComment(comment){
      console.log(comment)
      this.$store.dispatch("deleteComment", comment)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color:orange;
  display: inline-block;
  margin: 0 10px;
  color:black;
}
a {
  color: #42b983;
}
</style>
