import React from 'react';
import { render } from 'react-dom';
import GridCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};

ProtoGraph.Card.toDataIRBFGrid = function() {
    this.cardType = 'toDataIRBFGridCard';
}

ProtoGraph.Card.toDataIRBFGrid.prototype.init = function(options) {
    this.options = options;
}

ProtoGraph.Card.toDataIRBFGrid.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.renderGrid = function(data) {
    this.mode = 'grid';
    this.render();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.render = function() {
    render( <
        GridCard dataURL = { this.options.data_url }
        selector = { this.options.selector }
        siteConfigURL = { this.options.site_config_url }
        siteConfigs = { this.options.site_configs }
        mode = { this.mode }
        ref = {
            (e) => {
                this.containerInstance = this.containerInstance || e;
            }
        }
        />,
        this.options.selector);
}