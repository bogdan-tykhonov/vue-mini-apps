<template>
    <div id="calculator" class="page">
      
           <Heading title="Simple calculator" />

            <div class="calculator">
              <div class="grid">
                <input type="number" name="" id="" disabled v-bind:placeholder="result">
                <button
                class="numbers"
                 v-for="(num, index) in numbers" 
                 v-bind:key="'numbers'+index"
                 @click="setNumber(num)"
                 >{{num}}
                 </button>
                 <button
                 class="clear"
                 @click="clear"
                 >C</button>
                 <button
                 class="operations"
                 v-for="(operation, index) in operations" 
                 v-bind:key="'operation'+index"
                  @click="addOperation(operation)"
                 >{{operation}}
                
                 </button>
                 <button
                 class="operations"
                 @click="getResult"
                 >
                  =
                 </button>
              </div>
            </div>
    </div>
</template>


<script>
import Heading from '@/components/Heading';
export default {
  
  name: 'Calculator',
  components: {Heading},
  data(){
    return{
      result: 0,
      current: 0,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'],
      operations: ['+', '-', '*', '/'],
      buttonHover: true,
      }
    },
  methods: {
    addOperation(operation){
      if(this.operations.includes(this.current)) return ;
      this.result += ` ${operation} `;
      this.current = operation;
    }, 
    getResult(){
      this.result = eval(this.result);
      this.current = this.result;
    },
    clear(){
      this.result = 0;
      this.current = '';
    },
    setNumber(num){
      let result = this.result;
      let current = this.current;
      if(num == '.'){
        if(Array.from(current.toString()).indexOf('.') == -1 && current != '' || current === 0){
          this.result =  result.toString() + num.toString();
          this.current = current.toString() + num.toString();
          console.log(current);
          return;
        }else{
          return;
        }
      }
      this.result = result === 0? num.toString() : result.toString() + num.toString();
      this.current =  current.toString() + num.toString();
    }
  } ,
  
}
</script>

<style scoped lang="scss">
#calculator{
  background: $secondary;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

  .calculator{
    width: 500px;
    margin: auto;
    margin-top: 100px;
    padding-bottom: 100px;
    .grid{
      display: flex;
      flex-wrap:wrap;
      input{
        background-color: white;
        width: 100%;
        height: 60px;
        border: 1px solid grey;
        padding: 10px;
        font-size: 20px;
        text-align: end;
        font-size: 40px;
        font-weight: 700;
      }
      button{
        font-size: 25px;
        font-weight: 700;
        color: white;
        border: none;
        height: 70px;
        width: 33.3%;
        border: 1px solid rgb(150, 149, 149);
        transition: $standart;
        &:hover{
          opacity: 0.7;
        }
      }
      .numbers{
        background-color: #243849;
      }
      .operations{
        background-color: orange;
        &:last-child{
          width: 66.7%;
        }
      }
      .clear{
        color: #243849;
        background-color: white;
      }
    }
  }

  @media(max-width:768px){
    .calculator{
      width: 350px;
    }
  }
</style>