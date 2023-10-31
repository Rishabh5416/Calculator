class Calculator {
    constructor(previous, current){
        this.previous = previous
        this.current = current
        this.clear()
    }

    clear(){
        this.currentOparand = ''
        this.previousOparand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOparand = this.currentOparand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOparand.includes('.')) return
        this.currentOparand = this.currentOparand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOparand === '') return
        if(this.previousOparand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOparand = this.currentOparand
        this.currentOparand = ''
    }

    compute(){
        let computation
        const numPrev = parseFloat(this.previousOparand)
        const numCurr = parseFloat(this.currentOparand)
        if(isNaN(numPrev) || isNaN(numCurr)) return

        switch(this.operation){
            case '+':
                computation = numPrev + numCurr
                break
            case '-':
                computation = numPrev - numCurr
                break
            case '*':
                computation = numPrev * numCurr
                break
            case '/':
                computation = numPrev / numCurr
                break
            default:
                return
        }
        this.currentOparand = computation
        this.previousOparand = ''
        this.operation = undefined
    }

    updateDisplay(){
        this.current.innerText = this.currentOparand
        this.previous.innerText = this.previousOparand
        if(this.operation != null) {
            this.previous.innerText = `${this.previousOparand} ${this.operation}`
        }
    }

}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')

const calculator = new Calculator(previous, current)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})