// VUE INSTANCE
const app = new Vue({
    el: '#root',
    data: {
        todos: [
            {
                text: 'Fare la spesa',
                completed: false,
                important: false,
                editTodo: {
                    visibility: false,
                    text: '',
                },
            },
            {
                text: 'Pulire la cantina',
                completed: false,
                important: false,
                editTodo: {
                    visibility: false,
                    text: '',
                },

            },
            {
                text: 'Preparare la torta',
                completed: false,
                important: false,
                editTodo: {
                    visibility: false,
                    text: '',
                },

            },
            {
                text: 'Stendere',
                completed: false,
                important: false,
                editTodo: {
                    visibility: false,
                    text: '',
                },

            },
        ],
        newTodo: '',
        alertDelete: {
            visibility: false,
            index: null,
        },
        deleted:[],
        trash: false,
        modalTrash: false,
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
                        important: false,
                        editTodo: {
                            visibility: false,
                            text: '',
                        },
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
        trashTodo(index){
            // Delete if Completed
            if(this.todos[index].completed){
                // Move Deleted in Trash
                this.deleted.push(this.todos.splice(index, 1)[0]);
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
            this.todos[index].completed = !this.todos[index].completed;
            this.todos[index].important = false;
        },

        /**
         * Confirm Delete of an Uncompleted Todo
         */
        confirmDelete(){
            this.todos[this.alertDelete.index].completed = true;
            this.trashTodo(this.alertDelete.index);
            this.closeAlert();
        },

        /**
         * Close Delete Alert
         */
        closeAlert(){
            this.alertDelete.visibility = false;
            this.alertDelete.index = null;
        },

        /**
         * Delete All Completed Todo
         */
        deleteAllCompleted(){
            // Find Completed
            const complete = this.todos.filter(element=> {
                if(element.completed){
                    return element
                }
            });
            complete.forEach(element => {
                if(this.todos.includes(element)){
                    //Move Deleted in Trash
                    this.deleted.push(this.todos.splice(this.todos.indexOf(element), 1)[0]);
                }
            });
        },

        /**
         * Definitely Delete
         * @param {number} index array position of todo
         */
        deleteTodo(index){
            this.deleted.splice(index, 1);
        },

        /**
         * Restore Trashed Todo
         * @param {number} index array position of todo
         */
        restoreTodo(index){
            this.deleted[index].completed = false;
            this.deleted[index].important = false;
            this.todos.push(this.deleted[index]);
            this.deleteTodo(index);
        },

        /**
         * Show Trash Content
         */
        showTrash(){
            this.trash = !this.trash;
        },

        /**
         * Show Modal Trash
         */
        showModalTrash(){
            if(this.deleted.length > 0){
                this.modalTrash = true;
            }
        },

        /**
         * Close Modal Trash
         */
        closeModalTrash(){
            this.modalTrash = false;
        },

        /**
         * Empty Trash
         */
        emptyTrash(){
            this.deleted.splice(0);
            this.closeModalTrash();
        },

        /**
         * Important Signature
         * @param {number} index array position of todo
         */
        switchImportant(index){
            if(!this.todos[index].completed){
                this.todos[index].important = !this.todos[index].important;
            }
        },

        showEdit(index){
            if(!this.todos[index].completed){
                this.todos[index].editTodo.visibility = true;
                this.todos[index].editTodo.text = this.todos[index].text;
            }
        },

        updateTodo(index){
            this.todos[index].text = this.todos[index].editTodo.text;
            this.closeEdit(index);
        },

        closeEdit(index){
            this.todos[index].editTodo.visibility = false;
            this.todos[index].editTodo.text = '';
        },
    }
});