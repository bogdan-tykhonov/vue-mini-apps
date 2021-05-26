<template>
  <div class="inputModal-wrapper">
      <div class="modal">
          <h2>Edit your current note</h2>
          <input v-model="editedNote.text"  type="text">
          <div class="btn-row">
              <b-button @click="$emit('closeModal')" variant="info">Cancel</b-button>
            <b-button @click="$emit('edit', editedNote)" variant="danger">Edit</b-button>
         
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "InputModal",
    data(){
    return{
        editedNote: {
           text: this.currNote.text,
           index: this.currNote.idx,
           completed: this.currNote.completed
        }
    }
    },
    props:  ['currNote'],
}
</script>

<style lang="scss" scoped>
    .inputModal-wrapper{
        z-index: 100;
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: rgba($color: #000000, $alpha: 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .modal{
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            position: relative;
            width: 400px;
            height: 220px;
            input{
                padding: 10px;
                margin-top: 20px;
            }
            h2{
                color: $textColor;
            }
            .btn-row{
                margin-top: auto;
                text-align: end;
            }
            button{
                width: 120px;
                border-radius: 10px;
                &:first-child{
                    margin-right: 20px;
                }
            }
        }
    }

        @media(max-width:768px){

.inputModal-wrapper .modal{
    width: 350px;
}
        }
</style>