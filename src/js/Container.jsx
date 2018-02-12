import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import urlRegex from 'url-regex';
export default class toDataIRBFGridCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: undefined,
      schemaJSON: undefined,
      domain: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    if(this.props.domain){
      stateVar.domain = this.props.domain;
    }

    this.state = stateVar;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([
        axios.get(this.props.dataURL),
        axios.get(this.props.schemaURL),
        axios.get(this.props.optionalConfigURL),
        axios.get(this.props.optionalConfigSchemaURL),
        axios.get(this.props.siteConfigURL)
      ]).then(axios.spread((card, schema, opt_config, opt_config_schema, site_configs) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          schemaJSON: schema.data,
          optionalConfigJSON: opt_config.data,
          optionalConfigSchemaJSON: opt_config_schema.data,
          siteConfigs: site_configs.data
        };

        stateVar.optionalConfigJSON.house_colour = stateVar.siteConfigs.house_colour;
        stateVar.optionalConfigJSON.reverse_house_colour = stateVar.siteConfigs.reverse_house_colour;
        stateVar.optionalConfigJSON.font_colour = stateVar.siteConfigs.font_colour;
        stateVar.optionalConfigJSON.reverse_font_colour = stateVar.siteConfigs.reverse_font_colour;
        this.setState(stateVar);
      }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataJSON) {
      this.setState({
        dataJSON: nextProps.dataJSON
      });
    }
  }

  componentDidUpdate() {

  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  handleClick(){
    window.open(this.state.dataJSON.data.url,'_top');
  }

  renderGrid(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      let cnd = data.non_discrimination ? data.non_discrimination : 0,
      ccd = data.community_development ? data.community_development: 0,
      ccbs = data.community_business_stakeholder ? data.community_business_stakeholder : 0,
      cewb = data.employees_well_being ? data.employees_well_being : 0,
      csc = data.supply_chain ? data.supply_chain : 0;
      return(
        <div className="proto-to-grid-card">
          <div className="proto-data-grid-card">
            <div className="proto-sector-name">{data.ownership}</div>
            <div className="proto-company-name">{data.name}</div>
            <div className="proto-parameter-bars">
              <div className="proto-single-bar proto-first-block" style={{opacity: cnd.toFixed(2)}}></div>
              <div className="proto-single-bar proto-second-block" style={{opacity: ccd.toFixed(2)}}></div>
              <div className="proto-single-bar proto-third-block" style={{opacity: ccbs.toFixed(2)}}></div>
              <div className="proto-single-bar proto-fourth-block" style={{opacity: cewb.toFixed(2)}}></div>
              <div className="proto-single-bar proto-fifth-block" style={{opacity:csc.toFixed(2) }}></div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'grid':
        return this.renderGrid();
    }
  }
}