class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.'&& this.currentOperand.includes('.')) return 
       this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation){
        if(this.currentOperand==='')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let result 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        this.calculation = `${this.previousOperand} ${this.operation} ${this.currentOperand}`
        switch(this.operation){
            case '+':
                result = current + prev
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = current * prev
                break
            case '÷':
                result = prev/current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
}

    formatNumber(number){
        const stringNumber = number.toString()
        const digits = parseFloat(stringNumber.split('.'[0]))
        const decimals = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(digits)){
            integerDisplay= ''
        }else{
            integerDisplay = digits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimals != null){
            return `${integerDisplay}.${decimals}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.formatNumber(this.currentOperand)
        if(this.operation != null){
                this.previousOperandTextElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`
                
        }else{
            if(this.calculation!=null){
                this.previousOperandTextElement.innerText = this.calculation
                this.calculation = null
            }else{
                this.previousOperandTextElement.innerText = ''
            }
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-opeartion]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const previousOperandTextElement = document.querySelector('[data-previousOperand]')
const currentOperandTextElement = document.querySelector('[data-currentOperand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

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