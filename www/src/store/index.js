import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import axios from 'axios'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? 'http://kanban-fun.herokuapp.com/' : 'http://localhost:3000';



let api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    withCredentials: true

})

let auth = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        boards: [],
        //   activeBoard: [],
        tasks: {},
        lists: [],
        comments: {},
        // boardLists: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state) {
            state.user = {}
        },
        createBoard(state, board) { //may not be correct
            state.boards.push(board)
        },
        displayBoards(state, boards) {
            state.boards = boards
        },
        createList(state, list) {
            state.lists.push(list)
        },
        getList(state, list) {
            state.lists = list
        },
        createTask(state, task) {
            //state.tasks.push(task)
            state.tasks = task
        },
        setTasks(state, { listId, tasks }) {
            // console.log(tasks)
            // debugger
            // if (tasks[0]) { //taking the first element and grabbing the listId from it
            vue.set(state.tasks, listId, tasks)
            // state.tasks[tasks[0].listId] = tasks
            // console.log('This one', state.tasks)
            // }
        },
        createComment(state, comment) {
            state.comments = comment
        },
        setComments(state, { taskId, comments }) {
           // console.log(comments)
            // if (comments[0]) {
            vue.set(state.comments, taskId, comments)
            // }
        },
        deleteBoard(state, board) {
            state.boards = board
        },
        deleteList(state, list) {
            state.lists = list
        },
        deleteTask(state, task) {
            state.tasks = task
        },
        deletComment(state, comment) {
            state.comments = comment
        },

    },
    actions: {
        login({ commit, dispatch }, loginCredentials) {
            // console.log(loginCredentials)
            auth.post('/auth/login', loginCredentials)
                .then(res => {
                    //     console.log(res)
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(res => {

                })
        },
        //  logout({ commit, dispatch }) { },
        //   register({ commit, dispatch }, userData) { },


        //Brian ADded logout/register double check..

        logout({ commit, dispatch }) {
            auth.delete('/auth/logout')
                .then(res => {
                    commit('deleteUser')
                    router.push({ name: 'Login' })
                })
        },


        register({ commit, dispatch }, userData) {
            auth.post('/auth/register', userData)
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
        },
        authenticate({ commit, dispatch }) {
            api.get('/authenticate')
                .then(res => {
                    console.log('auth success')
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(res => { })
        },
        createBoard({ commit, dispatch }, board) {

            // board.userId = this.user.userId
            // console.log(this.user)
            // console.log(board)
            api.post('/api/boards/', board)
                .then(res => {
               //     console.log(res.data)
                    commit('createBoard', res.data)
                })

        },
        getBoards({ commit, dispatch }, userId) {
            api.get('/api/boards/user/' + userId)
                .then(res => {
                    //    console.log(res.data)
                    commit('displayBoards', res.data)
                })
        },
        createList({ commit, dispatch }, list) {
            //   debugger
            //  console.log(list)
            api.post('/api/lists', list)
                .then(res => {
                    console.log(res.data)
                    commit('createList', res.data)
                })
        },
        getLists({ commit, dispatch }, boardId) {
            //   console.log(boardId)
            api.get('/api/boards/' + boardId + '/lists')
                .then(res => {
                    //    console.log(res)
                    commit('getList', res.data)
                })
        },
        createTask({ commit, dispatch }, task) {
            console.log(task)
            api.post('/api/tasks', task)
                .then(res => {
                    dispatch('getTasks', task.listId)
                }).catch(err => {
                    console.error(err)
                })
        },
        getTasks({ commit, dispatch }, listId) {
            var ghost = listId
            //  console.log(ghost)

            api.get('/api/lists/' + listId + '/tasks')
                .then(res => {

                    var tasks = res.data
                    // debugger
                    commit('setTasks', { listId, tasks }) //tasks has a key:value pair from line 184 
                })
        },
        createComment({ commit, dispatch }, comment) {
            console.log(comment)
            api.post('/api/comments', comment)
                .then(res => {
                    dispatch('getComments', comment.taskId)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getComments({ commit, dispatch }, taskId) {
            var ghost = taskId
         //   console.log(ghost)
            api.get('/api/tasks/' + taskId + '/comments')
                .then(res => {

                 //   console.log(res.data)
                    var comments = res.data

                    // debugger
                    commit('setComments', { comments, taskId })
                })
        },
        moveTask({ commit, dispatch }, task) {
            api.put('/api/tasks/' + task._id, task)
                .then(res => {
                    dispatch('getTasks', task.oldListId)
                    dispatch('getTasks', task.listId)

                })
        },
        deleteComment({ commit, dispatch, state }, comment) {
            console.log(comment)
            api.delete('/api/comments/' + comment._id, comment)
                .then(res => {
                    dispatch('getComments', comment.taskId)
                })
        },

        deleteList({ commit, dispatch, state }, list) {
            console.log(list)
            api.delete('/api/lists/' + list._id, list)
                .then(res => {
                    dispatch('getLists', list.boardId)
                })
        },

        deleteBoard({ commit, dispatch, state }, board) {
            api.delete('/api/boards/' + board.id, board)
                .then(res => {
                    commit('displayBoards')
                })
        },

        deleteTask({ commit, dispatch, state }, task) {
            api.delete('/task/' + task.id, task)
                .then(res => {
                    commit('setTasks')
                })
        }
        // getComments({commit, dispatch}, taskId){



    }

})