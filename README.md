# Python Calculator

A beautiful, functional calculator built with Python's tkinter library that matches your design requirements.

## Features

- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Advanced Functions**: Square Root (√), Percentage (%)
- **Clear Function**: AC button to reset everything
- **Decimal Support**: Proper decimal point handling
- **Expression Display**: Shows current calculation above the result
- **Number Formatting**: Large numbers display with commas

## How to Run

1. Make sure you have Python installed (Python 3.6 or higher)
2. Open VS Code and navigate to the project folder
3. Run the calculator:

```bash
python calculator.py
```

## Usage

- **Numbers**: Click number buttons (0-9) to input values
- **Operations**: Click +, -, ×, ÷ for basic arithmetic
- **Equals**: Click = to calculate the result
- **Clear**: Click AC to reset the calculator
- **Square Root**: Click √ to calculate square root of current number
- **Percentage**: Click % to convert current number to percentage
- **Decimal**: Click . to add decimal point

## Code Structure

- `Calculator` class handles all calculator logic and UI
- `create_widgets()` sets up the user interface
- `create_buttons()` creates all calculator buttons with proper styling
- Individual methods handle different operations (input_number, perform_operation, etc.)
- `format_number()` handles number display formatting


The calculator maintains the visual design you specified while providing full functionality!