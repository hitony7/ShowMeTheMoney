import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-piegraph',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './piegraph.component.html',
  styleUrls: ['./piegraph.component.css']
})
export class PiegraphComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
    console.log('PiegraphComponent initialized');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit triggered');
    this.renderPieChart();
  }

  private renderPieChart(): void {
    // Sample data
    const data = [10, 20, 30, 40, 50];
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Define SVG container
    const svg = d3.select('#pie-chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Define pie function
    const pie = d3.pie<number>().value(d => d);
    
    // Generate pie chart data
    const pieData = pie(data);

    // Define arc generator
    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Append arcs to SVG
    svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10]);

    if (svg.empty()) {
      console.error('SVG was not appended properly.');
    } else {
      console.log('SVG appended successfully.');
    }
  }
}
