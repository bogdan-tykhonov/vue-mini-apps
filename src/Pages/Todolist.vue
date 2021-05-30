<template>
  <div id="todolist" class="page">
      <InputModal :currNote="currentItem" @edit="editNote" @closeModal="showModal = false" v-if="showModal" />
      <Heading title="Todolist" />
      <div  class="todolist-wrapper">
          <div class="input">
              <input  type="text" placeholder="Add new note"
              v-model="inputNote"
              @keypress.enter="addNote"
              >
             <b-button variant="success"
             @click="addNote"
             
             >Add</b-button>
          </div>

            <b-button-group class="filter">
               
                <select v-model="filter" name="" id="">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </b-button-group>

          <div v-if="loading" class="spinner-load">
              <b-spinner   variant="primary" label="Spinning" ></b-spinner>
          </div>
          <ul v-if="filteredNotes.length">
              <transition-group name="list" >
                <li 
                
                v-for="(note, index) in filteredNotes" 
                :key="'note-'+note.id"
                :class="{'completed' : note.completed}"
                @click="completeNote(note.id)"
                >
                {{note.text}}
            
                <div class="edit-group">
                    <button @click.stop="openEditModal(index)"><b-icon-pencil-square></b-icon-pencil-square></button>
                    <button @click.stop="removeNote(index)"><b-icon-x-square-fill></b-icon-x-square-fill></button>
                </div>
                </li>
            </transition-group>
        </ul> 

        <div v-if="notes.length" class="total-notes">
                <h1>Total notes: {{totalNotes}}</h1>
        </div>

        <h2 v-if="!notes.length && !loading">No any note, make first one!</h2>
      </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading';
import InputModal from '@/components/InputModal';
import currentUser from '@/mixins/currentUser';
import {updateDb, loadNotes} from '@/api/db';
export default {
  components: { Heading, InputModal },
    name: 'Todolist',
    mixins: [currentUser],
    data(){
       return{
            notes: [ ],
            loading: true,
            showModal: false,
            filter: 'all',
            currentItem : {
                text: '', 
                idx: '',
                completed: ''
            },
            inputNote: ''
       }
    }, 
    methods: {
         addNote(){
            const note = this.inputNote;
            if(!note) return;
            this.notes.unshift({ text: note, completed: false, id: Date.now()});
            this.inputNote = '';
        }, 
        async completeNote(id){
            const foundNote = this.notes.find(note => note.id == id);    
            foundNote.completed = !foundNote.completed;
            try{
                await updateDb(this.notes);
            }catch(e){
                console.log(e);
            }
        },
        openEditModal(index){
            this.currentItem.text = this.notes[index].text;
            this.currentItem.idx = index;
            this.currentItem.completed = this.notes[index].completed;
            this.showModal = true;
        },
         editNote(editedNote){
            this.notes.splice(editedNote.index, 1, {
                text: editedNote.text,
                completed: editedNote.completed
            });
        },
         removeNote(index){
            this.notes.splice(index, 1);
        },
        async updateNotesDb(){
            try{
                 await updateDb(this.notes);
            }catch(e){
                 console.log(e);   
            }
        }
    },
    computed: {
        totalNotes(){
            return this.filteredNotes.length;
        },
        filteredNotes(){
            if(this.filter == 'all'){
                return this.notes;
            }else if (this.filter == 'completed'){
                return this.notes.filter( note => note.completed == true);
            }else if (this.filter == 'uncompleted'){
                return this.notes.filter( note => note.completed == false);
            }
             return this.notes;
        
        }
    },
    async mounted(){
        try{
        const dbNotes = await loadNotes();
        this.loading = false;
        if(dbNotes){
            this.notes = Object.values(dbNotes.notes);
        }
        }catch(e){
            console.log(e);
        }
       
    },
    watch: {
        notes(){
            this.updateNotesDb();
            this.showModal = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to {
    opacity: 0;
   transform: scale(0);
    }
    .filter{
        
        select{
            cursor: pointer;
            color: white;
            background-color: $main;
            border: none;
            padding: 10px;
            width: 100%;
            height: 50px;
        }
    }
    .todolist-wrapper{
        display: flex;
        flex-direction: column;
    
        width: 500px;
        margin: auto;
        padding: 100px 0;
        .spinner-load{
            margin-top: 50px;
            display: flex;
            justify-content: center;
        }
        
        .input{
            display: flex;
            height: 70px;
            padding-bottom: 20px;
            input{
                padding: 10px;
                font-size: 20px;
                width: 75%;
                height: 100%;
            }
            button{
                font-size: 20px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                width: 25%;
                height: 100%;
            }
        }
        ul{
            background-color: white;
            border-top: 1px solid grey;
            
            li{ 
                overflow: hidden;
                cursor: pointer;
                border-bottom: 1px solid grey;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                transition: $standart;
                &:hover{
                    background-color: whitesmoke;
                }
                .edit-group{
                    button{
                        background-color: transparent;
                        border: none;
                        padding: 0px;
                        svg {
                            transition: $standart;
                        }
                        &:first-child{
                            margin-right: 20px;
                            &:hover{
                                svg{
                                    fill: rgb(57, 57, 179);
                                }
                            }
                        }
                        &:last-child{
                         
                            &:hover{
                                svg{
                                    fill: rgb(202, 42, 42);
                                }
                            }
                        }
                    }
                }
            }
            .completed{
                text-decoration: line-through;
            }
        }
    }

    @media(max-width:768px){


        .todolist-wrapper{
            width: 350px;
            h2{
                font-size: 20px;
            }
        }
    }
</style>