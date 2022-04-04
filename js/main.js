'use strict'
var gNum1
var gNum2
var gOp
var gPreviousCal
var elDisplay = document.querySelector('.display')
var elMemoryDisplay = document.querySelectorAll('.basicTable')[1]
var gMemoryNum

function init() {
    clearCal()
}

function updateDisplay(memory = false) {
    !memory ? (elDisplay.innerHTML = gNum1 + gOp + gNum2) : elMemoryDisplay.innerHTML = gMemoryNum
}

function getNum(num) {
    if (gPreviousCal && !gOp) {
        gNum1 = num.toString()
        gPreviousCal = ""
        updateDisplay()
        return null
    }
    !gOp ? gNum1 += num : gNum2 += num
    console.log(gNum1, gOp, gNum2)
    updateDisplay()
}

function getOp(op) {
    if (!gNum2 && op === "=") {
        if (!gPreviousCal) return null
        else if (gPreviousCal) {
            gNum2 = gPreviousCal.substring(1)
            gOp = gPreviousCal.charAt(0)
        }
    } else if (!gNum2) {
        gNum2 = ""
        gOp = op
    }
    if (gNum2) {
        gNum1 = getCal(gNum1, gNum2, gOp)
        gOp = ""
        gNum2 = ""
    }
    console.log(gNum1, gOp, gNum2)
    updateDisplay()
}

function getCal(num1, num2, op) {
    if (num1.includes(".") || num2.includes(".")) {
        num1 = parseFloat(num1)
        num2 = parseFloat(num2)
    } else {
        num1 = parseInt(num1)
        num2 = parseInt(num2)
    }
    gPreviousCal = `${op}${num2}`
    switch (op) {
        case "+":
            return (num1 + num2).toString()
        case "-":
            return (num1 - num2).toString()
        case "*":
            return (num1 * num2).toString()
        case "/":
            return (num1 / num2).toString()
        case "%":
            return (num1 % num2).toString()
    }
}

function clearCal() {
    gNum1 = ""
    gNum2 = ""
    gOp = ""
    elDisplay.innerHTML = "0"
}

function memoryStore() {
    gMemoryNum = !gNum2 && !gOp ? gNum1 : gNum2
    if (!gMemoryNum) gMemoryNum = "0"
    clearEntry()
    console.log(gMemoryNum)
}

function memoryClear() {
    gMemoryNum = ""
    elMemoryDisplay.innerHTML = "Memory"
}

function memoryRecall() {
    !gOp ? gNum1 = gMemoryNum : gNum2 = gMemoryNum
    updateDisplay()
}

function memoryCal(op){
    if(gOp) return Null
    gMemoryNum = getCal(gMemoryNum,gNum1,op)
    updateDisplay(true)
}

function clearEntry() {
    !gNum2 && !gOp ? gNum1 = "" : gNum2 = ""
    updateDisplay()
    updateDisplay(true)
    elDisplay.innerHTML += "0"
}