console.log("Test")

class Calculator {
    constructor(previousoperandtext,currentoperandtext) {
        this.previousoperandtext=previousoperandtext
        this.currentoperandtext=currentoperandtext
        this.clear()
    }
// function for clearing values
    clear() {
        this.currentoperand=''
        this.previousoperand=''
        this.operation= undefined
    }
    // function for deleting the last value
    delete() {
        this.currentoperand=this.currentoperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number==="." && this.currentoperand.includes(".")) return
        this.currentoperand=this.currentoperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentoperand ==='') return
        if(this.previousoperand!=="") {
            this.compute()
        }
        this.operation=operation
        this.previousoperand=this.currentoperand
        this.currentoperand=''
    }
// computes the operands based on operation
    compute() {
        let computation 
        const prev=parseFloat(this.previousoperand)
        const curr=parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+':
                computation=prev+curr
                break;
                case '-':
                computation=prev-curr
                break
                case '%':
                computation=prev/curr
                break
                case '*':
                computation=prev*curr
                break
                default: return
        }
        this.currentoperand=computation
        this.operation=undefined
        this.previousoperand=''
    }
// updates the display should be called after each click event
    updateDisplay() {
        this.currentoperandtext.innerText = this.currentoperand
        this.previousoperandtext.innerText = this.previousoperand


    }
}

const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allclearButton=document.querySelector('[data-all-clear]')
const previousoperandtext=document.querySelector('[data-previous-operand]')
const currentoperandtext=document.querySelector('[data-current-operand]')

const calculator= new Calculator (previousoperandtext,currentoperandtext)


numberButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        
    })
})

equalsButton.addEventListener("click",()=>{
    calculator.compute()
    calculator.updateDisplay()

})
allclearButton.addEventListener("click",()=>{
    calculator.clear()
    calculator.updateDisplay()

})
deleteButton.addEventListener("click",()=>{
    calculator.delete()
    calculator.updateDisplay()
    
})