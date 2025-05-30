import { Component, Host, Prop, State, h } from '@stencil/core';
import { VirtualPatientListApi, Configuration } from '../../api/ambulance-virtual-patient';

@Component({
  tag: 'xprikryl-vp-detail',
  styleUrl: 'xprikryl-vp-detail.css',
  shadow: true,
})
export class XprikrylVpDetail {
  @Prop() apiBase: string;
  @Prop() patientId: string;
  @Prop() userRole: string;
  @State() patient: any = null;
  @State() errorMessage: string = '';

  async componentWillLoad() {
    try {
      const config = new Configuration({ basePath: this.apiBase });
      const api = new VirtualPatientListApi(config);
      const patients = await api.getVirtualPatientList();
      this.patient = patients.find(p => p.id === this.patientId);
      if (!this.patient) {
        this.errorMessage = 'Patient not found';
      }
    } catch (err) {
      this.errorMessage = 'Failed to load patient details';
      console.error(err);
    }
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error-message">{this.errorMessage}</div>
        </Host>
      );
    }

    if (!this.patient) {
      return (
        <Host>
          <div class="loading">Loading...</div>
        </Host>
      );
    }

    return (
      <Host>
        <div class="patient-details">
          <md-elevated-card>
            <div class="card-content">
              <h2>Patient Details</h2>
              <md-filled-text-field
                label="Name"
                value={this.patient.name}
                readonly>
              </md-filled-text-field>
              
              <md-filled-text-field
                label="Difficulty"
                value={this.patient.difficulty}
                readonly>
              </md-filled-text-field>

              <md-filled-text-field
                label="Symptoms"
                value={this.patient.symptoms.join(', ')}
                readonly>
              </md-filled-text-field>

              <md-filled-text-field
                label="Anamnesis"
                value={this.patient.anamnesis}
                readonly
                type="textarea">
              </md-filled-text-field>

              <div class="divider">
                <md-divider></md-divider>
              </div>

              <md-filled-text-field
                label="Your Answer"
                value=""
                type="textarea">
              </md-filled-text-field>
            </div>
          </md-elevated-card>
        </div>
      </Host>
    );
  }
}
