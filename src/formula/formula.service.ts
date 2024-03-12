import { Injectable } from '@nestjs/common';

@Injectable()
export class FormulaService {

  private readonly totalPayrollFormula = "$1 + $2 * ($3 - $1)";
  private salaryHeads: SalaryHead[] = [
    // Example salary heads. In a real application, these might come from a database.
    { id: 1, formula: '($2+$3)/(10*10)' },
    { id: 2, value: 100 }, // Directly assigned value
    { id: 3, formula: '$2-50' },
  ];

  encodeFormula(formulaString: string): string {
    // Simple example: Convert "Salary Head 1 + Salary Head 2" to "$1 + $2"
    return formulaString.replace(/Salary Head (\d+)/gi, '$$$1');
  }

  decodeFormula(formula: string): number {
    const getValueOfSalaryHead = (id: number): number => {
      const salaryHead = this.salaryHeads.find(sh => sh.id === id);
      if (!salaryHead) throw new Error(`Salary head with ID ${id} not found`);

      // If the salary head's value is already known, return it
      if (salaryHead.value !== undefined) return salaryHead.value;

      // If the salary head has a formula, evaluate it recursively
      if (salaryHead.formula) {
        salaryHead.value = this.decodeFormula(salaryHead.formula); // Recursive call
        return salaryHead.value;
      }

      throw new Error(`Salary head with ID ${id} has no value or formula`);
    };

    // Replace $salary_head_id in the formula with their actual values
    const evaluatedFormula = formula.replace(/\$(\d+)/g, (_, id) => {
      return getValueOfSalaryHead(Number(id)).toString();
    });

    // Evaluate the formula safely. Consider using a math expression evaluator library.
    const result = eval(evaluatedFormula); // Note: Use a safe evaluation method
    return result;
  }

  calculatePayrollWithDetails(): { totalPayroll: number, salaryHeadValues: { [id: string]: number } } {
    const salaryHeadValues = {};

    // Assuming the decodeFormula method is defined and correctly evaluates formulas

    // Calculate the value for each salary head and populate salaryHeadValues
    this.salaryHeads.forEach(sh => {
      if (sh.formula) {
        salaryHeadValues[sh.id] = this.decodeFormula(sh.formula);
      } else if (sh.value !== undefined) {
        salaryHeadValues[sh.id] = sh.value;
      }
    });

    // Calculate the total payroll using the formula from the "database"
    const totalPayroll = this.decodeFormula(this.totalPayrollFormula);

    return { totalPayroll, salaryHeadValues };
  }

}
