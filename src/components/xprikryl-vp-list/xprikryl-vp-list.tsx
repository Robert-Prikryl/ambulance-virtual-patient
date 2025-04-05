import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xprikryl-vp-list',
  styleUrl: 'xprikryl-vp-list.css',
  shadow: true,
})
export class XprikrylVpList {
  
  private listOfVirtualPatients: any[] = [];

  async getListOfVirtualPatients(){
    return await Promise.resolve(
      [{
          name: 'Andrea Križová',
          patientId: '10001',
          difficulty: 'easy',
      }, {
          name: 'Bc. Martin Novotný',
          patientId: '10096',
          difficulty: 'medium',
      }, {
          name: 'Ing. Jana Svobodová',
          patientId: '10028',
          difficulty: 'hard',
      }]
    );
  }

  async componentWillLoad() {
    this.listOfVirtualPatients = await this.getListOfVirtualPatients();
  }

  render() {
    return (
      <Host>
        <md-list>
          {this.listOfVirtualPatients.map(patient =>
            <md-list-item>
              <div slot="headline">{patient.name}</div>
              <div slot="supporting-text">Náročnosť: <span class="difficulty-indicator">{patient.difficulty}</span></div>
                <md-icon slot="start">person</md-icon>
                <md-icon slot="end">edit</md-icon>
            </md-list-item>
          )}
        </md-list>
      </Host>
    );
  }
}
