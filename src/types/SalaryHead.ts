interface SalaryHead {
    id: number;
    formula?: string; // Optional: Some salary heads might not have a formula.
    value?: number; // This is calculated based on the formula.
    name: string;
  }
  