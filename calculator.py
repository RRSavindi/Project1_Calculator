import tkinter as tk

class Calculator:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Calculator")
        self.window.geometry("400x600")
        self.window.configure(bg="#d9efff")
        self.window.resizable(False, False)

        self.display_var = tk.StringVar(value="0")
        self.expression = ""

        self.create_widgets()

    def create_widgets(self):
        main_frame = tk.Frame(self.window, bg="#f7f8fb", relief="raised", bd=2)
        main_frame.pack(pady=40, padx=30, fill="both", expand=True)

        title_label = tk.Label(main_frame, text="Calculator", font=("Poppins", 24, "bold"), 
                               bg="#f7f8fb", fg="#000000")
        title_label.pack(pady=(20, 30))

        display_frame = tk.Frame(main_frame, bg="#f7f8fb")
        display_frame.pack(fill="x", padx=20, pady=(0, 30))

        self.display_label = tk.Label(display_frame, textvariable=self.display_var,
                                      font=("Poppins", 32, "bold"), bg="#f7f8fb", fg="#424242",
                                      anchor="e", justify="right")
        self.display_label.pack(fill="x")

        buttons_frame = tk.Frame(main_frame, bg="#f7f8fb")
        buttons_frame.pack(fill="both", expand=True, padx=20, pady=(0, 20))

        for i in range(5):
            buttons_frame.rowconfigure(i, weight=1)
        for i in range(4):
            buttons_frame.columnconfigure(i, weight=1)

        self.create_buttons(buttons_frame)

    def create_buttons(self, parent):
        buttons = [
            ('AC', 0, 0), ('⌫', 0, 1), ('()', 0, 2), ('/', 0, 3),
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('*', 1, 3),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('-', 2, 3),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('+', 3, 3),
            ('0', 4, 0), ('.', 4, 1), ('=', 4, 2, 2),  # '=' spans 2 columns
        ]

        for btn in buttons:
            text = btn[0]
            row = btn[1]
            col = btn[2]
            colspan = btn[3] if len(btn) == 4 else 1

            b = tk.Button(parent, text=text, font=("Poppins", 18), bg="#ffffff", fg="#000000",
                          activebackground="#d0e8ff", relief="raised", bd=1,
                          command=lambda val=text: self.on_button_click(val))
            b.grid(row=row, column=col, columnspan=colspan, sticky="nsew", padx=5, pady=5)

    def on_button_click(self, char):
        if char == 'AC':
            self.expression = ""
            self.display_var.set("0")
        elif char == '⌫':
            self.expression = self.expression[:-1]
            self.display_var.set(self.expression or "0")
        elif char == '=':
            try:
                result = str(eval(self.expression))
                self.display_var.set(result)
                self.expression = result
            except:
                self.display_var.set("Error")
                self.expression = ""
        elif char == '()':
            # Auto insert opening or closing based on context
            if self.expression.count('(') > self.expression.count(')'):
                self.expression += ')'
            else:
                self.expression += '('
            self.display_var.set(self.expression)
        else:
            self.expression += char
            self.display_var.set(self.expression)

    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    calc = Calculator()
    calc.run()
