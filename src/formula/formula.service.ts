import { Injectable } from '@nestjs/common';

@Injectable()
export class FormulaService {

  // Test Data
  private readonly totalPayrollFormula = "$1 + $2 * ($3 - $1)";
  private salaryHeads: SalaryHead[] = [
    { id: 1, formula: '($2+$3)/(10*10)'},
    { id: 2, value: 200 },
    { id: 3, formula: '$2-50' },
  ];


  decodeFormula(formula: string): number {

    const getValueOfSalaryHead = (id: number): number => {
      const salaryHead = this.salaryHeads.find(sh => sh.id === id);
      if (!salaryHead) throw new Error(`Salary head with ID ${id} not found`);

      // If the salary head's value is already known, return it
      if (salaryHead.value !== undefined) return salaryHead.value;
      // If the salary head has a formula, evaluate it recursively
      if (salaryHead.formula) {
        salaryHead.value = this.decodeFormula(salaryHead.formula);
        return salaryHead.value;
      }
      throw new Error(`Salary head with ID ${id} has no value or formula`);
    };

    const evaluatedFormula = formula.replace(/\$(\d+)/g, (_, id) => {
      return getValueOfSalaryHead(Number(id)).toString();
    });
    
    const result = eval(evaluatedFormula);
    return result;
  }

  calculatePayrollWithDetails(): { totalPayroll: number, salaryHeadValues: { [id: string]: number } } {
    const salaryHeadValues = {};
    this.salaryHeads.forEach(sh => {
      if (sh.formula) {
        salaryHeadValues[sh.id] = this.decodeFormula(sh.formula);
      } else if (sh.value !== undefined) {
        salaryHeadValues[sh.id] = sh.value;
      }
    });

    const totalPayroll = this.decodeFormula(this.totalPayrollFormula);

    return { totalPayroll, salaryHeadValues };
  }

}
