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
      let pnd = data.previous_non_discrimination ? data.previous_non_discrimination : 0,
      cnd = data.current_non_discrimination ? data.current_non_discrimination : 0,
      pcd = data.previous_community_development ? data.previous_community_development : 0,
      ccd = data.current_community_development ? data.current_community_development: 0,
      pcbs = data.previous_community_business_stakeholder ? data.previous_community_business_stakeholder: 0,
      ccbs = data.current_community_business_stakeholder ? data.current_community_business_stakeholder : 0,
      pewb = data.previous_employees_well_being ? data.previous_employees_well_being : 0,
      cewb = data.current_employees_well_being ? data.current_employees_well_being : 0,
      psc = data.previous_supply_chain ? data.previous_supply_chain : 0,
      csc = data.current_supply_chain ? data.current_supply_chain : 0;
      return(
        <div className="proto-to-grid-card">
          <div className="proto-grid">
            <div className="proto-tool-tip">
              <div className="proto-t-ownership">Sector: {data.sector}</div>
              <div className="proto-ratings proto-top-row">
                <div className="proto-label">Elements</div>
                <div className="proto-value"> {data.current_year - 1} </div>
                <div className="proto-per-bar"></div>
                <div className="proto-per-bar proto-per-bar-15"></div>
                <div className="proto-value proto-value-16 proto-per-bar-15"> {data.current_year} </div>
                <div className="proto-value proto-per-value"> Change </div>
              </div>
              <div className="proto-ratings">
                <div className="proto-label"> Non Discrimination</div>
                <div className="proto-value">{data.previous_non_discrimination ? pnd.toFixed(2): 'NA'}</div>
                <div className="proto-per-bar proto-per-bar-15">
                  <div className="proto-year-15" style={{width:pnd.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-per-bar proto-per-bar-16">
                  <div className="proto-year-16" style={{width:cnd.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-value proto-value-16">{data.current_non_discrimination ? cnd.toFixed(2) : 'NA'}</div>
                <div className="proto-value proto-per-value">{(cnd - pnd).toFixed(2)}</div>
              </div>
              <div className="proto-ratings">
                <div className="proto-label">Community Development</div>
                <div className="proto-value">{data.previous_community_development ? pcd.toFixed(2) : 'NA'}</div>
                <div className="proto-per-bar proto-per-bar-15">
                  <div className="proto-year-15" style={{width:pcd.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-per-bar proto-per-bar-16">
                  <div className="proto-year-16" style={{width:ccd.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-value proto-value-16">{data.current_community_development ? ccd.toFixed(2) : 'NA'}</div>
                <div className="proto-value proto-per-value">{(ccd - pcd).toFixed(2)}</div>
              </div>
              <div className="proto-ratings">
                <div className="proto-label">Community Business Stakeholders</div>
                <div className="proto-value">{data.previous_community_business_stakeholder ? pcbs.toFixed(2): 'NA'}</div>
                <div className="proto-per-bar proto-per-bar-15">
                  <div className="proto-year-15" style={{width:pcbs.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-per-bar proto-per-bar-16">
                  <div className="proto-year-16" style={{width:ccbs.toFixed(2)*100+"%"}}></div>
                </div><div className="proto-value proto-value-16">{data.current_community_business_stakeholder ? ccbs.toFixed(2) : 'NA'}</div>
                <div className="proto-value proto-per-value">{(ccbs - pcbs).toFixed(2)}</div>
              </div>
              <div className="proto-ratings">
                <div className="proto-label">Employee Well Being</div>
                <div className="proto-value">{data.previous_employees_well_being ? pewb.toFixed(2) : 'NA'}</div>
                <div className="proto-per-bar proto-per-bar-15">
                  <div className="proto-year-15" style={{width:pewb.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-per-bar proto-per-bar-16">
                  <div className="proto-year-16" style={{width:cewb.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-value proto-value-16">{data.current_employees_well_being ? cewb.toFixed(2) : 'NA'}</div>
                <div className="proto-value proto-per-value">{(cewb - pewb).toFixed(2)}</div>
              </div>
              <div className="proto-ratings">
                <div className="proto-label">Supply Chain</div>
                <div className="proto-value">{data.previous_supply_chain ? psc.toFixed(2) : 'NA'}</div>
                <div className="proto-per-bar proto-per-bar-15">
                  <div className="proto-year-15" style={{width:psc.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-per-bar proto-per-bar-16">
                  <div className="proto-year-16" style={{width:csc.toFixed(2)*100+"%"}}></div>
                </div>
                <div className="proto-value proto-value-16">{ data.current_supply_chain ? csc.toFixed(2) : 'NA'}</div>
                <div className="proto-value proto-per-value">{(csc - psc).toFixed(2)}</div>
              </div>
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