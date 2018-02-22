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
      optionalConfigJSON: {}
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    console.log(this.props)
    if (this.props.siteConfigs) {
      stateVar.siteConfigs = this.props.siteConfigs;
    }

    this.state = stateVar;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      let items_to_fetch = [
        axios.get(this.props.dataURL),

        axios.get(this.props.optionalConfigURL),

        axios.get(this.props.siteConfigURL)
      ];

      if (this.props.siteConfigURL) {
        items_to_fetch.push(axios.get(this.props.siteConfigURL));
      }

      axios.all(items_to_fetch).then(axios.spread((card, opt_config, site_configs) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          optionalConfigJSON: opt_config.data,
          siteConfigs: site_configs ? site_configs.data : this.state.siteConfigs
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
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data,
        color = this.state.siteConfigs.house_colour;

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
              <div className="proto-single-bar proto-first-block" style={{backgroundColor: color, opacity: cnd.toFixed(2)}} />
              <div className="proto-single-bar proto-fourth-block" style={{backgroundColor: color, opacity: cewb.toFixed(2)}} />
              <div className="proto-single-bar proto-second-block" style={{backgroundColor: color, opacity: ccd.toFixed(2)}} />
              <div className="proto-single-bar proto-fifth-block" style={{backgroundColor: color, opacity:csc.toFixed(2) }} />
              <div className="proto-single-bar proto-third-block" style={{backgroundColor: color, opacity: ccbs.toFixed(2)}}/ >
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