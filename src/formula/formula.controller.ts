import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormulaService } from './formula.service';

@Controller('formula')
export class FormulaController {
  constructor(private readonly formulaService: FormulaService) {}

  // @Post()
  // create(@Body() createFormulaDto: CreateFormulaDto) {
  //   return this.formulaService.create(createFormulaDto);
  // }

  // @Get()
  // calculateSalaryHead() {
  //   return this.formulaService.decodeFormula();
  // }

  @Get('/calculate')
  calculateTotalPayroll() {
    return this.formulaService.calculatePayrollWithDetails();
  }

}
