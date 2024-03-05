import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { DataService } from './data.service';

@Component({
  selector: 'app-piegraph',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './piegraph.component.html',
  styleUrls: ['./piegraph.component.css']
})

export class PiegraphComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('PiegraphComponent initialized');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit triggered');
    this.renderPieChart(8);
  }

  private renderPieChart(userId: number): void {
    let incomeData: any[];
    let expenseData: any[];
  
    this.dataService.getIncomeData(userId).subscribe(income => {
      incomeData = income;
      renderChart();
    });
  
    this.dataService.getExpenseData(userId).subscribe(expense => {
      expenseData = expense;
      renderChart();
    });
  
    const renderChart = () => {
      if (incomeData && expenseData) {
        console.log('Income Data:', incomeData);
        console.log('Expense Data:', expenseData);
  
        // Calculate total income amount
        const totalIncome = incomeData.reduce((total, item) => total + parseFloat(item.amount), 0);
        console.log('Total Income:', totalIncome);
  
        // Calculate total expense amount
        const totalExpense = expenseData.reduce((total, item) => total + parseFloat(item.amount), 0);
        console.log('Total Expense:', totalExpense);
  
        // Prepare data for pie chart
        const data = [totalIncome, totalExpense];
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
  
        const color = d3.scaleOrdinal<string>()
          .domain(['income', 'expense'])
          .range(['green', 'red']);
  
        const arc = d3.arc<any, d3.DefaultArcObject>()
          .innerRadius(radius * 0.6) // Inner radius for the donut
          .outerRadius(radius);
  
        const pie = d3.pie().value((d: any) => d);
  
        const svg = d3.select('#pie-chart-container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
        
        // Add label in the middle of the donut
        const label = svg.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .style('font-size', '20px')
          .style('fill', 'black')
          .text('Monthly Budget')
          .attr('id', 'budget-label');
  
        const pieData = pie(data).map((d: any, i: number) => {
          return {
            ...d,
            type: i === 0 ? 'Income' : 'Expense',
            amount: Math.abs(d.data)
          };
        });
  
        const arcs = svg.selectAll('arc')
          .data(pieData)
          .enter()
          .append('g')
          .attr('class', 'arc');
  
        arcs.append('path')
          .attr('d', arc as any) // Explicitly cast arc as any
          .attr('fill', (d: any) => color(d.type))
          .on('mouseover', function(event: any, d: any) {
            console.log('Hover Data:', d);
            d3.select(this).transition()
              .duration(200)
              .style('transform', 'scale(1.1)');
            label.text(`${d.type}: $${d.amount}`);
          })
          .on('mouseout', function() {
            d3.select(this).transition()
              .duration(200)
              .style('transform', 'scale(1)');
            label.text('Monthly Budget');
          });
  
        if (svg.empty()) {
          console.error('SVG was not appended properly.');
        } else {
          console.log('SVG appended successfully.');
        }
      }
    };
  }
}