import { Component, Host, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { VirtualPatientListApi, Configuration } from '../../api/ambulance-virtual-patient';

@Component({
  tag: 'xprikryl-vp-detail-editor',
  styleUrl: 'xprikryl-vp-detail-editor.css',
  shadow: true,
})
export class XprikrylVpDetailEditor {
  @Prop() apiBase: string;
  @Prop() patientId: string;
  @Prop() userRole: string;
  @State() patient: any = null;
  @State() errorMessage: string = '';
  @Event() patientUpdated: EventEmitter<any>;
  @Event() patientDeleted: EventEmitter<void>;

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

  private handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const updatedPatient = {
        ...this.patient,
        name: formData.get('name'),
        difficulty: parseInt(formData.get('difficulty') as string),
        symptoms: (formData.get('symptoms') as string).split(',').map(s => s.trim()),
        anamnesis: formData.get('anamnesis')
      };

      const config = new Configuration({ basePath: this.apiBase });
      const api = new VirtualPatientListApi(config);
      await api.updateVirtualPatient({
        virtualPatientId: this.patientId,
        virtualPatient: updatedPatient
      });
      
      this.patient = updatedPatient;
      this.patientUpdated.emit(updatedPatient);
      window.location.href = '/list';
    } catch (err) {
      this.errorMessage = 'Failed to update patient';
      console.error(err);
    }
  };

  private handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this patient?')) {
      return;
    }

    try {
      const config = new Configuration({ basePath: this.apiBase });
      const api = new VirtualPatientListApi(config);
      await api.deleteVirtualPatient({
        virtualPatientId: this.patientId
      });
      
      this.patientDeleted.emit();
      window.location.href = '/list';
    } catch (err) {
      this.errorMessage = 'Failed to delete patient';
      console.error(err);
    }
  };

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
            <form onSubmit={this.handleSubmit} class="card-content">
              <h2>Edit Patient Details</h2>
              <md-filled-text-field
                name="name"
                label="Name"
                value={this.patient.name}
                required>
              </md-filled-text-field>
              
              <md-filled-select
                name="difficulty"
                label="Difficulty"
                value={this.patient.difficulty.toString()}
                required>
                <md-select-option value="1">1 - Easiest</md-select-option>
                <md-select-option value="2">2</md-select-option>
                <md-select-option value="3">3</md-select-option>
                <md-select-option value="4">4</md-select-option>
                <md-select-option value="5">5 - Hardest</md-select-option>
              </md-filled-select>

              <md-filled-text-field
                name="symptoms"
                label="Symptoms (comma-separated)"
                value={this.patient.symptoms.join(', ')}
                required>
              </md-filled-text-field>

              <md-filled-text-field
                name="anamnesis"
                label="Anamnesis"
                value={this.patient.anamnesis}
                type="textarea"
                required>
              </md-filled-text-field>

              <div class="button-container">
                <md-filled-button 
                  type="button"
                  onClick={this.handleDelete}>
                  <md-icon slot="icon">delete</md-icon>
                  Delete Patient
                </md-filled-button>
                <md-filled-button type="submit">
                  Update Patient
                </md-filled-button>
              </div>
            </form>
          </md-elevated-card>
        </div>
      </Host>
    );
  }
}
