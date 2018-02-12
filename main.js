import React from 'react';
import ReactDOM from 'react-dom';
import GridCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toDataIRBFGrid = function () {
  this.cardType = 'toDataIRBFGridCard';
}

ProtoGraph.Card.toDataIRBFGrid.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toDataIRBFGrid.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.renderGrid= function (data) {
  this.mode = 'grid';
  this.render();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.render = function () {
  ReactDOM.render(
    <GridCard
      dataURL={this.options.data_url}
      selector={this.options.selector}
      domain={this.options.domain}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      siteConfigURL={this.options.site_config_url}
      clickCallback={this.options.onClickCallback}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }} />,
    this.options.selector);
}