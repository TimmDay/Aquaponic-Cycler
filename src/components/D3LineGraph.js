import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import tip from 'd3-tip';
import { startSetCycleData, updateSelectedNodeData } from '../actions/aquaponic';
import { handleToggleModalEditCycle } from './../actions/ux';

class D3LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphWidth:
        this.props.windowWidth -
        this.props.margin.left -
        this.props.margin.right,
      graphHeight:
        this.props.windowHeight -
        this.props.margin.top -
        this.props.margin.bottom,
      colors: ['#4286f4', '#2ba85f', '#a564e5', '#f23551'],
      data: ''
    };
  }
  // realtime firestore database
  listenToData = () => this.props.startSetCycleData(); 

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate() {
    // filter data into the 4 data streams, sort by date
    const dataArr = [
      this.props.cyclingData
        .filter(d => d.name === 'pH')
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
      this.props.cyclingData
        .filter(d => d.name === 'ammonia')
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
      this.props.cyclingData
        .filter(d => d.name === 'nitrite')
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
      this.props.cyclingData
        .filter(d => d.name === 'nitrate')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    ];

    // use a separate update function depending on data selection
    switch (this.props.selectedFilter) {
      case 'pH':
        this.update(dataArr[0], 'pH');
        break;
      case 'ammonia':
        this.update(dataArr[1], 'ammonia');
        break;
      case 'nitrite':
        this.update(dataArr[2], 'nitrite');
        break;
      case 'nitrate':
        this.update(dataArr[3], 'nitrate');
        break;
      case 'view all':
        this.update(dataArr[0], 'pH');
        this.update(dataArr[1], 'ammonia');
        this.update(dataArr[2], 'nitrite');
        this.update(dataArr[3], 'nitrate');
        select('.aquaponic__y-axis').style('opacity', 0); // hide y axis for view all
        break;
      default:
        break;
    }
  }

  createGraph = () => {
    const svg = select('.line-graph')
      .append('svg')
      .attr('width', this.props.windowWidth)
      .attr('height', this.props.windowHeight);

    const graph = svg
      .append('g')
      .attr('width', this.state.graphWidth)
      .attr('height', this.state.graphHeight)
      .attr(
        'transform',
        `translate(${this.props.margin.left}, ${this.props.margin.top})`
      )
      .attr('class', 'graph');

    const xAxisGroup = graph
      .append('g')
      .attr('class', 'aquaponic__x-axis')
      .attr('transform', `translate(0,${this.state.graphHeight})`); //move from top (default) to bottom

    const yAxisGroup = graph.append('g').attr('class', 'aquaponic__y-axis');

    const path1 = graph.append('path').attr('class', 'aquaponic__line1');
    const path2 = graph.append('path').attr('class', 'aquaponic__line2');
    const path3 = graph.append('path').attr('class', 'aquaponic__line3');
    const path4 = graph.append('path').attr('class', 'aquaponic__line4');

    const dottedLineGroup = graph
      .append('g')
      .attr('class', 'aquaponic__dotted')
      .style('opacity', 0);
    dottedLineGroup
      .append('line')
      .attr('class', 'aquaponic__dotted-x')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', 4);
    dottedLineGroup
      .append('line')
      .attr('class', 'aquaponic__dotted-y')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', 4);

    this.listenToData(); 
  };

  update(data, param) {
    const graph = select('.graph');
    const xAxisGroup = select('.aquaponic__x-axis');
    const yAxisGroup = select('.aquaponic__y-axis');
    const path1 = select('.aquaponic__line1');
    const path2 = select('.aquaponic__line2');
    const path3 = select('.aquaponic__line3');
    const path4 = select('.aquaponic__line4');
    const dottedLines = select('.aquaponic__dotted');
    const dottedX = select('.aquaponic__dotted-x');
    const dottedY = select('.aquaponic__dotted-y');
    select('.aquaponic__tip').remove(); //remove old tip element

    const toolTip = tip()
      .attr('class', 'aquaponic__tip')
      .html(d => {
        let content = `<div class='aquaponic__tip-details'>
        ${d.value} ${this.props.selectedFilter === 'pH' ? '' : 'ppm'}
        </div>`;
        content += `<div class='aquaponic__tip-details'>
        ${moment(new Date(d.date)).format('ddd, hA')}
        </div>`;
        return content;
      });
    graph.call(toolTip); //apply new tip el to the graph element

    // scales
    const x = d3.scaleTime([0, this.state.graphWidth]); //timescale
    const y = d3.scaleLinear([this.state.graphHeight, 0]);
    const line = d3
      .line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
      //.curve(d3.curveCardinal.tension(0.7));
      // .curve(d3.curveCatmullRom.alpha(0.9));

    // 1. scale domains. set up axes.

    // set scale domains
    x.domain(d3.extent(this.props.dateExtent, d => new Date(d))); 
    // x.domain(d3.extent(data, d => new Date(d.date))); //extent returns [min, max]. Dates stored as strings, so bring them back to timestamps for comparison
    y.domain([-0.1, d3.max(data, d => parseFloat(d.value)) + 0.2]);

    //update circles and lines, for the 1 of 4 lines that is selected
    if (param === 'pH') {
      path1
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', this.state.colors[0])
        .attr('stroke-width', 2)
        .attr('d', line)
        .style('opacity', 1);

      const circles = graph.selectAll('.circle-ph').data(data); // 2. join data
      circles.exit().remove(); // 3. exit selection

      // 4. update existing dom els
      circles
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.value))
        .attr('fill', () => this.state.colors[0])
        .style('opacity', 1);

      // 5. enter selection
      circles
        .enter()
        .append('circle')
        .attr('class', 'circle-ph')
        .attr('r', 4)
        .attr('cx', d => x(new Date(d.date))) // x axis is dates. we made x func (timeScale) to take a date obj within the defined xaxis limits.
        //date stored as string, so coerce it to date type with new Date
        .attr('cy', d => y(d.value)) // y axis is values. have a ya scale func also, that takes a value (linearScale)
        .attr('fill', () => this.state.colors[0]);

    } else if (param === 'ammonia') {
      path2
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', this.state.colors[1])
        .attr('stroke-width', 2)
        .attr('d', line)
        .style('opacity', 1);

      const circles = graph.selectAll('.circle-amm').data(data); // 2. join data
      circles.exit().remove(); // 3. exit selection

      // 4. update existing dom els
      circles
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.value))
        .attr('fill', () => this.state.colors[1])
        .style('opacity', 1);

      // 5. enter selection
      circles
        .enter()
        .append('circle')
        .attr('class', 'circle-amm')
        .attr('r', 4)
        .attr('cx', d => x(new Date(d.date))) // x axis is dates. we made x func (timeScale) to take a date obj within the defined xaxis limits.
        //date stored as string, so coerce it to date type with new Date
        .attr('cy', d => y(d.value)) // y axis is values. have a ya scale func also, that takes a value (linearScale)
        .attr('fill', () => this.state.colors[1]);

    } else if (param === 'nitrite') {
      path3
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', this.state.colors[2])
        .attr('stroke-width', 2)
        .attr('d', line)
        .style('opacity', 1);

      const circles = graph.selectAll('.circle-ite').data(data); // 2. join data
      circles.exit().remove(); // 3. exit selection

      // 4. update existing dom els
      circles
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.value))
        .attr('fill', () => this.state.colors[2])
        .style('opacity', 1);

      // 5. enter selection
      circles
        .enter()
        .append('circle')
        .attr('class', 'circle-ite')
        .attr('r', 4)
        .attr('cx', d => x(new Date(d.date))) // x axis is dates. we made x func (timeScale) to take a date obj within the defined xaxis limits.
        //date stored as string, so coerce it to date type with new Date
        .attr('cy', d => y(d.value)) // y axis is values. have a ya scale func also, that takes a value (linearScale)
        .attr('fill', () => this.state.colors[2]);

    } else if (param === 'nitrate') {
      path4
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', this.state.colors[3])
        .attr('stroke-width', 2)
        .attr('d', line)
        .style('opacity', 1);

      const circles = graph.selectAll('.circle-ate').data(data); // 2. join data
      circles.exit().remove(); // 3. exit selection

      // 4. update existing dom els
      circles
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.value))
        .attr('fill', () => this.state.colors[3])
        .style('opacity', 1);

      // 5. enter selection
      circles
        .enter()
        .append('circle')
        .attr('class', 'circle-ate')
        .attr('r', 4)
        .attr('cx', d => x(new Date(d.date))) //date stored as string, so coerce it to date type with new Date
        .attr('cy', d => y(d.value)) // y axis is values. have a ya scale func also, that takes a value (linearScale)
        .attr('fill', () => this.state.colors[3]);
    }

    // create and call x-axis
    const xAxis = d3
      .axisBottom(x)
      .ticks(10)
      .tickFormat(d3.timeFormat('%b %d'));
    xAxisGroup.call(xAxis);
    xAxisGroup
      .selectAll('text')
      .attr('transform', 'rotate(-40)') // rotate axis text
      .attr('text-anchor', 'end');

    const yAxis = d3
      .axisLeft(y)
      .ticks(7)
      .tickFormat(
        d => `${d} ${this.props.selectedFilter === 'pH' ? '' : 'ppm'}`
      );

    yAxisGroup.style('opacity', 1); //re-display it, if it was hidden for view all
    yAxisGroup.call(yAxis);
    yAxisGroup.selectAll('text').attr('text-anchor', 'end');

    // USER INTERACTION - MOUSE
    graph
      .selectAll('circle')
      .on('mouseover', (d, i, n) => {
        toolTip.show(d, n[i]);
        select(n[i])
          .transition()
          .duration(100)
          .attr('r', 8);
        dottedX
          .attr('x1', 0)
          .attr('y1', y(d.value))
          .attr('x2', x(new Date(d.date)))
          .attr('y2', y(d.value));
        dottedY
          .attr('x1', x(new Date(d.date)))
          .attr('y1', this.state.graphHeight)
          .attr('x2', x(new Date(d.date)))
          .attr('y2', y(d.value));
          if (this.props.selectedFilter !== 'view all') dottedLines.style('opacity', 1);
      })
      .on('mouseleave', (d, i, n) => {
        toolTip.hide();
        select(n[i])
          .transition()
          .duration(300)
          .attr('r', 4);
        dottedLines.style('opacity', 0);
      })
      .on('click', (d) => {
        const nodeData = { id: d.id, date: d.date, name: d.name, value: d.value };
        this.props.updateSelectedNodeData(nodeData);
        this.props.handleToggleModalEditCycle();
      })
  }

  render() {
    return <div className="line-graph" />;
  }
}

const mapStateToProps = state => {
  return {
    selectedFilter: state.aquaponicReducer.selectedFilter,
    cyclingData: state.aquaponicReducer.cyclingData,
    dateExtent: state.aquaponicReducer.dateExtent
  };
};

const mapDispatchToProps = dispatch => ({
  startSetCycleData: () => dispatch(startSetCycleData()),
  handleToggleModalEditCycle: () => dispatch(handleToggleModalEditCycle()),
  updateSelectedNodeData: (obj) => dispatch(updateSelectedNodeData(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(D3LineGraph);

D3LineGraph.defaultProps = {
  margin: { top: 10, right: 70, bottom: 50, left: 70 },
  windowWidth: 600,
  windowHeight: 330
};