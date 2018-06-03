<template>
  <div class="Task">
   {{myTask.title}}
   <form @submit.prevent="createComment">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="comment.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="comment.body">      
    <button type="submit">Create Comment</button>
   </form> 
  <ul>
   <li v-for="comment in comments" :key="comment._id">
     <!-- <tasks :myTask="task"></tasks>  
       -->
       {{comment.title}}
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
      }
    }
  },
  computed:{
    comments(){
      console.log(this.myTask._id)
        return this.$store.state.comments[this.myTask._id]
    }
  },
  methods:{
    createComment(){
    
      var newComment = this.comment;
      newComment.taskId = this.myTask._id;
    
      console.log(newComment)
    this.$store.dispatch("createComment", newComment);
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
