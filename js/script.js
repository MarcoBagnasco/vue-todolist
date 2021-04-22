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
            this.todos.splice(index, 1);
        },

        /**
         * Update Status of Specific Todo 
         * @param {number} index array position of todo
         */
        updateStatus(index){
            this.todos[index].completed = !this.todos[index].completed
        },
    }
});