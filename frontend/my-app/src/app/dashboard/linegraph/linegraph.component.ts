import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as d3 from 'd3';

@Component({
  selector: 'app-linegraph',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './linegraph.component.html',
  styleUrls: ['./linegraph.component.css']
})
export class LinegraphComponent implements OnInit {

  @ViewChild('sparkline', { static: true }) sparklineElement!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    const data = [10, 20, 30, 25, 35, 40, 45, 50, 55, 60];
    const width = 400; // Increased width
    const height = 200; // Increased height
    const margin = { top: 20, right: 20, bottom: 30, left: 30 }; // Adjusted margins

    const svg = d3.select(this.sparklineElement.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, d3.max(data) || 0]).range([height - margin.bottom, margin.top]);

    const line = d3.line<number>()
      .x((d, i) => x(i) || 0)
      .y(d => y(d) || 0)
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2) // Increased stroke width for better visibility
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', (d, i) => x(i) || 0)
      .attr('cy', d => y(d) || 0)
      .attr('r', 4) // Increased circle radius
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        // Show value on hover
        svg.append('text')
          .attr('class', 'value-text')
          .attr('x', x(data.indexOf(d)) + 5)
          .attr('y', y(d) - 5)
          .text(d);
      })
      .on('mouseout', () => {
        // Remove value on mouseout
        svg.select('.value-text').remove();
      });

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all');
  }

}