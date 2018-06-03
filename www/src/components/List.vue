<template>
  <div class="List">
    {{myList.title}}
   <form @submit.prevent="createTask">
    <input type="title" name="title" id="title" placeholder="Enter title" v-model="task.title">
    <input type="body" name="body" id="body" placeholder="Enter body" v-model="task.body">      
    <button type="submit">Create Task</button>
   </form> 

 <ul>
   <li v-for="task in tasks" :key="task._id">
     <tasks :myTask="task"></tasks>  
      
     </li>
   </ul>
  <!-- {{tasks}}   -->
  </div>
</template>

<script>
import router from "../router";
import tasks from "./Task";
//import lists from "./List"

export default {
  name: "List",
  props: ["myList"],
  data() {
    return {
      task: {title: '',
      body: ''}
       
    };
  }, 
  mounted() {
  //  debugger
  this.$store.dispatch("getTasks", this.myList._id)// 
  },
  computed:{
    displayTasks(){
      this.$store.dispatch("getTasks", this.myList._id)
    },
    tasks() {
     // debugger
    //  this.$store.dispatch("getTasks", this.myList._id)
      return this.$store.state.tasks[this.myList._id]
    },
  },
  methods:{
    createTask(){
      var newTask = this.task
      newTask.listId = this.myList._id //assigning an id to the task that assocaites to the list
      this.$store.dispatch("createTask", newTask);
     
  //this.$store.dispatch("getTasks", this.myList._id)
    }

  },
  components: {
    tasks
  }
};
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
