import React from 'react';
import { render } from 'react-dom';
import EditGridCard from './src/js/EditContainer.jsx';

ProtoGraph.Card.toDataIRBFGrid.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.renderSEO = function(data) {
    this.renderMode = 'SEO';
    return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toDataIRBFGrid.prototype.renderEdit = function(onPublishCallback) {
    this.mode = 'edit';
    this.onPublishCallback = onPublishCallback;
    render( <
        EditGridCard dataURL = { this.options.data_url }
        schemaURL = { this.options.schema_url }
        uiSchemaURL = { this.options.ui_schema_url }
        // optionalConfigURL={this.options.configuration_url}
        // optionalConfigSchemaURL={this.options.configuration_schema_url}
        siteConfigURL = { this.options.site_config_url }
        onPublishCallback = { this.onPublishCallback }
        mode = { this.mode }
        ref = {
            (e) => {
                this.containerInstance = this.containerInstance || e;
            }
        }
        />,
        this.options.selector);
}