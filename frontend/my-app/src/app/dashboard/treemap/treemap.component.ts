import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as d3 from 'd3';

@Component({
  standalone: true,
  imports: [MatCardModule],
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements AfterViewInit {
  @ViewChild('chart', { static: true })
  private chartContainer!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.createTreemap();
  }

  createTreemap(): void {
    const data = {
      name: 'root',
      children: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
        { name: 'D', value: 40 }
      ]
    };

    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const treemap = d3.treemap()
      .size([width, height])
      .padding(1);

    const root = d3.hierarchy(data)
      .sum(d => d.value);

    treemap(root);

    svg.selectAll('rect')
      .data(root.leaves())
      .enter().append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('fill', 'steelblue')
      .style('stroke', 'white');

    svg.selectAll('text')
      .data(root.leaves())
      .enter().append('text')
      .attr('x', d => d.x0 + 5)
      .attr('y', d => d.y0 + 20)
      .text(d => d.data.name)
      .attr('font-size', '14px')
      .attr('fill', 'white');
  }
}
