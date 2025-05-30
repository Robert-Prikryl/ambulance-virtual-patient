import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { Configuration, VirtualPatient, VirtualPatientListApi } from '../../api/ambulance-virtual-patient';

@Component({
  tag: 'xprikryl-vp-list',
  styleUrl: 'xprikryl-vp-list.css',
  shadow: true,
})

export class XprikrylVpList {
  
  @Event({ eventName: "entry-clicked"}) entryClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() userRole: string;
  @State() errorMessage: string;

  private listOfVirtualPatients: VirtualPatient[] = [];

  async getListOfVirtualPatients(): Promise<VirtualPatient[]> {
    console.log("getListOfVirtualPatients", this.apiBase, this.userRole);
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new VirtualPatientListApi(configuration);
      const response = await waitingListApi.getVirtualPatientListRaw()
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.listOfVirtualPatients = await this.getListOfVirtualPatients();
  }

  render() {
    return (
      <Host>
        <md-list>
          {this.listOfVirtualPatients.map(patient =>
            <md-list-item onclick={() => this.entryClicked.emit(patient.id)}>
              <div slot="headline">{patient.name}</div>
              <div slot="supporting-text">Difficulty: <span class="difficulty-indicator">{patient.difficulty}</span></div>
                <md-icon slot="start">person</md-icon>
                {this.userRole === "teacher" ? (
                  <md-icon slot="end">edit</md-icon>
                ) : (
                  <md-icon slot="end">arrow_forward</md-icon>
                )}
            </md-list-item>
          )}
        </md-list>
        {this.userRole === "teacher" && (
          <md-filled-icon-button class="add-button"
          onclick={() => this.entryClicked.emit("@new")}>
            <md-icon>add</md-icon>
          </md-filled-icon-button>
        )}
      </Host>
    );
  }
}
