import { useState, useCallback } from 'react';

export const useCalculator = () => {
  const [state, setState] = useState({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    expression: '',
    currentInput: '',
    showResult: false,
  });

  const inputNumber = useCallback((num) => {
    setState(prevState => {
      const newInput = prevState.waitingForOperand ? num : prevState.currentInput + num;
      const newExpression = prevState.waitingForOperand 
        ? (prevState.expression + num)
        : (prevState.expression ? prevState.expression + num : num);

      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: num,
          waitingForOperand: false,
          currentInput: num,
          expression: newExpression,
          showResult: false,
        };
      }

      const newDisplay = prevState.display === '0' ? num : prevState.display + num;
      return {
        ...prevState,
        display: newDisplay,
        currentInput: newInput,
        expression: newExpression,
        showResult: false,
      };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prevState => {
      const newExpression = prevState.expression + '.';

      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: '0.',
          waitingForOperand: false,
          currentInput: '0.',
          expression: newExpression,
          showResult: false,
        };
      }

      if (prevState.display.indexOf('.') === -1) {
        return {
          ...prevState,
          display: prevState.display + '.',
          currentInput: prevState.currentInput + '.',
          expression: newExpression,
          showResult: false,
        };
      }

      return prevState;
    });
  }, []);

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      expression: '',
      currentInput: '',
      showResult: false,
    });
  }, []);

  const performOperation = useCallback((nextOperation) => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);

      // Handle equals operation
      if (nextOperation === '=') {
        if (prevState.previousValue !== null && prevState.operation) {
          let result = prevState.previousValue;
          
          switch (prevState.operation) {
            case '+':
              result = prevState.previousValue + inputValue;
              break;
            case '-':
              result = prevState.previousValue - inputValue;
              break;
            case '*':
              result = prevState.previousValue * inputValue;
              break;
            case '/':
              result = inputValue !== 0 ? prevState.previousValue / inputValue : prevState.previousValue;
              break;
          }
          
          return {
            display: String(result),
            previousValue: null,
            operation: null,
            waitingForOperand: true,
            expression: prevState.expression,
            currentInput: String(result),
            showResult: true,
          };
        }
        return prevState;
      }

      // Handle other operations
      if (prevState.previousValue === null) {
        const operatorSymbol = getOperatorSymbol(nextOperation);
        return {
          ...prevState,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
          expression: prevState.expression + operatorSymbol,
          currentInput: '',
          showResult: false,
        };
      }

      if (prevState.operation && prevState.waitingForOperand) {
        const operatorSymbol = getOperatorSymbol(nextOperation);
        const newExpression = prevState.expression.slice(0, -1) + operatorSymbol;
        return {
          ...prevState,
          operation: nextOperation,
          expression: newExpression,
        };
      }

      const currentValue = prevState.previousValue || 0;
      let result = currentValue;

      switch (prevState.operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : currentValue;
          break;
        default:
          return prevState;
      }

      const operatorSymbol = getOperatorSymbol(nextOperation);

      return {
        display: String(result),
        previousValue: result,
        operation: nextOperation,
        waitingForOperand: true,
        expression: prevState.expression + operatorSymbol,
        currentInput: '',
        showResult: false,
      };
    });
  }, []);

  const calculateSquareRoot = useCallback(() => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);
      if (inputValue < 0) {
        return {
          ...prevState,
          display: 'Error',
          expression: `√(${prevState.expression})`,
          showResult: true,
        };
      }
      
      const result = Math.sqrt(inputValue);
      
      return {
        ...prevState,
        display: String(result),
        expression: `√(${prevState.expression})`,
        waitingForOperand: true,
        currentInput: String(result),
        showResult: true,
      };
    });
  }, []);

  const calculatePercentage = useCallback(() => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);
      const result = inputValue / 100;
      
      return {
        ...prevState,
        display: String(result),
        expression: prevState.expression + '%',
        waitingForOperand: true,
        currentInput: String(result),
        showResult: true,
      };
    });
  }, []);

  const formatNumber = (value) => {
    if (isNaN(value)) return '0';
    
    // Handle very large or very small numbers
    if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }
    
    // Format with appropriate decimal places
    const formatted = parseFloat(value.toPrecision(12));
    
    // Add commas for thousands
    if (Math.abs(formatted) >= 1000) {
      return formatted.toLocaleString('en-US', { maximumFractionDigits: 8 });
    }
    
    return String(formatted);
  };

  const formatDisplay = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    return formatNumber(num);
  };

  const getOperatorSymbol = (op) => {
    switch (op) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '*';
      case '/': return '/';
      default: return op;
    }
  };

  return {
    state,
    inputNumber,
    inputDecimal,
    clear,
    performOperation,
    calculateSquareRoot,
    calculatePercentage,
    formatDisplay,
  };
};