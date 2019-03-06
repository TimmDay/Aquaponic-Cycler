import React from 'react';
import D3LineGraph from './D3LineGraph';
import BtnsDataEntry from './BtnsDataEntry';
import ModalEditCyclingDataPoint from './ModalEditCyclingDataPoint';


const Aquaponic = () => (
  <div className="aquaponic">
    <section className="content-container aquaponic__flex-container">
      < BtnsDataEntry />
      {window.innerWidth < 850 ? <D3LineGraph windowWidth={window.innerWidth }/> : <D3LineGraph />}
    </section>
    < ModalEditCyclingDataPoint />
  </div>
);

export default Aquaponic;