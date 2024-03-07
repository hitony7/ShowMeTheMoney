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
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };

    const svg = d3.select(this.sparklineElement.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .on('mousemove', (event) => { // Add mousemove event to the SVG element
        const mouseX = d3.pointer(event)[0]; // Get mouse x-coordinate
        const xScale = d3.scaleLinear().domain([margin.left, width - margin.right]).range([0, data.length - 1]); // Scale for x-coordinate

        // Calculate index based on mouse x-coordinate
        const index = Math.round(xScale.invert(mouseX));
        if (index >= 0 && index < data.length) {
          // Show value
          const value = data[index];
          const tooltip = d3.select('.tooltip');
          tooltip.style('display', 'block')
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 15) + 'px')
            .html(`Value: ${value}`);
        }
      })
      .on('mouseout', () => { // Add mouseout event to hide tooltip
        d3.select('.tooltip').style('display', 'none');
      });

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
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', (d, i) => x(i) || 0)
      .attr('cy', d => y(d) || 0)
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // Append tooltip
    d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('border-radius', '5px');
  }
}