import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { Configuration, VirtualPatient, VirtualPatientListApi } from '../../api/ambulance-virtual-patient';

@Component({
  tag: 'xprikryl-vp-create',
  styleUrl: 'xprikryl-vp-create.css',
  shadow: true,
})
export class XprikrylVpCreate {
  @Prop() apiBase: string;
  @Event({ eventName: "patient-created" }) patientCreated: EventEmitter<VirtualPatient>;
  @State() errorMessage: string;

  private formData = {
    name: '',
    recordId: '',
    difficulty: 1,
    symptoms: [] as string[],
    anamnesis: ''
  };

  private handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    
    if (name === 'difficulty') {
      this.formData[name] = parseInt(value);
    } else if (name === 'symptoms') {
      this.formData[name] = value.split(',').map(s => s.trim());
    } else {
      this.formData[name] = value;
    }
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });
      const api = new VirtualPatientListApi(configuration);
      const response = await api.createVirtualPatient({ virtualPatient: {...this.formData, id: crypto.randomUUID()} });
      if (response) {
        this.patientCreated.emit(response);
      }
    } catch (err: any) {
      this.errorMessage = `Cannot create patient: ${err.message || "unknown"}`;
    }
  }

  render() {
    return (
      <Host>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <md-filled-text-field
            label="Name"
            name="name"
            required
            onInput={(e) => this.handleInputChange(e)}
          ></md-filled-text-field>

          <md-filled-select
            label="Difficulty"
            name="difficulty"
            required
            onInput={(e) => this.handleInputChange(e)}
          >
            <md-select-option value="1">1 - Easiest</md-select-option>
            <md-select-option value="2">2</md-select-option>
            <md-select-option value="3">3</md-select-option>
            <md-select-option value="4">4</md-select-option>
            <md-select-option value="5">5 - Hardest</md-select-option>
          </md-filled-select>

          <md-filled-text-field
            label="Symptoms (comma-separated)"
            name="symptoms"
            required
            onInput={(e) => this.handleInputChange(e)}
          ></md-filled-text-field>

          <md-filled-text-field
            label="Anamnesis"
            name="anamnesis"
            required
            multiline
            rows="3"
            onInput={(e) => this.handleInputChange(e)}
          ></md-filled-text-field>

          {this.errorMessage && (
            <div class="error-message">{this.errorMessage}</div>
          )}

          <md-filled-button type="submit">
            Create Patient
          </md-filled-button>
        </form>
      </Host>
    );
  }
}
