// VUE INSTANCE
const app = new Vue({
    el: '#root',
    data: {
        todos: [
            {
                text: 'Fare la spesa',
                completed: false,
            },
            {
                text: 'Pulire la cantina',
                completed: false,
            },
            {
                text: 'Preparare la torta',
                completed: false,
            },
        ],
        newTodo: '',
        alertDelete: {
            visibility: false,
            index: null,
        },
    },
    methods: {
        /**
         * Add New Todo
         */
        addTodo(){

            if(this.newTodo !== ''){

                this.todos.push(
                    {
                        text: this.newTodo,
                        completed: false,
                    }
                );

                this.newTodo = '';
                this.$refs.todoInput.focus();
            }
        },

        /**
         * Delete Specific Todo
         * @param {number} index array position of todo
         */
        deleteTodo(index){
            // Delete if Completed
            if(this.todos[index].completed){
                this.todos.splice(index, 1);
            } else {
                // Show Delete Alert
                this.alertDelete.visibility = true;
                this.alertDelete.index = index;
            }
        },

        /**
         * Update Status of Specific Todo 
         * @param {number} index array position of todo
         */
        updateStatus(index){
            this.todos[index].completed = !this.todos[index].completed
        },

        /**
         * Confirm Delete of an Uncompleted Todo
         */
        confirmDelete(){
            this.todos[this.alertDelete.index].completed = true;
            this.deleteTodo(this.alertDelete.index);
            this.closeAlert();
        },

        /**
         * Close Delete Alert
         */
        closeAlert(){
            this.alertDelete.visibility = false;
            this.alertDelete.index = null;
        },
    }
});